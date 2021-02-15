import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const accesKey = process.env.REACT_APP_BASE_URL;

export default function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotos();
  }, []);

  function getPhotos() {
    axios
      .get(`${accesKey}/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}`)
      .then((res) => {
        const { data } = res;
        setPhotos((photos) => [...photos, ...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
      <InfiniteScroll
        dataLength={photos.length}
        next={getPhotos}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {photos.map((image, index) => {
            return (
              <a
                className="image"
                key={index}
                href={image.links.html}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={image.urls.small} alt={image.alt_description} />
              </a>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
