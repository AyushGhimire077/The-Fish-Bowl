import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="head">
          <h3>The Fish Bowl</h3>
          <hr />
        </div>
        <div className="side-col">
          <div className="boxes">
            <Link to="/">
              <button>All</button>
            </Link>
          </div>
          <div className="boxes">
            <Link to="/products">
              <button>Products</button>
            </Link>
          </div>
          <div className="boxes">
            <Link to="/aquarium">
              <button>Aquarium</button>
            </Link>
          </div>
          <div className="boxes">
            <Link to="/fishes">
              {" "}
              <button>Fishes</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
