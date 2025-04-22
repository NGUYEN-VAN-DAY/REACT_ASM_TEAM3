import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products/list")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy sản phẩm:", error);
      });
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {/* Tìm kiếm & sắp xếp */}
      <div className="container my-4">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 mb-2 d-flex justify-content-between">
            <div className="flex-grow-1">
              <input
                id="search"
                type="search"
                className="form-control"
                placeholder=" Tìm theo tên sản phẩm..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset về trang 1 khi tìm
                }}
              />
            </div>

            <div className="ms-2">
              <div className="dropdown">
                <button
                id="filter"
                  className="btn btn-success dropdown-toggle w-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sắp Xếp Theo Giá
                </button>
                <ul className="dropdown-menu w-100" id="drow">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setSortOrder("asc")}
                    >
                      Giá từ thấp đến cao
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => setSortOrder("desc")}
                    >
                      Giá từ cao đến thấp
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <div className="row gy-4">
            {currentProducts.length === 0 ? (
              <p>Không có sản phẩm nào phù hợp.</p>
            ) : (
              currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-4 col-md-6 portfolio-item"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="img-fluid"
                    onClick={() => navigate(`/productdetail/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <h3>{parseInt(product.price).toLocaleString("vi-VN")} vnđ</h3>
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
                      title="Chi tiết"
                      className="details-link"
                    >
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Phân trang */}
          <div className="pagination justify-content-center d-flex mt-4">
            <ul className="pagination justify-content-center d-flex">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  id="btn"
                  href="#!"
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Trước
                </a>
              </li>

              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active-pages" : ""
                  }`}
                >
                  <a
                    href="#!"
                    id="btn_number"
                    className="page-link"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </a>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <a
                  id="btn"
                  href="#!"
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Sau
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
