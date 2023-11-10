// ComicPage.js
import React, { useState } from 'react';
import { query } from '../api/handle';

const ComicPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [comicImage, setComicImage] = useState(null);

  const fetchImage = async (prompt) => {
    // setIsLoading(true); // Set isLoading to true while fetching
    try {
        const response = await query({ "inputs": prompt });
        const imageObjectURL = URL.createObjectURL(response);
        setComicImage(imageObjectURL)
    } catch (error) {
      console.log('Fetching image failed:', error);
    } finally {
    //   setIsLoading(false); // Set isLoading to false when the image is loaded or in case of an error
    }
};

  const handleSearch = async () => {
    try {
        fetchImage(searchTerm); 
      // Replace 'API_URL' with the actual API endpoint
    //   const response = await axios.get(`API_URL?search=${searchTerm}`);
    //   setComicImage(response.data); // Assuming the API returns the image as blob
    } catch (error) {
      console.error('Error fetching comic:', error);
    }
  };

  return (
    <div>
      <h1>Comic Page 1</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {comicImage && <img src={comicImage} alt="Comic" />}
    </div>
  );
};

export default ComicPage;
