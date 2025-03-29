import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Home</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5" data-aos="fade-up">
        <div className="container">
          <h1>Welcome to Our Website</h1>
          <p>Providing the best IT solutions for your business</p>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-5">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">Our Services</h2>
          <div className="row mt-4">
            <div className="col-md-4" data-aos="fade-right">
              <div className="card p-3 text-center">
                <h4>Web Development</h4>
                <p>We build high-quality web applications.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up">
              <div className="card p-3 text-center">
                <h4>Mobile Apps</h4>
                <p>We create modern mobile applications.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-left">
              <div className="card p-3 text-center">
                <h4>IT Consulting</h4>
                <p>Expert consulting to grow your business.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center" data-aos="fade-up">Contact Us</h2>
          <p className="text-center" data-aos="fade-up">Get in touch with us for more information.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;