import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import { Link } from 'react-router-dom';

const Favourites = () => {
  const [favourites, setFavourites]= useState()
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:3000/api/v1/get-favourite-books",{headers}

      );
      setFavourites(response.data.data)
    }
    fetch();
  }, [favourites])
  return (
    <>
      {(!favourites || favourites.length === 0) && (
        <div className='text-5xl h-[100%] font-semibold text-zinc-500 flex items-center justify-center w-full'>
          Không có sách nào trong danh sách yêu thích
          <img src="./star.png" alt="" className='h-[10vh] my-8'/>
        </div>
        
      )}
      <div className='grid grid-cols-4 gap-4'>
      {favourites && 
      favourites.map((items, i)=>(
      <div key={i}>
        <BookCard data={items} favourites={true}/>
      </div>
    ))}
    </div>
    </>
    
  )
}

export default Favourites