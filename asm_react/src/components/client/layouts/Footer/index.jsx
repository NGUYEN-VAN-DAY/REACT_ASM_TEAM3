import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "./style.css";

const Footer = () => {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <Link to="/" className="logo d-flex align-items-center">
              <span className="sitename">Công ty</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>Hẽm 49 Trần Hoàng Na</p>
              <p>Hưng Lợi, Ninh Kiều</p>
              <p className="mt-3"><strong>Phone:</strong> <span>0795 895 167</span></p>
              <p><strong>Email:</strong> <span>daynvpc08855@gmail.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <Link to="#"><i className="bi bi-twitter-x"></i></Link>
              <Link to="#"><i className="bi bi-facebook"></i></Link>
              <Link to="#"><i className="bi bi-instagram"></i></Link>
              <Link to="#"><i className="bi bi-linkedin"></i></Link>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Liên kết hữu ích</h4>
            <ul>
              <li><Link to="/home">Trang chủ</Link></li>
              <li><Link to="/about">Giới thiệu</Link></li>
              <li><Link to="/contact">Liên Hệ</Link></li>
              <li><Link to="/blog">Bài Viết</Link></li>
              <li><Link to="/product">Cửa hàng</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Dịch vụ của chúng tôi</h4>
            <ul>
              <li><Link to="#">Bảo dưỡng xe</Link></li>
              <li><Link to="#">Sữa chữa</Link></li>
              <li><Link to="#">Cung Cấp phụ tùng</Link></li>
              <li><Link to="#">Nhập khẩu xe</Link></li>
              <li><Link to="#">Nâng cấp xe</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Bản tin của chúng tôi</h4>
            <p>Đăng ký nhận bản tin của chúng tôi và nhận tin tức mới nhất về sản phẩm và dịch vụ của chúng tôi!</p>
            <form action="#" method="post" className="php-email-form">
              <div className="newsletter-form">
                <input type="email" name="email" required />
                <input type="submit" value="Gửi đi" />
              </div>
            </form>
            <Link to="http://online.gov.vn/Home/WebDetails/69617">
              <img src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png" alt="Logo Sale Noti" width="60%" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <span>Bản quyền</span> <strong className="px-1 sitename">Công ty</strong> <span>Được bảo lưu mọi quyền</span></p>
        <div className="credits">
          Được vận hành bởi <Link to="https://www.facebook.com/people/%C4%90%C3%A2y-Nguy%E1%BB%85n/pfbid0ftafuTwGNXRFJMy5EXhjyD2B1osDkpP2JCsSkMEGnucWttnsxwR22nSGGBt9ZKq2l/">Nguyễn Văn Đây</Link> Giám đốc <Link to="/">D Store</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;