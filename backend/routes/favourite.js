const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//add book to favourite
router.put("/add-book-to-favourite",authenticateToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({ message: "Sách đang trong danh sách yêu thích" });
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({ message: "Thêm sách vào yêu thích" });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//remove book from favourite
router.put("/remove-book-from-favourite",authenticateToken, async (req, res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        return res.status(200).json({ message: "Xoá sách khỏi danh sách yêu thích" });
        
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
})
//get favourite books of a user
router.get("/get-favourite-books",authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouritesBooks = userData.favourites;
        return res.json({
            status: "Thành công",
            data: favouritesBooks,
        })
    } catch (error) {
        return res.status(500).json({ message: "Lỗi máy chủ", error });    
    }
});


module.exports = router;