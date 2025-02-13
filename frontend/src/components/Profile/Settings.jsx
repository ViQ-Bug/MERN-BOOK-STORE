import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'

const Settings = () => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  }
  const [values, setValues] = useState({address: ''});
  const [profile, setProfile] = useState();
  const change = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };
  
  const submitAddress = async ()=>{
    const response = await axios.put('http://localhost:3000/api/v1/update',
    values,
    {headers});
    alert(response.data.message)
  }
  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios.get('http://localhost:3000/api/v1/profile',
      {headers}
      );
      setProfile(response.data)
      setValues({ address: response.data.address})
    };
    
    fetch();
  },[]);
  return (
    <>
    {!profile ? (
  <div className='w-full h-[100%] flex items-center justify-center'>
    <Loader />
  </div>
) : (
  <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
      Thông tin
    </h1>
    <div className='flex gap-12'>
      <div>
        <label>Tên người dùng</label>
        <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
          {profile.username}
        </p>
      </div>
    </div>
    <div>
      <label>Email</label>
      <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
        {profile.email}
      </p>
    </div>
    <div className='mt-4 flex flex-col'>
      <label>Địa chỉ</label>
      <textarea
        className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
        rows="5"
        placeholder='Cập nhật địa chỉ của bạn'
        name="address"
        value={values.address}
        onChange={change}
      ></textarea>
    </div>
    <div className='mt-4 flex justify-end'>
      <button
        className='bg-yellow-500 text-zinc-900 font-semibold py-2 px-3 rounded hover:bg-yellow-400'
        onClick={submitAddress}
      >
        Cập nhật
      </button>
    </div>
  </div>
)}

    </>
  )
}

export default Settings