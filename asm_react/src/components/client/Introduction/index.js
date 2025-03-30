import React from "react";

const Introduction = () => {
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
  );
};

export default Introduction;
