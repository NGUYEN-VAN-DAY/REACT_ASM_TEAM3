import { useState } from "react";

const CategoryForm = ({ onClose }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Danh mục mới:", categoryName);
    setCategoryName(""); // Reset form sau khi thêm
    onClose(); // Đóng form sau khi submit
  };

  return (
    <div className="card p-3">
      <h4>Thêm Danh Mục</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên danh mục</label>
          <input
            type="text"
            className="form-control"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Thêm</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
          Hủy
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
