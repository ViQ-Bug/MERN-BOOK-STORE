import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const headers = {
          id: localStorage.getItem('id'),
          authorization: `Bearer ${localStorage.getItem('token')}`,
        }
        const response = await axios.get('http://localhost:3000/api/v1/get-order-history', { headers })
        setOrders(response.data.data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [])

  return (
    <>
      {!orders.length ? (
        <div className='flex items-center justify-center h-[100%]'>
          <Loader />
        </div>
      ) : (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Đơn hàng của bạn</h1>

            {/* Table Header */}
            <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
              <div className='w-[3%] text-center'>TT.</div>
              <div className='w-[22%] text-center'>Sách</div>
              <div className='w-[45%] text-center'>Mô tả</div>
              <div className='w-[9%] text-center'>Giá</div>
              <div className='w-[16%] text-center'>Trạng thái</div>
              <div className='w-[5%] md:block hidden text-center'>Mode</div>
            </div>

            {/* Order List */}
            {orders.map((item, i) => (
              <div key={i} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
                <div className='w-[3%] text-center'>{i + 1}</div>
                <div className='w-[22%] text-center'>
                  <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
                    {item.book.title}
                  </Link>
                </div>
                <div className='w-[45%] text-center'>{item.book.desc.slice(0, 50)}...</div>
                <div className='w-[9%] text-center'>
                  {item.book.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                </div>
                <div className='w-[16%] font-semibold text-center'>
                  {item.status === 'Đặt hàng' ? (
                    <span className='text-yellow-500'>{item.status}</span>
                  ) : item.status === 'Đã hủy' ? (
                    <span className='text-red-500'>{item.status}</span>
                  ) : (
                    item.status
                  )}
                </div>
                <div className='w-[5%] md:block hidden text-center text-sm text-zinc-400'>COD</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default UserOrderHistory
