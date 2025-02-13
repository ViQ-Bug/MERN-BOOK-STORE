import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from 'react-icons/fa';
import logo from '../../assets/image/book.png';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links = [
    { title: 'Trang chủ', link: '/' },
    { title: 'Sách', link: '/all-book' },
    { title: 'Giỏ Hàng', link: '/cart' },
    { title: 'Tài khoản', link: '/profile' },
    { title: 'Admin', link: '/profile' },
  ];

  const  isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const role = useSelector((state)=>state.auth.role);
  if(isLoggedIn === false){
    links.splice (3,3);
  }
  if(isLoggedIn == true && role === 'user'){
    links.splice (4,1);
  }
  if(isLoggedIn == true && role === 'admin'){
    links.splice (3,1);
  }

  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
      <nav className='relative z-50 flex bg-zinc-800 text-white px-8 py-4 items-center justify-between'>
        <Link to="/" className='flex items-center'>
          <img className='h-10 me-4' src={logo} alt="Logo" />
          <h1 className='text-2xl font-semibold'>BookViQ</h1>
        </Link>
        <div className='nav-links-book flex items-center gap-4'>
          {/* Desktop Navigation */}
          <div className='hidden md:flex gap-4'>
            {links.map((item, i) => (
              <>
              <div className='flex items-center justify-center'>
                {item.title === "Tài khoản" || item.title === "Admin" ? <Link 
                to={item.link} 
                className='hover:text-blue-500 border border-blue-500 rounded px-8 py-2 hover:bg-white transition-all duration-300' 
                key={i}
              >
                {item.title}
              </Link>:<Link 
                to={item.link} 
                className='hover:text-blue-500 transition-all duration-300' 
                key={i}
              >
                {item.title}
              </Link>}
              </div>  
              </>
            ))}
          </div>
          {/* Desktop Sign-in/Sign-up */}
          {
            isLoggedIn === false && (<>
            <div className='hidden md:flex gap-4'>
            <Link 
              to="/sign-in" 
              className="px-8 py-2 font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              Đăng nhập
            </Link>
            <Link 
              to="/sign-up" 
              className="px-8 py-2 font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            >
              Đăng ký
            </Link>
          </div></>)
            }
          {/* Mobile Menu Toggle Button */}
          <button 
            className='text-white text-2xl hover:text-zinc-400 md:hidden' 
            onClick={() => setMobileNav(!mobileNav)}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileNav && (
        <div className="bg-zinc-800 h-screen fixed top-0 left-0 w-full z-40 flex flex-col items-center justify-center">
          {links.map((item, i) => (
            <Link 
              to={item.link} 
              className='text-white text-5xl font-semibold hover:text-blue-500 transition-all duration-300 mb-8' 
              key={i}
              onClick={() => setMobileNav(false)}
            >
              {item.title}
            </Link>
          ))}
          {
            isLoggedIn === false && (<>
            <Link 
            to="/sign-in" 
            className="px-8 py-2 text-3xl mb-8 font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
            onClick={() => setMobileNav(false)}
          >
            Đăng nhập
          </Link>
          <Link 
            to="/sign-up" 
            className="px-8 py-2 text-3xl mb-8 font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
            onClick={() => setMobileNav(false)}
          >
            Đăng ký
          </Link></>) 
          }
        </div>
      )}
    </>
  );
};

export default Navbar;
