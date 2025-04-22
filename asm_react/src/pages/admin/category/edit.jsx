import React, { useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Constants from '../../../Constanst'; // Đường dẫn constants
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Đảm bảo bạn import CSS của react-toastify

const EditCate = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL params

  // Khởi tạo react-hook-form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  // Hàm lấy thông tin danh mục cũ
  useEffect(() => {
    const getCategoryById = async () => {
      try {
        const token = cookies.token;
        const res = await axios.get(`${Constants.DOMAIN_API}/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Gán giá trị vào form fields
        setValue('name', res.data.data.name);
        setValue('description', res.data.data.description);
        setValue('status', res.data.data.status);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin danh mục:', error);
      }
    };

    getCategoryById(); // Gọi hàm để lấy dữ liệu
  }, [id, cookies.token, setValue]);

  // Hàm submit form
  const onSubmit = async (data) => {
    try {
      const token = cookies.token;
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('status', data.status);

      // Gửi dữ liệu đã sửa tới API
      await axios.put(`${Constants.DOMAIN_API}/categories/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Hiển thị thông báo cập nhật thành công
      toast.success('Cập nhật danh mục thành công!');
      navigate('/admin/categories');
    } catch (error) {
      console.error('Lỗi khi cập nhật danh mục:', error);
      toast.error('Cập nhật danh mục thất bại!');
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>Sửa danh mục</h3>
        </div>
        <div className="card-body">
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
              />
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
            <button type="submit" className="btn btn-primary">Cập nhật</button>
          </form>
        </div>
      </div>

      {/* Thêm ToastContainer vào đây */}
      <ToastContainer />
    </>
  );
};

export default EditCate;
