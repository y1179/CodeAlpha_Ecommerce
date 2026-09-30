const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        longDescription: {
            type: String,
            required: true
        },

        ingredients: [
            {
                type: String
            }
        ],

        flavor: {
            type: String,
            required: true
        },

        size: {
            type: String,
            required: true
        },

        calories: {
            type: Number,
            required: true
        },

        tags: [
            {
                type: String
            }
        ],

        stock: {
            type: Number,
            required: true,
            default: 0
        },

        rating: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);