const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./conn/conn");


const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", User)
app.use("/api/v1", Books)
app.use("/api/v1", Favourite)
app.use("/api/v1", Cart)
app.use("/api/v1", Order)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});