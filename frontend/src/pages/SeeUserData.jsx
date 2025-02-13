import React from 'react'
import { RxCross1 } from 'react-icons/rx'

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  return (
    <>
      <div className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-zinc-900 opacity-60 transition-all duration-300`}></div>
      <div className={`${userDiv} fixed top-0 left-0 h-screen w-full flex items-center justify-center transition-transform duration-300`}>
        <div className='bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[60%] lg:w-[40%] text-zinc-800 border border-zinc-300'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-3xl font-bold text-zinc-700'>Thông tin người dùng</h1>
            <button onClick={() => setUserDiv("hidden")} className='p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all'>
              <RxCross1 size={20} />
            </button>
          </div>
          <div className='space-y-4 text-lg'>
            <p><strong>Tên người dùng:</strong> {userDivData.username}</p>
            <p><strong>Email:</strong> {userDivData.email}</p>
            <p><strong>Địa chỉ:</strong> {userDivData.address}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeeUserData
