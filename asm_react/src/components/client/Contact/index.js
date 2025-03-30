import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Liên Hệ</h1>
      {submitted ? (
        <div className="alert alert-success text-center" role="alert">
          Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
          <div className="mb-3">
            <label className="form-label">Tên:</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Nội dung:</label>
            <textarea name="message" value={form.message} onChange={handleChange} className="form-control" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Gửi</button>

        </form>

      )}
    </div>
  );
};

export default ContactPage;