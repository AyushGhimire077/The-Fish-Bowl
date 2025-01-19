import React, { useState } from 'react'
import axios from 'axios';
import './Products.css'

const Product = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', desc);
    formData.append('price', price);
    formData.append('image', image);

    console.log("Form data being sent:", formData); // Log formData to check

    try {
      const resp = await axios.post('http://localhost:4000/api/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added', resp);

    } catch (error) {
      console.log('Error while submitting', error);
    }
  }

  return (
    <>
      <div className="add-pro-box">
        <div className="s-pro-box">
          <form onSubmit={handelSubmit}>
            <div className="pro-name">
              <input value={name} type="text" placeholder='Enter the name' onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="pro-desc">
              <input value={desc} type="text" placeholder='Enter the description' onChange={(e) => setDesc(e.target.value)} />
            </div>
            <div className="pro-img">
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="pro-price">
              <input value={price} type="text" placeholder='Enter the price' onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="submit-btn">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Product
