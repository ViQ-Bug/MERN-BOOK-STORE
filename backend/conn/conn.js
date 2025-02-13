const mongoose = require("mongoose");
require("dotenv").config(); 

const conn = async () => {
    try {
        await mongoose.connect(process.env.URL); 
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
    }
}

conn();
