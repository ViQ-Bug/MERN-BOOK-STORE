import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth'
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const nav = useNavigate()
  const dispatch = useDispatch()
  const change = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,[name]: value
    });
  }
  const submit = async () => {
    try {
      if(values.username === ""||  values.password === "")
        {
          alert("Vui lòng nhập đầy đủ thông tin")
        } else {
          const response = await axios.post(
            "http://localhost:3000/api/v1/sign-in", values);
            console.log(response)
            dispatch(authActions.login());
            dispatch(authActions.changeRole(response.data.role));
            localStorage.setItem("id", response.data.id)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("role", response.data.role)
            alert("Đăng nhập thành công")
            nav("/profile")
        };
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <div className='bg-zinc-900 px-12 py-8 flex items-center h-screen justify-center'>
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
              <button className='w-full bg-blue-500 p-2 text-white font-semibold rounded hover:bg-blue-600' onClick={submit}>
                Đăng nhập
              </button>
          </div>
          <div className='mt-4 flex flex-col items-center justify-center m-2'>
                <label htmlFor="" className="text-zinc-400 justify-center font-semibold">Or</label>
                <p>Chưa có tài khoản.<Link to ="/sign-up" className='text-blue-500'>Đăng Ký</Link></p>
          </div>    
      </div>
    </div>  
  )
}

export default SignIn