import React from "react";

const Contact = () => {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title accent-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">Liên hệ</h1>
          <nav className="breadcrumbs">
            <ol>
              <li><a href="/">Trang chủ</a></li>
              <li className="current">Liên hệ</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="mb-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0617878944176!2d105.76213397450861!3d10.011755172833436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883354b52dff%3A0xc5a49e1b7c3d68c4!2zNDkgJiDEkC4gVHLhuqduIEhvw6BuZyBOYSwgSMawbmcgTOG7o2ksIE5pbmggS2nhu4F1LCBD4bqnbiBUaMahLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1737989087944!5m2!1svi!2s"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>

        <div className="container" data-aos="fade">
          <div className="row gy-5 gx-lg-5">
            <div className="col-lg-4">
              <div className="info">
                <h3>Liên hệ chúng tôi</h3>
                <p>
                  "Liên hệ ngay với chúng tôi để được tư vấn chi tiết về sản phẩm và dịch vụ, đồng thời trải nghiệm sự tận tâm trong từng hành trình cùng bạn!"
                </p>
                <div className="info-item d-flex">
                  <i className="bi bi-geo-alt flex-shrink-0"></i>
                  <div>
                    <h4>Vị trí:</h4>
                    <p>Hẽm 49, Trần Hoàng Na, Ninh Kiều, Cần Thơ</p>
                  </div>
                </div>
                <div className="info-item d-flex">
                  <i className="bi bi-envelope flex-shrink-0"></i>
                  <div>
                    <h4>Email:</h4>
                    <p>daynvpc08855@gmail.com</p>
                  </div>
                </div>
                <div className="info-item d-flex">
                  <i className="bi bi-phone flex-shrink-0"></i>
                  <div>
                    <h4>Điện thoại:</h4>
                    <p>0795 895 167</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <form action="forms/contact.php" method="post" className="php-email-form">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" placeholder="Tên của bạn" required />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" name="email" placeholder="Email của bạn" required />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name="subject" placeholder="Tiêu đề" required />
                </div>
                <div className="form-group mt-3">
                  <textarea className="form-control" name="message" placeholder="Nội dung" required></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Hãy gửi lời nhắn của bạn. Cám ơn!</div>
                </div>
                <div className="text-center">
                  <button type="submit">Gửi đi</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
