import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import axios from 'axios';

const AllBook = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => { 
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  return (
    <div className='bg-zinc-900 px-4 min-h-screen'>
      <div className=''>
        <form className="max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>   
          <div className="relative">
            <input 
              type="search" 
              id="book-search" 
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Tìm kiếm sách..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="button" 
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setSearchTerm('')}
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
      <h4 className='text-3xl text-yellow-100 mb-3 '>Tất cả sách đang bán</h4>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {!data.length ? (
          <div className='w-full h-full flex items-center justify-center'>
            <Loader />
          </div>
        ) : (
          filteredData.map((item, i) => (
            <div className='my-4' key={i}>
              <BookCard data={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllBook;
