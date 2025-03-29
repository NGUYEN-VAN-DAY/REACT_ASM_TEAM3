import React, { useState } from 'react';

// Dữ liệu sản phẩm giả lập
const mockProducts = [
  { id: 1, title: 'Xe máy Honda', price: 30000000, images: 'https://denledxe.com/uploads/page/2020_12/Honda-AirBlade-150-2021.jpg' },
  { id: 2, title: 'Xe máy Yamaha', price: 25000000, images: 'https://image.thanhnien.vn/Uploaded/bqthai/2022_12_30/yamaha-xs155r-thanhnien-102.jpg' },
  { id: 3, title: 'Xe máy Suzuki', price: 22000000, images: 'https://static.automotor.vn/w827/images/upload/thuongtth/10032019/suzuki-raider.jpg' },
  { id: 4, title: 'Xe máy Kawasaki', price: 35000000, images: 'https://cdn.24h.com.vn/upload/2-2020/images/2020-04-28/1588034095-500-top-15-moto-lung-danh-nhat-cua-ga-long-lo-xanh-kawasaki-ka1-1587999431-width660height510.jpg' },
  { id: 5, title: 'Xe máy BMW', price: 70000000, images: 'https://media.vov.vn/sites/default/files/styles/large/public/2023-05/91ebf210df2b0175583a.jpg' },
  { id: 6, title: 'Xe máy Ducati', price: 80000000, images: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZZMGRLrntaQiLNvdswNtiGtlyhgmco1J0Tw&s' },
];

function Products() {
  // Các state cho tìm kiếm và sắp xếp
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

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

      {/* Product List Section */}
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <div className="row gy-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 portfolio-item">
                <img
                  src={`${product.images}`}
                  className="img-fluid"
                  alt={product.title}
                />
                <h3>{product.price} vnđ</h3>
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
                    href={`/shop-detail/${product.id}`}
                    title="More Details"
                    className="details-link"
                  >
                    <i className="bi bi-link-45deg"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default Products;
