import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Aquarium.css';
import Head from '../head/Head'

const Aquarium = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', desc);
    formData.append('price', price);
    formData.append('image', image);

    try {
      setLoading(true);
      await axios.post('http://localhost:4000/api/aquarium', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      setSuccess(true);
      setCountdown(5);
    } catch (error) {
      setLoading(false);
      console.error('Error while submitting:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setSuccess(false);  
    }
  }, [success, countdown]);

  return (
    <>
      <div className="add-pro-box">
        <Head/>
        <hr/>
        <h2>Aquarium</h2>
        {loading && (
          <div className="loading-overlay">
            <div className="loading"></div>
          </div>
        )}

        {success && (
          <div className="succ-mesg">
            <div class="succ-box">
            <p>Aquarium Added Successfully</p>
            <p>Closing in {countdown} seconds...</p>
            </div>
            
          </div>
        )}

        <div className="s-pro-box">
          <form onSubmit={handleSubmit}>
            <div className="pro name">
              <label>Aquarium name</label>
              <input
                value={name}
                type="text"
                placeholder="Enter the name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="pro desc">
            <label>Aquarium description</label>
              <input
                value={desc}
                type="text"
                placeholder="Enter the description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="pro price">
            <label>Aquarium price</label>
              <input
                value={price}
                type="text"
                placeholder="Enter the price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="pro img">
            <label>Aquarium image</label>
              <input type="file" placeholder="Item image" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="submit-btn">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Aquarium;
