import React from 'react'
import anh1 from '../../assets/image/6721752.jpg'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='h-[75vh] flex flex-col md:flex-row items-center justify-center'>
        <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
            <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-200 text-center lg:text-left'>Khám Phá Cuốn Sách Tuyệt Vời Tiếp Theo Của Bạn</h1>
                <p className='mt-4 text-xl text=zinc-300 text-center lg:text-left'>Khám phá những câu chuyện hấp dẫn, kiến ​​thức phong phú và nguồn cảm hứng bất tận trong bộ sưu tập sách được tuyển chọn của chúng tôi</p>
            <div className='mt-8'>
                <Link to="/all-book" className='text-yellow-100 text-xl lg:text-2xl font-semibold mt-4 border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>
                    Khám Phá
                </Link>
            </div>
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
            <img className='' src={anh1} alt="" />
        </div>
    </div>
  )
}

export default Hero