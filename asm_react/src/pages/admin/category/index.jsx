import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Constants from '../../../Constanst'; // Sửa lại đúng đường dẫn tới file constants
import { useCookies } from 'react-cookie';

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
        <td>{value.status === 0 ? "ẩn" : "hiện"}</td>
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
    try {
      const { id } = props; // Lấy id từ props
      await axios.delete(`${Constants.DOMAIN_API}/categories/${id}`);
      getData(); // Gọi lại hàm getData để tải lại danh sách
    } catch (e) {
      console.log(e);
    }
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
                <th>Trang thái</th>
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
    </>
  );
};

export default Index;
