import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Constants from '../../../Constanst'; // Đảm bảo bạn đã sử dụng đúng đường dẫn tới file constants
import { useCookies } from 'react-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Đảm bảo bạn đã import CSS của react-toastify

const Index = () => {
  const [data, setData] = useState([]);
  const [cookies] = useCookies(['token']); // Đảm bảo bạn đã khai báo cookies
  
  useEffect(() => {
    getData();
  }, [cookies]); // thêm cookies vào mảng dependency

  const getData = async () => {
    try {
      // Lấy giá trị token từ cookie
      const token = cookies.token;

      const res = await axios.get(`${Constants.DOMAIN_API}/categories/list`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Response === ", res.data.data);
      setData(res.data.data);
    } catch (e) {
      console.log("Error === ", e);
    }
  };

  const imageStyle = { width: "100px", height: "100px" };

  const renderCategory = (value, index) => {
    return (
      <tr key={index}>
        <td>{value.id}</td>
        <td>{value.name}</td>
        {/* <td>
          <img
            src={`${Constants.DOMAIN_API}/uploads/${value.image}`}
            style={imageStyle}
          />
        </td> */}
        <td>{value.status === 0 ? "Ẩn" : "Hiện"}</td>
        <td>{value.description}</td>
        <td>
          <Link to={`/admin/categories/edit/${value.id}`} className="btn btn-warning me-3">
            Sửa
          </Link>
          <button onClick={deleteCategory.bind(this, {id: value.id, name: value.name})} type="button" className="btn btn-danger">
            Xóa
          </button>
        </td>
      </tr>
    );
  };

  const deleteCategory = async (props) => {
    const { id, name } = props; // Lấy id và name từ props
    
    // Hiển thị toast yêu cầu xác nhận
    toast.warning(
      <div>
        <p>Bạn có chắc chắn muốn xóa danh mục "{name}"?</p>
        <div className="d-flex justify-content-between">
          <button
            onClick={async () => {
              try {
                // Thực hiện xóa danh mục
                const res = await axios.delete(`${Constants.DOMAIN_API}/categories/${id}`);
                if (res.status === 200) {
                  getData(); // Tải lại danh sách danh mục
                  toast.success(`Danh mục "${name}" đã được xóa thành công!`);
                } else {
                  toast.error(`Lỗi khi xóa danh mục "${name}"!`);
                }
              } catch (e) {
                console.log(e);
                toast.error('Lỗi khi xóa danh mục!');
              }
              // Đợi 2 giây rồi đóng thông báo
              setTimeout(() => {
                toast.dismiss(); // Đóng thông báo
              }, 1500);
            }}
            className="btn btn-danger btn-sm"
          >
            Xóa
          </button>
          <button
            onClick={() => toast.dismiss()}  // Đóng toast khi người dùng chọn hủy
            className="btn btn-secondary btn-sm"
          >
            Hủy
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Không tự động đóng
        closeOnClick: false, // Không tự động đóng khi nhấn vào
        hideProgressBar: true, // Ẩn thanh tiến trình
        position: "top-center",  // Đặt vị trí toast ở trên cùng
      }
    );
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Danh sách danh mục</h3>
          <Link className="btn btn-success" to={'/admin/categories/add'}>Thêm mới</Link>
        </div>
        <div className="card-body">
          <table id="example1" className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                {/* <th>Ảnh</th> */}
                <th>Trạng thái</th>
                <th>Mô tả</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data.map(renderCategory)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Thêm ToastContainer vào đây */}
      <ToastContainer />
    </>
  );
};

export default Index;
