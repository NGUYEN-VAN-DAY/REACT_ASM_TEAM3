import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";


import Header from "./components/client/layouts/Header"
import Footer from "./components/client/layouts/Footer";
import Products from "./components/client/Products";
import Home from "./components/client/Home";
const App = () => {

  // localhost:3000 => Home
  // localhost:3000/login => Login
  const user = 'nguyễn văn đây';
  return (


    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<h1>Trang chủ</h1>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<h1>Giới thiệu</h1>} />
        <Route path="/shop" element={<Products/> } />
        <Route path="/maintenance" element={<h1>Bảo dưỡng</h1>} />
        <Route path="/blog" element={<h1>Sự kiện</h1>} />
        <Route path="/contact" element={<h1>Liên hệ</h1>} />
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

  );
};

export default App;
