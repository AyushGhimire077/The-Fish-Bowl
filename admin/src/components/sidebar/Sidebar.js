import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get the current path
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(location.pathname); // Update activeLink whenever the location changes
  }, [location]);

  return (
    <div className="sidebar">
      <div className="head">
        <h3>The Fish Bowl</h3>
        <hr />
      </div>
      <div className="side-col">
        <div className="boxes">
          <Link to="/">
            <button className={activeLink === "/" ? "active" : "inactive"}>All</button>
          </Link>
        </div>
        <div className="boxes">
          <Link to="/products">
            <button className={activeLink === "/products" ? "active" : "inactive"}>Products</button>
          </Link>
        </div>
        <div className="boxes">
          <Link to="/aquarium">
            <button className={activeLink === "/aquarium" ? "active" : "inactive"}>Aquarium</button>
          </Link>
        </div>
        <div className="boxes">
          <Link to="/fishes">
            <button className={activeLink === "/fishes" ? "active" : "inactive"}>Fishes</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
