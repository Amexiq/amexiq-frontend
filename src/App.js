import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';
import Menu from './components/Menu/menu';
import AboutUs from './components/About-Us/aboutus';
import Gallery from './components/Gallery/gallery';
import ContactUs from './components/Contact-Us/contactus';
import LogoLoader from './components/Loader/LogoLoader';
import './App.css';

function AppContent() {
  return ( 
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
            background: '#f7b035',
          }}
        >
          <LogoLoader
            letter="AmexiQ"
            size={120}
            outerColor="#0b6623"
            innerColor="#d11b1b"
            fillColor="#f7b035"
            delay={300}
            letterGap={3} // minimal gap
          />
        </div>
      ) : (
        <AppContent />
      )}
    </BrowserRouter>
  );
}
