import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Constants from '../../../Constanst'; // Đường dẫn constants
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Đảm bảo bạn import CSS của react-toastify

const AddCate = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [alertMessage, setAlertMessage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const token = cookies.token;
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('status', data.status);

      // Gửi dữ liệu đến API
      await axios.post(`${Constants.DOMAIN_API}/categories/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setAlertMessage({ type: 'success', message: 'Thêm danh mục thành công!' });
      reset(); // Reset form sau khi thành công
      navigate('/admin/categories');
    } catch (error) {
      console.error('Lỗi khi thêm danh mục:', error);
      setAlertMessage({ type: 'danger', message: 'Thêm danh mục thất bại!' });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Thêm danh mục</h3>
      </div>
      <div className="card-body">
        {alertMessage && (
          <div className={`alert alert-${alertMessage.type} alert-dismissible fade show`} role="alert">
            {alertMessage.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Tên danh mục</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name', { required: 'Tên danh mục không được để trống' })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              {...register('description', { required: 'Mô tả không được để trống' })}
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Trạng thái</label>
            <select
              className="form-control"
              {...register('status')}
            >
              <option value={1}>Hiện</option>
              <option value={0}>Ẩn</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Thêm</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCate;
