import React, { useEffect, useState } from "react";
import Head from "../head/Head";
import "./All.css";

const All = () => {
  const [items, setItems] = useState([]);
  const [aquariums, setAquariums] = useState([]);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    // Fetching all products
    fetch("http://localhost:4000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Fetching aquariums
    fetch("http://localhost:4000/api/aquarium")
      .then((response) => response.json())
      .then((data) => {
        setAquariums(data);
      })
      .catch((error) => {
        console.error("Error fetching aquariums:", error);
      });
  }, []);

  const handleDeleteItem = (id, type) => {
    const url = type === 'aquarium'
      ? `http://localhost:4000/api/aquarium/${id}`
      : `http://localhost:4000/api/products/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update state after successful deletion
        if (type === 'aquarium') {
          setAquariums((prevAquariums) =>
            prevAquariums.filter((aquarium) => aquarium._id !== id)
          );
        } else {
          setItems((prevItems) =>
            prevItems.filter((item) => item._id !== id)
          );
        }
        console.log(`${type} deleted successfully:`, data);
      })
      .catch((error) => {
        console.error(`Error deleting ${type}:`, error);
      });
  };

  const handleToggleShowMore = (id, type) => {
    setShowMore((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [id]: !prev[type]?.[id],
      },
    }));
  };

  return (
    <div>
      <div className="allItem">
        <Head />
        <div className="all-list">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item._id} className="item">
                <div className="img">
                <img
                  src={`http://localhost:4000/images/${item.image.replace(
                    "images/",
                    ""
                  )}`}
                  alt={item.name}
                />
                </div>
                <h3>{item.name}</h3>
                <p>
                  {item.description.length > 35
                    ? `${item.description.slice(0, 35)}...`
                    : item.description}
                  {item.description.length > 35 && (
                    <span
                      onClick={() => handleToggleShowMore(item._id, 'product')}
                      className="see-more"
                    >
                      {showMore.product?.[item._id] ? ' See Less' : ' See More'}
                    </span>
                  )}
                </p>
                {showMore.product?.[item._id] && <p>{item.description}</p>}
                <p id="amt">Price: <b>Rs{item.price}</b></p>
                <button
                  onClick={() => handleDeleteItem(item._id, 'product')}
                  className="delete-btn"
                >
                  Delete Product
                </button>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
        <div className="all-list">
          {aquariums.length > 0 ? (
            aquariums.map((aquarium) => (
              <div key={aquarium._id} className="item">
                <div className="img">
                <img
                  src={`http://localhost:4000/images/${aquarium.image.replace(
                    "images/",
                    ""
                  )}`}
                  alt={aquarium.name}
                />
                </div>
                <h3>{aquarium.name}</h3>
                <p>
                  {aquarium.description.length > 35
                    ? `${aquarium.description.slice(0, 35)}...`
                    : aquarium.description}
                  {aquarium.description.length > 35 && (
                    <span
                      onClick={() => handleToggleShowMore(aquarium._id, 'aquarium')}
                      className="see-more"
                    >
                      {showMore.aquarium?.[aquarium._id] ? ' See Less' : ' See More'}
                    </span>
                  )}
                </p>
                {showMore.aquarium?.[aquarium._id] && <p>{aquarium.description}</p>}
                <p id="amt">Price: Rs{aquarium.price}</p>
                <button
                  onClick={() => handleDeleteItem(aquarium._id, 'aquarium')}
                  className="delete-btn"
                >
                  Delete Aquarium
                </button>
              </div>
            ))
          ) : (
            <p>Loading aquariums...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default All;
