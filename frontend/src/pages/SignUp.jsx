import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  })
  const nav = useNavigate()
  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,[name]: value
    });
  }
  const submit = async (e) => {
    try {
      if(values.username === ""|| values.email === ""|| values.password === ""|| values.address === "")
        {
          alert("Vui lòng nhập đầy đủ thông tin")
        } else {
          const response = await axios.post(
            "http://localhost:3000/api/v1/sign-up", values);
            alert("Đăng ký thành công")
            nav("/sign-in")
        };
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center h-screen justify-center'>
      <div className='bg-zinc-800 p-8 rounded px-5 w-full  md:w-3/6 lg:w-2/6'>
        <p className='text-zinc-200 text-xl'>Đăng ký</p>
          <div className='mt-4'>
            <div>
              <label htmlFor="" className='text-zinc-400'>Username</label>
            </div>
            <input type="text" 
            className='w-full bg-zinc-900 mt-2 p-2 rounded text-zinc-100 outline-none'
            placeholder='Nhập tên người dùng'
            name='username'
            required
            value={values.username}
            onChange={change}
            />
          </div>
          <div className='mt-4'>
              <div>
                <label htmlFor="" className='text-zinc-400'>Email</label>
              </div>
              <input type="email" 
              className='w-full bg-zinc-900 mt-2 p-2 rounded text-zinc-100 outline-none'
              placeholder='Nhập email'
              name='email'
              required
              value={values.email}
              onChange={change}
              />
          </div>
          <div>
              <label htmlFor="" className='text-zinc-400'>Password</label>
              <input type="password" 
              className='w-full bg-zinc-900 mt-2 p-2 rounded text-zinc-100 outline-none'
              placeholder='Nhập vào mật khẩu'
              name='password'
              required
              value={values.password}
              onChange={change}
              />
          </div>
          <div className='mt-4'>
              <label htmlFor="" className='text-zinc-400'>Địa chỉ</label>
              <textarea 
              className='w-full bg-zinc-900 mt-2 p-2 rounded text-zinc-100 outline-none'
              placeholder='Nhập địa chỉ'
              name='address'
              required
              value={values.address}
              onChange={change}
              />
          </div>
          <div className='mt-4'>
              <button className='w-full bg-blue-500 p-2 text-white font-semibold rounded hover:bg-blue-600' onClick={submit}>
                Đăng ký
              </button>
          </div>
          <div className='mt-4 flex flex-col items-center justify-center m-2'>
                <label htmlFor="" className="text-zinc-400 justify-center font-semibold">Or</label>
                <p>Đã có tài khoản.<Link to ="/sign-in" className='text-blue-500'>Đăng nhập</Link></p>
          </div>    
      </div>
    </div>  
  )
}

export default SignUp