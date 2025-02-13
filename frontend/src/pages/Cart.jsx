import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import anh1 from '../assets/image/cart.png'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

  const [cart,setCart] = useState()
  const [total,setTotal] = useState(0)
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }
  const nav = useNavigate();

  useEffect(() => {
    const fetch = async ()=>{
      const res = await axios.get('http://localhost:3000/api/v1/get-cart',{headers});
    setCart(res.data.data)
    }
    fetch();
  },[cart])
  const deleteItem = async (bookid) => {
    const response = await axios.put(`http://localhost:3000/api/v1/remove-from-cart/${bookid}`,{},{headers});
    alert(response.data.message)
  }
  useEffect(()=>{
    if(cart && cart.length >0){
      let total = 0;
      cart.map((items)=>{
        total += items.price;
      })
      setTotal(total);
      total = 0;
    }
  },[cart])
  const placeOrder = async ()=>{
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/place-order`,{order:cart},{headers})
      alert(response.data.message)
      nav("/profile/ordersHistory")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    {!cart && <div className='w-full h-screen flex items-center justify-center]'><Loader /></div>}
      {cart && cart.length === 0 && (
        <div className='h-screen bg-zinc-800'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-5xl font-semibold text-zinc-400'>
              Giỏ hàng trống
            </h1>
            <img src={anh1} alt="" />
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <div className='bg-zinc-900 px-12 h-screen'>
        <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Giỏ hàng</h1>
        {cart.map((items,i)=>(
          <div className='w-full mu-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
          key={i}
          >
            <img src={items.url} alt="/" className='h-[20vh] md:h-[10vh] object-cover' />
            <div className='w-full md:w-auto'> 
              <h1 className='text-2xl tent-zinc-100 font-semibold text-start mt-2 md:mt-0'>{items.title}</h1>
              <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                {items.desc.slice(0,100)}...
              </p>
              <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:block'>
                {items.desc.slice(0,65)}...
              </p>
              <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
                {items.desc.slice(0,100)}...
              </p>
            </div>
            <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
              <h2 className='text-zinc-100 text-3xl font-semibold'>{items.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h2>
              <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
              onClick={() => deleteItem(items._id)}><AiFillDelete /></button>
            </div>
          </div>
        ))}
          {cart && cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
        <div className='p-4 bg-zinc-800 rounded'>
          <h1 className='text-3xl font-semibold text-zinc-200 mb-8'>Tổng tiền</h1>
          <div className='mt-3 flex items-center justtify-between text-xl text-zinc-200'>
            <h2>{cart.length} Sách:</h2>
            <h2>{total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</h2>
          </div>
          <div className='w-[100%] mt-3'>
            <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-500'
            onClick={placeOrder}>Đặt hàng</button>
          </div>
          </div>
        </div>
      )}
        </div>
      )}
    </>
    
  )
}

export default Cart