
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products.json");

dotenv.config();

const seedProducts = async () => {
    try {
        await connectDB();

        // Remove existing products
        await Product.deleteMany();

        // Insert products
        await Product.insertMany(products);

        console.log("✅ 7 products added successfully!");
        console.log("🍦 Frosty Bliss products seeded to MongoDB Atlas.");

        await mongoose.connection.close();

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding products:", error.message);

        await mongoose.connection.close();

        process.exit(1);
    }
};

seedProducts();
