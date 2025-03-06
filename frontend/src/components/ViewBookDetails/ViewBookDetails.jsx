import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { GrLanguage } from 'react-icons/gr';
import { FaEdit, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { MdOutlineDelete } from 'react-icons/md';

const ViewBookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const nav = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
        bookid: id
    }
    const handleFavourite = async () => {
        try {
            const response = await axios.put("http://localhost:3000/api/v1/add-book-to-favourite", {}, { headers });
            alert(response.data.message);
        } catch (error) {
            console.error("Error adding to favourites:", error);
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.put("http://localhost:3000/api/v1/add-to-cart", {}, { headers });
            alert(response.data.message);
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const deleteBook = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/delete-book`, { headers });
            alert(response.data.message);
            nav("/all-book");
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    if (loading) {
        return (
            <div className="h-screen bg-zinc-900 flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <>
            {data && (
                <div className="px-4 md:px-12 p-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
                    <div className="px-4 w-full lg:w-3/6">
                        <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 py-12 rounded">
                            <img src={data.url} alt="/" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded" />
                            {isLoggedIn && role === "user" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-around mt-4 lg:mt-0">
                                    <button
                                        className="cursor-pointer text-white rounded-full text-3xl p-3 bg-red-500 flex items-center"
                                        onClick={handleFavourite}
                                    >
                                        <FaHeart />
                                        <span className="ms-2 block lg:hidden">Yêu thích</span>
                                    </button>
                                    <button
                                        className="cursor-pointer text-white rounded-full text-3xl p-3 lg:mt-4 bg-blue-500 flex items-center"
                                        onClick={handleCart}
                                    >
                                        <FaShoppingCart />
                                        <span className="ms-2 block lg:hidden">Thêm vào giỏ hàng</span>
                                    </button>
                                </div>
                            )}
                            {isLoggedIn && role === "admin" && (
                                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-around mt-4 lg:mt-0">
                                    <Link to={`/update-book/${id}`} className="text-white rounded-full text-3xl p-3 bg-red-500 flex items-center cursor-pointer">
                                        <FaEdit />
                                        <span className="ms-2 block lg:hidden">Chỉnh sửa sản phẩm</span>
                                    </Link>
                                    <button
                                        className="text-white rounded-full text-3xl p-3 lg:mt-4 bg-blue-500 flex items-center cursor-pointer"
                                        onClick={deleteBook}
                                    >
                                        <MdOutlineDelete />
                                        <span className="ms-2 block lg:hidden">Xoá sản phẩm</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6">
                        <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
                        <p className="mt-1 text-zinc-400">Tác giả: {data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            <GrLanguage className="me-2" /> Ngôn ngữ: {data.language}
                        </p>
                        <p className="mt-2 text-zinc-400 font-semibold text-xl">
                            Đơn giá: {data.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewBookDetails;
