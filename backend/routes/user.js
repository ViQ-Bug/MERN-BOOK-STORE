const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Register
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Tên tài khoản phải lớn hơn 4 ký tự" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Tên tài khoản đã tồn tại" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        if (password.length <= 5) {
            return res.status(400).json({ message: "Mật khẩu phải lớn hơn 5 ký tự" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, phonenumber, password: hashedPassword, address });

        await newUser.save();
        return res.status(201).json({ message: "Đăng ký thành công" });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
});

// Login
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ message: "Thông tin xác thực không hợp lệ" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Thông tin xác thực không hợp lệ" });
        }

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
             "bookStore123",
            { expiresIn: "1d" }
        );

        return res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
});

// Get all users
router.get("/profile",authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id);
        return res.status(200).json(data);
    }
    catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
// Update user
router.put("/update",authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id, {address});
        return res.status(200).json({message:"Cập nhận thành công"});
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
module.exports = router;
