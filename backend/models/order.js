const mongoose = require("mongoose");

const order = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "books"
    },
    quantity: {
        type: Number,
        default: 1
    },
    status:{
        type: String,
        default: "Đặt hàng",
        enum: ["Đặt hàng", "Đang giao", "Đã giao", "Đã hủy"]
    }
},
{
    timestamps: true
}
);


module.exports = mongoose.model("order", order);
