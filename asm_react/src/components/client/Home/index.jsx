import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import "./style.css";
const Home = () => {
  const navigate = useNavigate();
  const clients = [
    {
      id: 1,
      logo: "https://tinhocnews.com/wp-content/uploads/2024/05/logo-honda-vector-11-1.jpg",
    },
    { id: 2, logo: "https://media.loveitopcdn.com/3807/logo-yamaha-dongphucsongphu-010.jpg" },
    { id: 3, logo: "https://rubee.com.vn/wp-content/uploads/2021/05/Logo-suzuki.jpg" },
    { id: 4, logo: "https://vinadesign.vn/uploads/images/2023/06/logo-sym-vinadesign-03-10-21-08.jpg" },

    
  ];
  return (
    <div className="container">
      {/* Giới thiệu */}
      <div className="row mt-4 " id="slider-home">
        <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-bs-target="#carouselId"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Mẫu xe Honda"
            ></li>
            <li
              data-bs-target="#carouselId"
              data-bs-slide-to="1"
              aria-label="Mẫu xe Yamaha"
            ></li>
            <li
              data-bs-target="#carouselId"
              data-bs-slide-to="2"
              aria-label="Mẫu xe Suzuki"
            ></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active">
              <img
                width="100%"
                src="https://cdn.honda.com.vn/motorbikes/October2024/dnHHPb5YVgYuDgwKeX3j.png"
                className="w-100 d-block"
                alt="Mẫu xe Honda mới nhất"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="text-white">Honda Mới Nhất</h3>
                <p>
                  Thiết kế thể thao, động cơ bền bỉ, phù hợp cho mọi hành trình.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/10/KV-PC.jpg"
                className="w-100 d-block"
                alt="Mẫu xe Yamaha hiện đại"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3 className="text-white">Yamaha Cá Tính</h3>
                <p>Công nghệ tiên tiến, khả năng vận hành êm ái.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://suzuki.com.vn/_next/image?url=https%3A%2F%2Fdoftr40680fkg.cloudfront.net%2Fassets%2Fimages%2Fsatria%2FsatriaBanner_Desk.jpg&w=3840&q=75"
                className="w-100 d-block"
                alt="Mẫu xe Suzuki mạnh mẽ"
              />
              <div className="carousel-caption d-none d-md-block">
                <h3>Suzuki Đẳng Cấp</h3>
                <p>Thiết kế năng động, hiệu suất vượt trội.</p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Trước</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Tiếp</span>
          </button>
        </div>
      </div>
      <div className="mt-5 dichvu">
      <h2 className="text-center   mt-5 mb-5">Dịch Vụ Của Chúng Tôi</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAZB73NG4ow3lkBgUD9o3GljSghAy5JMxCTA&s"
                className="card-img-top"
                alt="Bảo dưỡng xe"
              />
              <div className="card-body">
                <h5 className="card-title">Bảo Dưỡng Xe</h5>
                <p className="card-text">
                  Dịch vụ bảo dưỡng chuyên nghiệp, giúp xe của bạn luôn vận hành
                  êm ái.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://thienthanhlimo.com/wp-content/uploads/2022/05/tong-hop-99-hinh-anh-nguoi-tho-sua-xe-may-y-nghia.jpg"
                className="card-img-top"
                alt="Sửa chữa xe"
              />
              <div className="card-body">
                <h5 className="card-title">Sửa Chữa Xe</h5>
                <p className="card-text">
                  Đội ngũ kỹ thuật viên tay nghề cao sẵn sàng hỗ trợ bạn.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2020/09/phu-tung-xe-may-chinh-hang-300x237.jpg"
                className="card-img-top"
                alt="Phụ tùng chính hãng"
              />
              <div className="card-body">
                <h5 className="card-title">Phụ Tùng Chính Hãng</h5>
                <p className="card-text">
                  Cung cấp các loại phụ tùng chất lượng, đảm bảo an toàn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="clients" className="clients section mt-5">
        <div className="container section-title" data-aos="fade-up">
          <h2>Đối tác</h2>
          <p>
            "Được nhập khẩu trực tiếp không qua trung gian, đảm bảo quyền lợi
            tối đa cho khách hàng"
          </p>
        </div>
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-0 clients-wrap">
            {clients.map((client) => (
              <div key={client.id} className="col-xl-3 col-md-4 client-logo">
                <img src={client.logo} alt={`Client ${client.id}`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
