import React from "react";

const Introduction = () => {
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
  );
};

export default Introduction;
