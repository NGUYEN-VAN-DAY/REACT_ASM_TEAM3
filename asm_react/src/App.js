
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Addproduct from "./pages/admin/product/create";
import ListProduct from "./pages/admin/product";
import Login from "./components/client/Login";
import NotFound from "./pages/NotFound";

import EditProduct from "./pages/admin/product/edit";
import ListCategory from "./pages/admin/category";
import AddCate from "./pages/admin/category/create";
import EditCate from "./pages/admin/category/edit";
import Home from "./components/client/Home";
import Introduction from "./components/client/Introduction";
import ProductDetail from "./components/client/Productdetail";
import Products from "./components/client/Products";
import Maintenance from './components/client/Maintenance';
import ContactPage from "./components/client/Contact";
import Card from "./components/client/Card";
import Register from "./components/client/Register";
import Header from "./components/client/layouts/Header";
import Footer from "./components/client/layouts/Footer";
import EventsPage from "./components/client/EventsPage";
import "./App.css";


<<<<<<< HEAD
=======
import Header from "./components/client/layouts/Header"
import Footer from "./components/client/layouts/Footer";
import Products from "./components/client/Products";
import Home from "./components/client/Home";
import ProductDetail from "./components/client/Productdetail";
import Introduction from "./components/client/Introduction"
import Maintenance from "./components/client/Maintenance";
import ContactPage from "./components/client/Contact";
import Login from "./components/client/Login";
import ProductCard from "./components/client/Card";
import Register from "./components/client/Register";


const App = () => {
>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61

const Layout = ({ children }) => {
  const location = useLocation();
  const isRootPath = location.pathname === "/";

  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen">
      {<Header />}
      <main className="flex-grow">{children}</main>
      {<Footer />}
    </div>
=======


    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<h1>Trang chủ</h1>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<Introduction/>} />
        <Route path="/shop" element={<Products/> } />
        <Route path="/productdetail" element={<ProductDetail/> } />
        <Route path="/maintenance" element={<Maintenance/>} />
        <Route path="/blog" element={<h1>Sự kiện</h1>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/card" element={<ProductCard/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <Footer />

    </Router>
    // <Routes>
    //   <Route path="/" >
    //     {/* Khi người dùng mở vào url: localhost:3000/** */}
    //     {/* => MainUser */}
    //     {/* <Route index element={<Home />} /> */}
    //     {/* Route con không có dấu / phía trước */}
    //     {/* <Route path="login" element={<Login />} />
    //     <Route path="register" element={<Register />} />
    //     <Route path="register_hook" element={<Register_hook />} /> */}
    //   </Route>

    //   {/* <Route path="/admin" element={<MainAdmin/>}> */}
    //   {/* <Route index element={<Dashboard/>}/> */}
    //   {/* Route con không có dấu / phía trước */}
    //   {/* <Route path="products"  element={<Products/>}/> */}
    //   {/* </Route> */}

    //   {/* <Route path="/" element={<Home/>}/>
    //   <Route path="/login" element={<Login/>}/> */}
    // </Routes>

>>>>>>> 28b2e06ad754c1579179073dc217380ad6676f61
  );
};

function App() {
  const user = ""
  return (
    <Router>
      <Routes>
        {/* Routes cho Client */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><Introduction /></Layout>} />
        <Route path="/shop" element={<Layout><Products /></Layout>} />
        <Route path="/productdetail/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="/maintenance" element={<Layout><Maintenance /></Layout>} />
        <Route path="/blog" element={<Layout><EventsPage/></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="/card" element={<Layout><Card /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />

        {/* Routes cho Admin */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="products" element={<ListProduct />} />
          <Route path="products/add" element={<Addproduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />

          {/* Routes cho danh mục */}
          <Route path="categories" element={<ListCategory />} />
          <Route path="categories/add" element={<AddCate />} />
          <Route path="categories/edit/:id" element={<EditCate />} />
        </Route>

        {/* Trang không tìm thấy */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;