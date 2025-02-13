const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if(isBookInCart){
            return res.json({
                stauts: "Thành công",
                message: "Sách đang trong giỏ hàng"
            })
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid},
        });
        return res.json({
            status: "Thành công",
            message: "Sách đã thêm vào giỏ hàng"
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid}
        });
        return res.json({
            status: "Thành công",
            message: "Sách đã xoá khỏi giỏ hàng"
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//get cart of user
router.get("/get-cart", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status: "Thành công",    
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})

module.exports = router;