import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { FaCheck, FaUserLarge } from 'react-icons/fa6';
import { IoOpenOutline } from 'react-icons/io5';
import SeeUserData from './SeeUserData';

const AllOrder = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState("hidden");
  // Function to get fresh headers
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
};


  // Fetch orders on component mount
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/get-all-order', { headers });
      setAllOrder(response.data.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle status change
  const changeStatus = (e) => {
    setValues({ status: e.target.value });
  };

  // Submit status update
  const submitChange = async (i) => {
    try {
        const id = allOrder[i]._id;
        await axios.put(`http://localhost:3000/api/v1/update-order/${id}`, values, { headers });

        alert("Cập nhật thành công!");

        // ✅ Cập nhật UI ngay lập tức
        setAllOrder(prevOrders =>
            prevOrders.map(order => 
                order._id === id ? { ...order, status: values.status } : order
            )
        );

        setOptions(-1);
    } catch (error) {
        console.error('Error updating order:', error);
    }
};



  return (
    <>
      {!allOrder.length ? (
        <div className='h-[100%] flex items-center justify-center'><Loader /></div>
      ) : (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Đơn hàng</h1>

            {/* Table Header */}
            <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
              <div className='w-[3%] text-center'>TT.</div>
              <div className='w-[22%] text-center'>Sách</div>
              <div className='w-[45%] text-center'>Mô tả</div>
              <div className='w-[9%] text-center'>Giá</div>
              <div className='w-[16%] text-center'>Trạng thái</div>
              <div className='w-[5%] md:block hidden text-center'><FaUserLarge /></div>
            </div>

            {/* Order List */}
            {allOrder.map((item, i) => (
              <div key={item._id} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
                <div className='w-[3%] text-center'>{i + 1}</div>
                <div className='w-[40%] md:w-[22%] text-center'>
                  <Link to={`/view-book-details/${item.book._id}`} className='hover:text-blue-300'>
                    {item.book.title}
                  </Link>
                </div>
                <div className='md:w-[45%] text-center'>{item.book.desc.slice(0, 50)}...</div>
                <div className='w-[17%] md:w-[9%] text-center'>
                  {item.book.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </div>
                <div className='w-[30%] md:w-[16%] font-semibold text-center'>
                  <button
                    className='hover:scale-105 transition-all duration-300'
                    onClick={() => {
                      setOptions(options === i ? -1 : i);
                      setValues({ status: item.status }); // Set default value
                    }}
                  >
                    {item.status === 'Đặt hàng' ? (
                      <div className='text-yellow-500'>{item.status}</div>
                    ) : item.status === 'Đã hủy' ? (
                      <div className='text-red-500'>{item.status}</div>
                    ) : (
                      <div className='text-green-500'>{item.status}</div>
                    )}
                  </button>

                  {options === i && (
                    <div className="flex mt-2">
                      <select
                        name='status'
                        className='bg-gray-800 px-2 py-1'
                        value={values.status}
                        onChange={changeStatus}
                      >
                        {['Đặt hàng', 'Đang giao', 'Đã giao', 'Đã hủy'].map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className='text-green-500 hover:text-pink-600 mx-2'
                        onClick={() => submitChange(i)}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </div>
                <div className='w-10% md:w-[5%] md:block hidden text-center text-sm text-zinc-400'>
                  <button className='text-xl hover:text-orange-500'
                    onClick={() => {
                      setUserDiv("fixed")
                      setUserDivData(item.user)
                    }}>
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {userDivData && (<SeeUserData 
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}/>
      )}
    </>
  );
};

export default AllOrder;
