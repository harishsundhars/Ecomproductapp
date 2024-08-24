"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Products from "./products/products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./addproduct/addproduct";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar/sidebar";
import Login from "./login/login";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsProps {
  products: Product[];
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <>
    {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
        <BrowserRouter>
          <div id="sidebar" style={{ width: '250px' }}>
            <Sidebar />
          </div>
          <div id="rightSideWrapper" style={{ flexGrow: 1 }}>
          <div className="ContentBox" style={{ padding: '20px' }}>
              <section id='mySection' style={{marginTop: '100px', padding: '10px', float: 'right', width: '80%'}}>
                {isClient && ( 
                  
                    <Routes>
                      <Route path="/" element={<Products products={[]} />} />
                      <Route path="/addproduct" element={<AddProduct />} />
                    </Routes>
                  
                )}
              </section>
            </div>
          </div>
          </BrowserRouter>
        </>
      )}
      
      
    </>
  );
}
