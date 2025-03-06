const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });
//add book --admin
router.post("/add-book", authenticateToken, upload.single('file'), async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Bạn không có quyền để thực hiện thao tác" });
        }

        const book = new Book({
            url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        await book.save();
        res.status(200).json({ message: "Thêm sách thành công" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//update book --admin
router.put("/update-book", authenticateToken, upload.single('file'), async (req, res) => {
    try {
      const { id, bookid } = req.headers;
      const user = await User.findById(id);
  
      if (!user || user.role !== "admin") {
        return res.status(403).json({ message: "Bạn không có quyền để thực hiện thao tác" });
      }
  
      const book = await Book.findById(bookid);
      if (!book) {
        return res.status(404).json({ message: "Không tìm thấy sách" });
      }
  
      // Nếu có file mới upload thì cập nhật url mới, không thì giữ url cũ
      if (req.file) {
        book.url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }
  
      book.title = req.body.title;
      book.author = req.body.author;
      book.price = req.body.price;
      book.desc = req.body.desc;
      book.language = req.body.language;
  
      await book.save();
  
      res.status(200).json({ message: "Cập nhật sách thành công" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi máy chủ", error });
    }
  });
  
//delete book --admin
router.delete("/delete-book", async (req, res) => {
    try {
        const {id} = req.headers;
        const user =await User.findById(id);
        if(user.role !== "admin"){
            return res.status(400).json({ message: "Bạn không có quyền để thực hiện thao tác" });
        }
        const {bookid}= req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"Xóa thành cong"});
        
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//get all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt:-1});
        return res.json({
            status: "success",
            data: books,
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//get recent books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt:-1}).limit(20);
        return res.json({
            status: "success",
            data: books,
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const {id}= req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "success",
            data: book,
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})

module.exports = router;