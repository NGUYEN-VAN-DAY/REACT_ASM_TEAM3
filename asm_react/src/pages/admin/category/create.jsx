import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Constants from '../../../Constanst'; // Đường dẫn constants
import { useNavigate } from 'react-router-dom';

const AddCate = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookies.token;
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('status', formData.status);

      // Gửi dữ liệu đến API
      await axios.post(`${Constants.DOMAIN_API}/categories/add`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Thêm danh mục thành công!');
      navigate('/admin/categories');
    } catch (error) {
      console.error('Lỗi khi thêm danh mục:', error);
      alert('Thêm danh mục thất bại!');
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Thêm danh mục</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên danh mục</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Trạng thái</label>
            <select
              className="form-control"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value={1}>Hiện</option>
              <option value={0}>Ẩn</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Thêm</button>
        </form>
      </div>
    </div>
  );
};

export default AddCate;
