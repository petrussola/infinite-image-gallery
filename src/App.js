import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const accesKey = process.env.REACT_APP_BASE_URL;

export default function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios
      .get(`${accesKey}/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}`)
      .then((res) => {
        const { data } = res;
        setPhotos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!accesKey) {
    return (
      <a href="https://unsplash.com/documentation" className="error">
        Required: get your unsplash key!
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>

      <div className="image-grid">
        {photos.map((image, index) => (
          <div className="image" key={index}>
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
}
