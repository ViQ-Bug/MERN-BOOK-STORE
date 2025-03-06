import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const [data, setData] = useState({
    title: '',
    author: '',
    desc: '',
    price: '',
    language: '',
    file: null, // Lưu file ảnh mới (nếu có)
    url: '', // Hiển thị ảnh cũ
  });

  const { id } = useParams();
  const nav = useNavigate();

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submit = async () => {
    try {
      if (
        data.title === '' ||
        data.author === '' ||
        data.desc === '' ||
        data.price === '' ||
        data.language === ''
      ) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
      }

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('author', data.author);
      formData.append('desc', data.desc);
      formData.append('price', data.price);
      formData.append('language', data.language);

      if (data.file) {
        formData.append('file', data.file);
      }

      const response = await axios.put(
        'http://localhost:3000/api/v1/update-book',
        formData,
        { headers }
      );

      alert(response.data.message);
      nav(`/view-book-details/${id}`);
    } catch (error) {
      console.error(error);
      alert('Cập nhật sách thất bại');
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-book-by-id/${id}`
      );
      setData({
        ...response.data.data,
        file: null, // Reset file khi load
      });
    };
    fetchBook();
  }, [id]);

  return (
    <div className="h-screen p-4 bg-zinc-900">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-300 mb-6">
        Sửa sách
      </h1>
      <div className="p-6 bg-zinc-800 rounded-xl shadow-lg">
        {/* Ảnh bìa hiện tại */}
        <div className="mb-4">
          <label className="text-zinc-400 block mb-2">Ảnh bìa hiện tại</label>
          {data.url && (
            <img
              src={data.url}
              alt="Ảnh bìa"
              className="w-32 h-48 object-cover rounded-lg mb-4"
            />
          )}
        </div>

        {/* Upload ảnh mới */}
        <div className="mb-4">
          <label className="text-zinc-400 block mb-2">Ảnh bìa mới (nếu muốn thay)</label>
          <input
            type="file"
            className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-lg outline-none border border-zinc-700 focus:border-yellow-500 transition"
            onChange={(e) => setData({ ...data, file: e.target.files[0] })}
          />
        </div>

        {/* Tên sách */}
        <div className="mb-4">
          <label className="text-zinc-400 block mb-2">Tên sách</label>
          <input
            type="text"
            className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-lg outline-none border border-zinc-700 focus:border-yellow-500 transition"
            name="title"
            value={data.title}
            onChange={change}
            placeholder="Nhập vào tên sách"
          />
        </div>

        {/* Tên tác giả */}
        <div className="mb-4">
          <label className="text-zinc-400 block mb-2">Tên tác giả</label>
          <input
            type="text"
            className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-lg outline-none border border-zinc-700 focus:border-yellow-500 transition"
            name="author"
            value={data.author}
            onChange={change}
            placeholder="Nhập vào tên tác giả"
          />
        </div>

        {/* Ngôn ngữ & Giá tiền */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="text-zinc-400 block mb-2">Ngôn ngữ</label>
            <input
              type="text"
              className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-lg outline-none border border-zinc-700 focus:border-yellow-500 transition"
              name="language"
              value={data.language}
              onChange={change}
              placeholder="Nhập vào ngôn ngữ"
            />
          </div>
          <div className="w-1/2">
            <label className="text-zinc-400 block mb-2">Giá tiền</label>
            <input
              type="number"
              className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-lg outline-none border border-zinc-700 focus:border-yellow-500 transition"
              name="price"
              value={data.price}
              onChange={change}
              placeholder="Nhập vào giá tiền"
            />
          </div>
        </div>

        {/* Mô tả */}
        <div className="mb-4">
          <label className="text-zinc-400 block mb-2">Mô tả</label>
          <textarea
            className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-lg outline-none border border-zinc-700 focus:border-yellow-500 transition resize-none"
            name="desc"
            rows="5"
            value={data.desc}
            onChange={change}
            placeholder="Nhập vào mô tả sách"
          />
        </div>

        {/* Nút Cập nhật */}
        <button
          className="w-full bg-yellow-600 text-lg px-5 py-3 rounded-lg font-semibold text-yellow-50 border border-yellow-500 hover:bg-yellow-700 transition cursor-pointer"
          onClick={submit}
        >
          Cập nhật
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
