import React, { useEffect, useState } from "react";
import Head from "../head/Head";
import "./All.css";

const All = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div className="allItem">
        <Head />
        <div className="all-list">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id} className="item">
                <img
                  src={`http://localhost:4000/images/${item.image.replace("images/", "")}`}
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>Price: Rs{item.price}</p>
              </div>
            ))
          ) : (
            <p>Loading items...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default All;
