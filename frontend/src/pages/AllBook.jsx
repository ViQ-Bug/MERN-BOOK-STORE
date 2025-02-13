import React, { useEffect } from 'react'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
import axios from 'axios'
import { useState } from 'react'


const AllBook = () => {
  const [data, setData] = useState()
  useEffect(() => { 
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
      setData(response.data.data);
    };
    fetch();
  },[])
  return (
    <div  className='bg-zinc-900 px-4 h-screen'>
      <h4 className='text-3xl text-yellow-100 mb-3 '>Tất cả sách đang bán</h4>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {!data && 
        <div className='w-full h-[100%] flex items-center justify-center]'>
          <Loader />
        </div>}
        {data && data.map((item, i) => 
        <div className='my-4' key={i}>
          <BookCard data={item}/>
          </div>)}
      </div>
    </div>
  )
}

export default AllBook