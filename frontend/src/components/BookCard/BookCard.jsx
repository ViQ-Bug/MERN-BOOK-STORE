import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({data, favourites}) => {

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id
  }
  const handleRemoveBook = async () => {
      const response = await axios.put(`http://localhost:3000/api/v1/remove-book-from-favourite`,{},{headers})
      alert(response.data.message)
  }
  return (
    <div className='bg-zinc-800 rounded p-4'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-800 rounded p-4'>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img src={data.url} alt=""  className='h-[25vh]'/>
          </div>
          <h2 className='mt-4 text-x1 text-zinc-200 font-semibold'>
            {data.title}
          </h2>
          <p className='mt-2 text-zinc-400 font-semibold'>Tác giả: {data.author}</p>
          <p className='mt-2 text-zinc-400 font-semibold text-xl'>Đơn giá:{data.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
        </div>
      </Link>
      {favourites && (
        <button className='bg-yellow-600 texl-xl px-4 py-2 roundde border border-yellow-500 texl-yellow-50 mt-4 cursor-pointer'
        onClick={handleRemoveBook}>Xoá khỏi danh sách yêu thích</button>
      )}
    </div>
  )
}

export default BookCard