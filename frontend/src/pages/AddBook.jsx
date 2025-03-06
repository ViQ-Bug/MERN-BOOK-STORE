import axios from 'axios'
import React, { useState } from 'react'

const AddBook = () => {

  const [data, setData] = useState({
    file: null, 
    title: "",
    author: "",
    desc: "",    
    price: "", 
    language: "",
});
const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
}
const change = (e) => {
  const { name, value, files } = e.target;
  if (name === "file") {
      setData({
          ...data,
          file: files[0],
      });
  } else {
      setData({
          ...data,
          [name]: value,
      });
  }
};
const submit = async () => {
  try {
      if (
          !data.file ||
          data.title === "" ||
          data.author === "" ||
          data.desc === "" ||
          data.price === "" ||
          data.language === ""
      ) {
          alert("Vui lòng nhập đầy đủ thông tin");
      } else {
          const formData = new FormData();
          formData.append("file", data.file);
          formData.append("title", data.title);
          formData.append("author", data.author);
          formData.append("desc", data.desc);
          formData.append("price", data.price);
          formData.append("language", data.language);

          const response = await axios.post(
              "http://localhost:3000/api/v1/add-book",
              formData,
              { headers }
          );

          setData({
              file: null,
              title: "",
              author: "",
              desc: "",    
              price: "", 
              language: "",
          });
          alert(response.data.message);
      }
  } catch (error) {
      alert("Thêm sách thất bại");
  }
};
  return (
    <div className="h-full p-4">
    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-300 mb-6">Thêm sách</h1>
    <div className="p-6 bg-zinc-800 rounded-xl shadow-lg">
      {/* Ảnh bìa */}
      <div className="mb-4">
        <label className="text-zinc-400 block mb-2">Ảnh bìa</label>
        <input
          type="file"
          className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-lg outline-none border border-zinc-700 focus:border-yellow-500 transition"
          name="file"
          required
          value={data.url}
          onChange={change}
          placeholder="Nhập vào ảnh bìa"
        />
      </div>
  
      {/* Tên sách */}
      <div className="mb-4">
        <label className="text-zinc-400 block mb-2">Tên sách</label>
        <input
          type="text"
          className="w-full bg-zinc-900 text-zinc-100 p-3 rounded-lg outline-none border border-zinc-700 focus:border-yellow-500 transition"
          name="title"
          required
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
          required
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
            required
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
            required
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
          required
          value={data.desc}
          onChange={change}
          placeholder="Nhập vào mô tả sách"
        />
      </div>
  
      {/* Nút Thêm */}
      <button
        className="w-full bg-yellow-600 text-lg px-5 py-3 rounded-lg font-semibold text-yellow-50 border border-yellow-500 hover:bg-yellow-700 transition cursor-pointer"
        onClick={submit}
      >
        Thêm sách
      </button>
    </div>
    </div>
  
  )
}

export default AddBook