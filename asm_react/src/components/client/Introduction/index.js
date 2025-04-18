import React from "react";

const Introduction = () => {
<<<<<<< HEAD
  const teamMembers = [
    {
      name: "Sơn Tùng MTP",
      role: "Tư vấn viên",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zEEISvcs1XuhHOPNI0aUElsa46Fmv5NLDg&s",
    },
    {
      name: "Jack (j97)",
      role: "Tư vấn viên",
      image: "https://images2.thanhnien.vn/528068263637045248/2023/3/21/jack-1679396385964143355875.jpeg",
    },
    {
      name: "Thiên An",
      role: "Tư vấn viên",
      image: "https://danviet.mediacdn.vn/296231569849192448/2022/3/11/hot-girl-thien-an-2-1646961974863425050594.png",
    },
    {
      name: "Thiều Bảo Trâm",
      role: "Tư vấn viên",
      image: "https://kenh14cdn.com/203336854389633024/2025/1/5/472884116184826283520200958675296755631781160n-1736096442550-1736096443768605419414.jpg",
    },
  ];
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title accent-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Giới thiệu</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Trang chủ</a></li>
              <li className="current">Giới thiệu</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="row position-relative">
            <div className="col-lg-7 about-img" data-aos="zoom-out" data-aos-delay="200">
              <img src="https://sohanews.sohacdn.com/160588918557773824/2024/10/30/honda-hoi-thao-17302799917881244577325.png" alt="Company Overview" />
            </div>
            <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
              <h2 className="inner-title">Chúng tôi luôn đem lại lợi ích tốt nhất cho bạn!</h2>
              <div className="our-story">
                <h3>Về chúng tôi</h3>
                <p>
                  Công ty chúng tôi tự hào là một trong những đơn vị hàng đầu trong lĩnh vực kinh doanh xe máy và cung cấp dịch vụ bảo dưỡng chuyên nghiệp.
                </p>
                <ul>
                  <li><i className="bi bi-check-circle"></i> Sản phẩm đa dạng từ các thương hiệu uy tín.</li>
                  <li><i className="bi bi-check-circle"></i> Dịch vụ bảo dưỡng chuyên nghiệp.</li>
                  <li><i className="bi bi-check-circle"></i> Chăm sóc khách hàng tận tâm.</li>
                </ul>
                <p>
                  Chúng tôi không chỉ bán xe, mà còn mang đến giải pháp di chuyển toàn diện, đồng hành cùng bạn trên mọi hành trình.
                </p>
                <div className="watch-video d-flex align-items-center position-relative">
                  <i className="bi bi-play-circle"></i>
                  <a href="https://youtu.be/lURqo5bjRTI?si=LpnWA7bV5blZvTlo" className="glightbox stretched-link">Xem Video</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Thành viên</h2>
          <p>"Đội ngũ tư vấn khách hàng của chúng tôi"</p>
        </div>
        <div className="container">
          <div className="row gy-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className="team-member text-center">
                  <img src={member.image} alt={member.name} className="img-fluid rounded-circle mb-3" />
                  <div className="member-info">
                    <h4>{member.name}</h4>
                    <span>{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="clients section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Đối tác</h2>
          <p>"Được nhập khẩu trực tiếp không qua trung gian, đảm bảo quyền lợi tối đa cho khách hàng"</p>
        </div>
      </section>
    </main>
=======
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Giới Thiệu Các Dòng Xe</h1>
      <p className="text-center">
        Chào mừng bạn đến với showroom xe của chúng tôi. Chúng tôi cung cấp các dòng xe hiện đại, phù hợp với nhu cầu di chuyển của bạn.
      </p>
      
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
            Honda AirBlade 150 là mẫu xe tay ga mạnh mẽ, tiết kiệm nhiên liệu với thiết kế thể thao, phù hợp với đô thị hiện đại.
          </p>
          <ul>
            <li>Động cơ 150cc mạnh mẽ</li>
            <li>Công nghệ phanh ABS an toàn</li>
            <li>Tiết kiệm nhiên liệu tối ưu</li>
          </ul>
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>Yamaha Exciter 155</h2>
          <p>
            Yamaha Exciter 155 là dòng xe côn tay thể thao, mang lại trải nghiệm lái phấn khích với công nghệ tiên tiến.
          </p>
          <ul>
            <li>Động cơ 155cc với van biến thiên VVA</li>
            <li>Thiết kế khí động học tối ưu</li>
            <li>Bảng đồng hồ kỹ thuật số hiện đại</li>
          </ul>
        </div>
        <div className="col-md-6">
          <img
            src="https://image.thanhnien.vn/Uploaded/bqthai/2022_12_30/yamaha-xs155r-thanhnien-102.jpg"
            alt="Yamaha Exciter 155"
            className="img-fluid rounded"
          />
        </div>
      </div>
      <br></br>
    </div>
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61
  );
};

export default Introduction;
