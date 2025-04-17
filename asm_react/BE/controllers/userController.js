const UserModel = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Để tạo tên file ngẫu nhiên
function decodeBase64(str) {
    return Buffer.from(str, 'base64').toString('utf8');
}
class UserController {
    static async login(req, res) {
        try {
          const { email, password } = req.body;
          console.log("Dữ liệu nhận được:", req.body);
    
          if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng cung cấp email và mật khẩu!" });
          }
    
          // Tìm user theo email
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác!" });
          }
    
          // So sánh mật khẩu
          const isMatch = await bcrypt.compare(password, user.password);
          console.log("Kết quả so sánh mật khẩu:", isMatch);
          if (!isMatch) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác!" });
          }
    
          // Lưu thông tin user vào session (không dùng token)
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
    
          // Trả về response thành công, không kèm token
          return res.status(200).json({
            message: "Đăng nhập thành công!",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
    
        } catch (error) {
          console.error("Lỗi server:", error);
          return res.status(500).json({
            message: "Lỗi server, vui lòng thử lại!",
            error: error.message
          });
        }
      }

    static async get(req, res) {
        try {
            const user = await UserModel.findAll();
            res.status(200).json({
                "status": 200,
                "message": "Lấy danh sách thành công",
                "data": user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserModel.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            res.status(200).json({
                "status": 200,
                "data": user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        try {

            const { name, phone, addpress, username, password, avatar } = req.body;
            if (!name || !phone || !addpress || !username || !password) {
                return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin bắt buộc!" });
            }
            const user = await UserModel.create({
                name,
                phone,
                addpress,
                username,
                password,
                avatar: avatar || 'default-avatar.jpg'
            });

            res.status(201).json({
                message: "Thêm mới thành công",
                user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async base64(req, res) {
        try {
            // Giải mã tất cả các trường
            const name = decodeBase64(req.body.name);
            const phone = decodeBase64(req.body.phone);
            const addpress = decodeBase64(req.body.addpress);
            const username = decodeBase64(req.body.username);
            const password = decodeBase64(req.body.password);
            const avatarBase64 = req.body.avatar;

            if (!name || !phone || !addpress || !username || !password) {
                return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin bắt buộc!" });
            }

            let avatarFilename = 'default-avatar.jpg';

            // Nếu có avatar dạng base64 thì lưu
            if (avatarBase64) {
                const base64Data = avatarBase64.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');

                const ext = avatarBase64.substring("data:image/".length, avatarBase64.indexOf(";base64"));
                const filename = `${uuidv4()}.${ext}`;
                const savePath = path.join(__dirname, '../uploads', filename);

                fs.mkdirSync(path.dirname(savePath), { recursive: true });
                fs.writeFileSync(savePath, buffer);

                avatarFilename = filename;
            }

            const user = await UserModel.create({
                name,
                phone,
                addpress,
                username,
                password,
                avatar: avatarFilename
            });

            res.status(201).json({
                message: "Thêm mới thành công",
                user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async update(req, res) {
        try {
            const { id } = req.params;
            // const { name } = req.body;

            const user = await UserModel.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            // user.name = name;
            await user.save();

            res.status(200).json({
                message: "Cập nhật thành công",
                user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await UserModel.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Id không tồn tại" });
            }

            await user.destroy();

            res.status(200).json({ message: "Xóa thành công" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
