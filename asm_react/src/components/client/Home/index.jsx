import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Chào Mừng Đến Showroom Xe</h1>
      <p className="text-center">
        Khám phá các dòng xe hiện đại, phù hợp với nhu cầu di chuyển của bạn.
        Chúng tôi mang đến những mẫu xe chất lượng cao với công nghệ tiên tiến.
      </p>

      {/* Giới thiệu */}
      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src="https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg"
            alt="Honda AirBlade 150"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h2>Honda AirBlade 150</h2>
          <p>
            Honda AirBlade 150 là mẫu xe tay ga mạnh mẽ, tiết kiệm nhiên liệu
            với thiết kế thể thao, phù hợp với đô thị hiện đại.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/productdetail")}
          >
            Xem Chi Tiết
          </button>
        </div>
      </div>

      {/* Sản phẩm */}
      <div className="mt-5">
        <h2>Sản Phẩm Nổi Bật</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg"
                className="card-img-top"
                alt="Yamaha Exciter 155"
              />
              <div className="card-body">
                <h5 className="card-title">Yamaha Exciter 155</h5>
                <p className="card-text">
                  Dòng xe côn tay mạnh mẽ với công nghệ tiên tiến.
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/productdetail")}
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://static.automotor.vn/w827/images/upload/thuongtth/10032019/suzuki-raider.jpg"
                className="card-img-top"
                alt="Suzuki Raider 150"
              />
              <div className="card-body">
                <h5 className="card-title">Suzuki Raider 150</h5>
                <p className="card-text">
                  Dòng xe thể thao với động cơ mạnh mẽ.
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/productdetail")}
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://media.vov.vn/sites/default/files/styles/large/public/2023-05/91ebf210df2b0175583a.jpg"
                className="card-img-top"
                alt="Honda Winner X"
              />
              <div className="card-body">
                <h5 className="card-title">Honda Winner X</h5>
                <p className="card-text">
                  Thiết kế thể thao, động cơ mạnh mẽ phù hợp với phượt đường
                  dài.
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/product-detail")}
                >
                  Xem Chi Tiết
                </button>
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
