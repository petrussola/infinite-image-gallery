import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

const baseUrl = process.env.REACT_APP_BASE_URL;

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getPhotos();
  }, [page]);

  function getPhotos() {
    let apiUrl = `${baseUrl}photos?`;
    if (query) apiUrl = `${baseUrl}search/photos?query=${query}`;
    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${process.env.REACT_APP_ACCESS_KEY}`;

    axios
      .get(apiUrl)
      .then((data) => {
        const imagesFromApi = data.data.results ?? data.data;
        if (page === 1) setPhotos(imagesFromApi);
        setPhotos((photos) => [...photos, ...imagesFromApi]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function searchPhotos(e) {
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

  if (!baseUrl) {
    return (
      <a href="https://unsplash.com/documentation" className="error">
        Required: get your unsplash key!
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={searchPhotos}>
        <input
          type="text"
          placeholder="Search Unsplash..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Search</button>
      </form>
      <InfiniteScroll
        dataLength={photos.length}
        next={() => setPage((page) => (page += 1))}
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
