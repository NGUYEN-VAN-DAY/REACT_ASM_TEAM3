import React from "react";

const Maintenance = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Dịch Vụ Bảo Dưỡng Xe</h1>
      <p className="text-center">
        Để đảm bảo chiếc xe của bạn luôn trong tình trạng tốt nhất, hãy tham khảo các dịch vụ bảo dưỡng định kỳ của chúng tôi.
      </p>

      {/* Lợi ích của bảo dưỡng */}
      <div className="mt-4">
        <h2>Lợi Ích Của Việc Bảo Dưỡng Xe Định Kỳ</h2>
        <ul>
          <li>Kéo dài tuổi thọ của xe.</li>
          <li>Giúp xe vận hành êm ái và tiết kiệm nhiên liệu hơn.</li>
          <li>Phát hiện sớm các vấn đề tiềm ẩn để tránh hỏng hóc nghiêm trọng.</li>
          <li>Đảm bảo an toàn cho người lái và hành khách.</li>
        </ul>
      </div>

      {/* Các gói bảo dưỡng */}
      <div className="mt-5">
        <h2>Các Gói Bảo Dưỡng</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bảo Dưỡng Cơ Bản</h5>
                <p className="card-text">Kiểm tra và thay nhớt, kiểm tra phanh, lốp xe.</p>
               
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bảo Dưỡng Toàn Diện</h5>
                <p className="card-text">Bảo dưỡng động cơ, hệ thống phanh, và kiểm tra toàn bộ xe.</p>
               
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bảo Dưỡng Chuyên Sâu</h5>
                <p className="card-text">Kiểm tra, sửa chữa và thay thế linh kiện nếu cần thiết.</p>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
