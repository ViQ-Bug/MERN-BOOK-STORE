import React from 'react'
import { FaArrowRightToBracket } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {authActions} from '../../store/auth'

const SideBar = ({data}) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const role = useSelector((state) => state.auth.role);
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-around h-autolg:h-[100%]'>
      <div className='flex items-center flex-col justify-center'>
        <img src={data.data.avatar} className="h-[10vh]" alt="" />
        <p className='mt-3 text-xl text-zinc-100 font-semibold'>{data.data.username}</p>
        <p className='mt-1 text-normal text-zinc-300'>{data.data.email}</p>
        <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      </div>
      {
        role === "user" && (<div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to="/profile" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Yêu thích
          </Link>
          <Link to="/profile/ordersHistory" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Lịch sử mua hàng
          </Link>
          <Link to="/profile/settings" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Cài đặt
          </Link>
        </div>
        )
      }
      {
        role === "admin" && (<div className='w-full flex-col items-center justify-center hidden lg:flex'>
          <Link to="/profile" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Đơn hàng
          </Link>
          <Link to="/profile/add-book" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
            Thêm sách
          </Link>
        </div>
        )
      }
      <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900' 
        onClick={()=>{
          dispatch(authActions.Logout());
          dispatch(authActions.changeRole('user'));
          localStorage.clear('id');
          localStorage.clear('token');
          localStorage.clear('role');
          history('/') 
        }}

      >
        Đăng suất <FaArrowRightToBracket className='ms-4'/>
      </button>
    </div>
  )
}

export default SideBar