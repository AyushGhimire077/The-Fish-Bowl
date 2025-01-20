import React from "react";
import Sidebar from "./components/sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import All from "./components/middlebar/all/All";
import Products from "./components/middlebar/products/Product";
import Fishes from "./components/middlebar/fishes/Fishes";
import Aquarium from "./components/middlebar/aquarium/Aquarium";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <>
    <Router>
      <div>
        <Sidebar />

        <Routes>
          <Route path="/" element={<All />} />
          <Route path="/products" element={<Products />} />
          <Route path="/fishes" element={<Fishes />} />
          <Route path="/aquarium" element={<Aquarium />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
    <Footer/>
    </>
  );
};

export default App;
