import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Addproduct from "./pages/admin/product/create";
import ListProduct from "./pages/admin/product";
import Login from "./components/client/Login";
import NotFound from "./pages/NotFound";

import EditProduct from "./pages/admin/product/edit";
import ListCategory from "./pages/admin/category/index"
import AddCate from "./pages/admin/category/create";
import EditCate from "./pages/admin/category/edit";
import Home from "./components/client/Home";
import Introduction from "./components/client/Introduction";
import ProductDetail from "./components/client/Productdetail";
import Products from "./components/client/Products";
import Maintenance from "./components/client/Maintenance";
import ContactPage from "./components/client/Contact";
import Card from "./components/client/Card";
import Register from "./components/client/Register";
import Header from "./components/client/layouts/Header";
import Footer from "./components/client/layouts/Footer";
import EventsPage from "./components/client/EventsPage";
import OrderConfirmation from "./components/client/OrderConfirmation";
import "./App.css";
import AddCategory from "./pages/admin/category/create";

const Layout = ({ children }) => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {<Header />}
      <main className="flex-grow">{children}</main>
      {<Footer />}
    </div>
  );
};

function App() {
  const user = "";
  return (
    <Router>
      <Routes>
        {/* Routes cho Client */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <Introduction />
            </Layout>
          }
        />
        <Route
          path="/shop"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/productdetail/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/maintenance"
          element={
            <Layout>
              <Maintenance />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <EventsPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/card"
          element={
            <Layout>
              <Card />
            </Layout>
          }
        />
        <Route
          path="/order-confirmation/:orderId"
          element={
            <Layout>
              <OrderConfirmation />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        {/* Routes cho Admin */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="products" element={<ListProduct />} />
          <Route path="products/add" element={<Addproduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          {/* Routes cho danh mục */}
          <Route path="categories" element={<ListCategory />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCate />} />
        </Route>

        {/* Trang không tìm thấy */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
