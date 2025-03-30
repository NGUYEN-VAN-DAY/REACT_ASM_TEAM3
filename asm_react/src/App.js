import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Addproduct from "./pages/admin/product/create";
import ListProduct from "./pages/admin/product";
import Login from "./pages/admin/Login";
import NotFound from "./pages/NotFound";
import Header from "./components/admin/Header";
import Footer from "./components/admin/Footer";
import EditProduct from "./pages/admin/product/edit";
import ListCategory from "./pages/admin/category";
import AddCate from "./pages/admin/category/create";
import EditCate from "./pages/admin/category/edit";

const Layout = ({ children }) => {
  const location = useLocation();
  const isRootPath = location.pathname === "/"; 

  return (
    <div className="flex flex-col min-h-screen">
      {!isRootPath && <Header />} 
      <main className="flex-grow">{children}</main>
      {!isRootPath && <Footer />} 
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Trang trống khi truy cập "/" */}
          <Route path="/" element={<div></div>} />

          {/* Các route trong admin */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="products" element={<ListProduct />} />
            <Route path="products/add" element={<Addproduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />

            {/* category */}
            <Route path="categories" element={<ListCategory />} />
            <Route path="categories/add" element={<AddCate />} />
            <Route path="categories/edit/:id" element={<EditCate />} />
          </Route>

          {/* Trang không tìm thấy */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;