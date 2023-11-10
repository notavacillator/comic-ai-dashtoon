import './App.css';
import { useEffect, useState } from "react";
import Pagination from './components/Pagination'
import { query } from './api/handle';

function App() {

  const [inputText, setInputText] = useState('');
  const [imageArray, setImageArray] = useState(Array.from({ length: 10 }));
  const [submitBtn, setSubmitBtn] = useState(false)
  // for Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [isTextEnabled, setIsTextEnabled] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [isLoading,  setIsLoading] = useState(false);

  const handleQuery = async () => {
    setIsLoading(true); // Set isLoading to true while fetching
    try{
      // First as soon as someone submits the prompt 
      // the previous image for that page should be removed. 
      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = undefined;
        return newImages;
      }); 

      const response = await query({ "inputs": inputText });
      const imageUrl = URL.createObjectURL(response);
  
      // setImageArray((prevImages) => [...prevImages, imageUrl]);
      // setInputText('');
      setImageArray((prevImages) => {
        const newImages = [...prevImages];
        newImages[currentPage - 1] = imageUrl;
        return newImages;
      });

    }catch (error) {
      console.log('Fetching image failed:', error);
      setIsLoading(false); // Set isLoading to false when the image is loaded or in case of an error
    } finally {
      setIsLoading(false); // Set isLoading to false when the image is loaded or in case of an error
    }
  };

  useEffect(() => {

    console.log(imageArray);
    return () => {

    }
  }, [imageArray])


  // console.log(imageArray);
  const filteredImages = imageArray.filter((image) => image !== undefined);

  return (
    <>
        <div className='w-[90%] min-h-screen mx-auto flex justify-between py-3'>
          
          {/* for Pagination */}
          <div className='container border-4 border-black '>
            <Pagination
              currentPage={currentPage}
              total={10}
              limit={1}
              onPageChange={(page) => setCurrentPage(page)}
              imageArray={imageArray}
              isLoading = {isLoading}
            />

          </div>

          {/* Modern Design Search Input  */}

          <div className="relative border-4 border-red-500 basis-1/3 flex flex-col justify-center">
            <textarea
              value={inputText}
              className="block w-11/12 h-[10rem] p-2  m-2 text-sm text-gray-900 border-2 
              outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
              focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
              dark:focus:border-blue-500"
              onChange={(e) => setInputText(e.target.value)}
            />

            {/* Prompt Button Group  */}
            <div className='flex justify-around mt-2'>
                <button onClick={handleQuery}
                  className='text-white w-32 bg-blue-700 hover:bg-blue-800 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                  px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >Fetch Image
                </button>
                <button onClick={() => setSubmitBtn(!submitBtn)}
                  className="text-white w-32 bg-blue-700 hover:bg-blue-800 
                  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {
                      submitBtn ? 'Hide Preview' : 'See Preview'
                    }
                </button>
            </div>

                    {/* Comic text addition  */}
            <div className='mt-3 p-2 '>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isTextEnabled}
                  onChange={() => setIsTextEnabled(!isTextEnabled)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700">Enable Text</span>
              </label>

              <textarea
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                className={`mt-2 block w-full h-[10rem] p-1 text-sm text-gray-900 border-2 
                  outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                  dark:focus:border-blue-500 ${!isTextEnabled && 'opacity-50 cursor-not-allowed'}`}
                disabled={!isTextEnabled}
              />
              <button
                className='mt-3 text-white w-32 bg-blue-700 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >Enter Text
              </button>
            </div>
            
          </div>

        </div >

        {/* preview comic section  */}
        <div className={`w-10/12 mx-auto ${submitBtn ? 'mt-40' : ''}`}>
          {
            submitBtn ?
              filteredImages.map((imageSrc, index) => (
                <img key={index} src={imageSrc} alt={`Fetched ${index + 1}`}  className='border mt-4 h-[50rem] w-[50rem]'/>
              ))
              :
              null
          }
        </div>
    </>

  );
}


export default App;
