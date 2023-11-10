import './App.css';
import { useEffect, useState, useSyncExternalStore } from "react";
import Pagination from './components/Pagination'
import { query } from './api/handle';

function App() {

  const [inputText, setInputText] = useState('');
  const [imageArray, setImageArray] = useState(Array.from({ length: 10 }));
  const [submitBtn, setSubmitBtn] = useState(false)
  // for Pagination
  const [currentPage, setCurrentPage] = useState(1)



  const handleQuery = async () => {
    const response = await query({ "inputs": inputText });
    const imageUrl = URL.createObjectURL(response);

    // setImageArray((prevImages) => [...prevImages, imageUrl]);
    // setInputText('');
    setImageArray((prevImages) => {
      const newImages = [...prevImages];
      newImages[currentPage - 1] = imageUrl;
      return newImages;
    });
  };

  useEffect(() => {

    console.log(imageArray);
    return () => {

    }
  }, [imageArray])


  // console.log(imageArray);
  const filteredImages = imageArray.filter((image) => image !== undefined);

  return (
    <div className='w-[90%] min-h-screen mx-auto flex justify-between py-3'>
      
      {/* for Pagination */}
      <div className='container border-4 border-black '>
        <Pagination
          currentPage={currentPage}
          total={10}
          limit={1}
          onPageChange={(page) => setCurrentPage(page)}
          imageArray={imageArray}
        />

      </div>

      {/* Modern Design Search Input  */}

    <div className="relative border border-red-50 basis-1/3">
      <input
          type="text"
          value={inputText}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border-2 
          outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
          focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
          dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
          dark:focus:border-blue-500"

          onChange={(e) => setInputText(e.target.value)}
        />

        <button onClick={handleQuery}
        className='text-white  bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
        px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >Fetch Image</button>
        <button onClick={() => setSubmitBtn(!submitBtn)}
          className="text-white bg-blue-700 hover:bg-blue-800 
          focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >See preview</button>
        {
          submitBtn ?
            filteredImages.map((imageSrc, index) => (
              <img key={index} src={imageSrc} alt={`Fetched ${index + 1}`} />
            ))
            :
            null
        }
      </div>

    </div >
  );
}


export default App;
