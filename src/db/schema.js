const mongoose = require('mongoose')

const schema = mongoose.Schema;

const UserSchema = new schema({
    name: String,
    username: String,
    password: String,
    googleId: String,
    isAdmin: Boolean,
    provider: String,
    cart: [
        {
            itemid: String,
            quantity: {
                type: Number,
                default: 1,
            },
        }
    ]





});

const productSchema = new schema({
    name: String,
    price: {
        originalPrice: Number,
        discountedPrice: Number,
        disocuntPercentage: Number,

    },
    category: String,
    options: [
        {
            name: String,
            price: Number,

        }
    ],
    option2: [
        {
            name: String,
            price: Number
        }
    ],
    images: {
        mainImage: {
            name: String,
            desc: String,
            img:
            {
                data: Buffer,
                contentType: String
            }
        },
        otherImages: [
            {
                name: String,
                desc: String,
                img:
                {
                    data: Buffer,
                    contentType: String
                }
            }
        ]
    },
    reviews: [
        {
            user: String,
            description: String,
            Date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    description: String,
});

const Product = mongoose.model("products", productSchema)
const User = mongoose.model("user", UserSchema);



module.exports = { User, Product };