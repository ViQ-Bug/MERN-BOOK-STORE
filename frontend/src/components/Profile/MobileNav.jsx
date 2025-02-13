import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
    {
      role === "user" && (<div className='h-full flex items-center justify-between my-8'>
        <Link to="/profile" className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Yêu thích
        </Link>
        <Link to="/profile/ordersHistory" className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Lịch sử mua hàng
        </Link>
        <Link to="/profile/settings" className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Cài đặt
        </Link>
    </div>
    )
    }
    { 
      role === "admin" && (<div className='h-full flex items-center justify-between my-8'>
        <Link to="/profile" className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Đơn hàng
        </Link>
        <Link to="/profile/add-book" className='text-zinc-100 font-semibold w-full  text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Thêm sách
        </Link>
    </div>
    )
    }
    </>
  )
}

export default MobileNav