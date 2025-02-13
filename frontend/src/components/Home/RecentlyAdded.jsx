import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookCard from '../BookCard/BookCard'
import Loader from '../Loader/Loader'
const RecentlyAdded = () => {
  const [data, setData] = useState()
  useEffect(() => { 
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-recent-books");
      setData(response.data.data);
    };
    fetch();
  },[])
  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100 mb-3'>Sách vừa thêm mới</h4>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {!data && 
        <div className='flex items-center justify-center my-8'>
          <Loader />
        </div>}
        {data && data.map((item, i) => 
        <div key={i}>
          <BookCard data={item}/>
          </div>)}
      </div>
    </div>
  )
}

export default RecentlyAdded