const User = require('../models/userModel');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // To generate random file names

function decodeBase64(str) {
    return Buffer.from(str, 'base64').toString('utf8');
}

class UserController {
    static async login(req, res) {
        try {
          const { email, password } = req.body;
          console.log("Received data:", req.body);
    
          if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password!" });
          }
    
          // Find user by email
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return res.status(400).json({ message: "Invalid email or password!" });
          }
    
          // Compare password
          const isMatch = await bcrypt.compare(password, user.password);
          console.log("Password match result:", isMatch);
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
          }
    
          // Save user info in session (not using token)
          req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
    
          // Return success response without token
          return res.status(200).json({
            message: "Login successful!",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          });
    
        } catch (error) {
          console.error("Server error:", error);
          return res.status(500).json({
            message: "Server error, please try again!",
            error: error.message
          });
        }
    }

    static async get(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({
                "status": 200,
                "message": "Users retrieved successfully",
                "data": users
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
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
            const { name, phone, address, username, password, avatar } = req.body;  // Corrected addpress to address
            if (!name || !phone || !address || !username || !password) {
                return res.status(400).json({ message: "Please provide all required fields!" });
            }
            const user = await User.create({
                name,
                phone,
                address,  // Corrected to address
                username,
                password,
                avatar: avatar || 'default-avatar.jpg'
            });

            res.status(201).json({
                message: "User created successfully",
                user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async base64(req, res) {
        try {
            // Decode all fields
            const name = decodeBase64(req.body.name);
            const phone = decodeBase64(req.body.phone);
            const address = decodeBase64(req.body.address);  // Corrected addpress to address
            const username = decodeBase64(req.body.username);
            const password = decodeBase64(req.body.password);
            const avatarBase64 = req.body.avatar;

            if (!name || !phone || !address || !username || !password) {
                return res.status(400).json({ message: "Please provide all required fields!" });
            }

            let avatarFilename = 'default-avatar.jpg';

            // If avatar in base64 exists, save it
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

            const user = await User.create({
                name,
                phone,
                address,  // Corrected to address
                username,
                password,
                avatar: avatarFilename
            });

            res.status(201).json({
                message: "User created successfully",
                user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.save();

            res.status(200).json({
                message: "User updated successfully",
                user
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user.destroy();

            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // Check if all required fields are provided
            if (!name || !email || !password) {
                return res.status(400).json({ status: false, message: "Please provide all fields!" });
            }

            // Validate email format
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ status: false, message: "Invalid email format!" });
            }

            // Check if email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ status: false, message: "Email is already in use!" });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword
            });

            return res.status(201).json({
                status: true,
                message: "Registration successful!",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }
            });

        } catch (error) {
            console.error("Registration error:", error);
            return res.status(500).json({
                status: false,
                message: "Server error!",
                error: error.message
            });
        }
    }
}

module.exports = UserController;
 