import { useState } from "react";

const ProductDetail = () => {
  const product = {
    id: 1,
    name: "Xe máy honda",
    price: "30.000.000 VNĐ",
    salePrice: "300.000 VNĐ",
    description: "Xe máy Honda Xe máy Honda Xe máy Honda.",
    details: {
      type: "Đồ uống",
      brand: "Highlands Coffee",
      origin: "Việt Nam",
    },
    images: [
      "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
      "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
      "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
      "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Xe máy Yamaha",
      price: "30.000.000 VNĐ",
      image: "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
    },
    {
      id: 3,
      name: "Xe máy Suzuki",
      price: "32.000.000 VNĐ",
      image: "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
    },
    {
      id: 4,
      name: "Xe máy Kawasaki",
      price: "40.000.000 VNĐ",
      image: "https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg",
    },
  ];

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-6">
          <div className="product-images">
            <img
              src={mainImage}
              alt="Product"
              className="img-fluid rounded"
              style={{ width: "100%" }}
            />
            <div className="d-flex mt-3">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="img-thumbnail me-2"
                  style={{ width: "70px", height: "50px", cursor: "pointer" }}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-success"><strong>Giá:</strong> {product.price}</p>
          <p className="text-danger"><strong>Giá giảm:</strong> {product.salePrice}</p>
          <p><strong>Loại sản phẩm:</strong> {product.details.type}</p>
          <p><strong>Hãng:</strong> {product.details.brand}</p>
          <p><strong>Xuất xứ:</strong> {product.details.origin}</p>
          <p><strong>Mô tả:</strong> {product.description}</p>

          <button className="btn btn-success">Đặt hàng ngay</button>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div className="mt-5">
        <h3>Sản phẩm liên quan</h3>
        <div className="row">
          {relatedProducts.map((item) => (
            <div key={item.id} className="col-md-4">
              <div className="card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-danger"><strong>{item.price}</strong></p>
                  <button className="btn btn-success">Xem chi tiết</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br></br>
    </div>
    
  );
};

export default ProductDetail;
