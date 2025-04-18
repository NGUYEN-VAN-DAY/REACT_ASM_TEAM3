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

      {/* Blog */}
      <div className="mt-5">
        <h2>Blog Xe</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://media.vov.vn/sites/default/files/styles/large/public/2023-05/91ebf210df2b0175583a.jpg"
                className="card-img-top"
                alt="Blog 1"
              />
              <div className="card-body">
                <h5 className="card-title">
                  Hướng Dẫn Bảo Dưỡng Xe Máy Đúng Cách
                </h5>
                <p className="card-text">
                  Bảo dưỡng xe máy giúp tăng tuổi thọ và đảm bảo an toàn khi lái
                  xe.
                </p>
                <button className="btn btn-info">Đọc Thêm</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://media.vov.vn/sites/default/files/styles/large/public/2023-05/91ebf210df2b0175583a.jpg"
                className="card-img-top"
                alt="Blog 2"
              />
              <div className="card-body">
                <h5 className="card-title">
                  Những Mẫu Xe Tay Ga Được Yêu Thích Nhất 2024
                </h5>
                <p className="card-text">
                  Danh sách các mẫu xe tay ga đáng mua nhất trong năm nay.
                </p>
                <button className="btn btn-info">Đọc Thêm</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://media.vov.vn/sites/default/files/styles/large/public/2023-05/91ebf210df2b0175583a.jpg"
                className="card-img-top"
                alt="Blog 1"
              />
              <div className="card-body">
                <h5 className="card-title">
                  Hướng Dẫn Bảo Dưỡng Xe Máy Đúng Cách
                </h5>
                <p className="card-text">
                  Bảo dưỡng xe máy giúp tăng tuổi thọ và đảm bảo an toàn khi lái
                  xe.
                </p>
                <button className="btn btn-info">Đọc Thêm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Nội dung</h1>
        <p className="text-center">
          Khám phá các dòng xe hiện đại, phù hợp với nhu cầu di chuyển của bạn.
          Chúng tôi mang đến những mẫu xe chất lượng cao với công nghệ tiên
          tiến.
        </p>
        <p className="text-center">
          Tại showroom của chúng tôi, bạn sẽ tìm thấy những mẫu xe phù hợp với
          phong cách cá nhân, từ xe tay ga tiện lợi đến xe côn tay mạnh mẽ. Hãy
          cùng chúng tôi khám phá những mẫu xe mới nhất trên thị trường!
        </p>
        <p className="text-center">
          Với đội ngũ tư vấn chuyên nghiệp, chúng tôi luôn sẵn sàng hỗ trợ bạn
          trong việc lựa chọn chiếc xe ưng ý nhất. Đừng ngần ngại liên hệ với
          chúng tôi để được tư vấn chi tiết.
        </p>

        {/* Giới thiệu */}
        <div className="row mt-4">
          <div className="col-md-4">
            <img
              src="https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg"
              alt="Honda AirBlade 150"
              className="img-fluid rounded"
            />
            <h2 className="mt-3">Honda AirBlade 150</h2>
            <p>
              Honda AirBlade 150 là mẫu xe tay ga mạnh mẽ, tiết kiệm nhiên liệu
              với thiết kế thể thao, phù hợp với đô thị hiện đại.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://image.thanhnien.vn/Uploaded/bqthai/2022_12_30/yamaha-xs155r-thanhnien-102.jpg"
              alt="Yamaha Exciter 155"
              className="img-fluid rounded"
            />
            <h2 className="mt-3">Yamaha Exciter 155</h2>
            <p>
              Yamaha Exciter 155 mang lại trải nghiệm lái mạnh mẽ với công nghệ
              tiên tiến, phù hợp với những ai đam mê tốc độ.
            </p>
          </div>
          <div className="col-md-4">
            <img
              src="https://static.automotor.vn/w827/images/upload/thuongtth/10032019/suzuki-raider.jpg"
              alt="Suzuki Raider 150"
              className="img-fluid rounded"
            />
            <h2 className="mt-3">Suzuki Raider 150</h2>
            <p>
              Suzuki Raider 150 với động cơ mạnh mẽ, thiết kế thể thao, phù hợp
              với những ai thích phong cách cá tính và tốc độ.
            </p>
          </div>
        </div>

        {/* Thêm giới thiệu */}
        <div className="mt-5">
          <h2>Vì Sao Chọn Showroom Của Chúng Tôi?</h2>
          <p>- Đa dạng các dòng xe với thiết kế hiện đại, động cơ mạnh mẽ.</p>
          <p>- Chính sách bảo hành và hậu mãi tốt nhất cho khách hàng.</p>
          <p>
            - Đội ngũ tư vấn tận tâm, hỗ trợ khách hàng lựa chọn xe phù hợp.
          </p>
          <p>- Thường xuyên có các chương trình ưu đãi hấp dẫn.</p>
          <p>
            - Hệ thống showroom trải rộng trên toàn quốc, giúp bạn dễ dàng tiếp
            cận và trải nghiệm sản phẩm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
