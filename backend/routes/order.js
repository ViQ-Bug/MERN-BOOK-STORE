const router = require("express").Router();
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;  
        const { order } = req.body;  

        if (!id) {
            return res.status(400).json({ message: "Thiếu ID người dùng" });
        }

        if (!order || !Array.isArray(order) || order.length === 0) {
            return res.status(400).json({ message: "Đơn hàng không hợp lệ" });
        }

        const orderPromises = order.map(async (orderData) => {
            const newOrder = new Order({ user: id, book: orderData._id }); 
            const orderDataFrom = await newOrder.save();

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFrom._id },
                $pull: { cart: orderData._id }  
            });
        });

        await Promise.all(orderPromises); 

        return res.json({
            status: "Thành công",
            message: "Đặt hàng thành công",
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
});

//get order history of user
router.get("/get-order-history",authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {
                path: "book",
            }
        });
        const ordersData = userData.orders.reverse();
        return res.json({
            status: "Thành công",
            data: ordersData,
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//get all order --admin
router.get("/get-all-order",authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
        .populate({
            path: "book",})
        .populate({
            path: "user",
        })
        .sort({createdAt:-1});
        return res.json({
            status: "Thành công",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//update order --admin
router.put("/update-order/:id",authenticateToken, async (req,res)=>{
    try {
      const {id} = req.headers;
      const status = req.body.status;
      await Order.findByIdAndUpdate(id,{status});
      return res.json({
        status: "Thành công",
        message:"Cập nhật thông tin thành công"});  
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})


module.exports = router;    