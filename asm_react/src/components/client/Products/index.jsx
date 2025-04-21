import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Products() {
  // Các state cho tìm kiếm và sắp xếp
  const [products, setProducts] = useState([]); // Mảng sản phẩm
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();

  // Gọi API để lấy dữ liệu sản phẩm
  useEffect(() => {
    axios.get('http://localhost:3000/products/list')
      .then((response) => {
        console.log(response.data); // Kiểm tra dữ liệu trả về từ API
        // Đảm bảo dữ liệu trả về là mảng từ trường 'data'
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data); // Truy cập mảng từ response.data.data
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
      });
  }, []);

  // Sắp xếp sản phẩm theo giá
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });

  // Lọc sản phẩm theo tên
  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Tìm kiếm và sắp xếp */}
      <div className="container" id="filter">
        <div className="col-md-3">
          <input
            type="search"
            className="search-input"
            placeholder="Nhập tên xe"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sắp Xếp Theo Giá
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => setSortOrder('asc')}
                >
                  Giá từ thấp đến cao
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => setSortOrder('desc')}
                >
                  Giá từ cao đến thấp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <div className="row gy-4">
            {filteredProducts.length === 0 ? (
              <p>Không có sản phẩm nào</p>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6 portfolio-item">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="img-fluid"
                    onClick={() => navigate(`/productdetail/${product.id}`)} // Sửa lại để đi đến chi tiết sản phẩm
                    style={{ cursor: 'pointer' }}
                  />
                  <h3> {parseInt(product.price).toLocaleString("vi-VN")} vnđ</h3>
                  <div className="portfolio-info">
                    <h4>{product.title}</h4>
                    <a
                      href={`/${product.images}`}
                      title={product.title}
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a
                      href={`/productdetail/${product.id}`}
                      title="More Details"
                      className="details-link"
                    >
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
