// ComicNavigator.js
import React, { useState } from 'react';
import ComicPage from './ComicPage';

const ComicNavigator = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <ComicPage />
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
};

export default ComicNavigator;
