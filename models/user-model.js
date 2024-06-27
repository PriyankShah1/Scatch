// const mongoose = require("mongoose");

// const userSchema= mongoose.Schema({

//     fullname:{
//         type:String,
//         minLength:3,
//         trim:true,
//     },
//     email:String,
//     password:String,
//     cart:[{
        
//         type:mongoose.Schema.Types.ObjectId,
//         ref: "product",
//     }],
//     orders:{
//         type:Array,
//         default:[],
//     },
//     contact:Number,
//     picture:String,

// });



// module.exports= mongoose.model("user", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    orders: {
        type: Array,
        default: [],
    },
    contact: Number,
    picture: String,
});

userSchema.methods.addToCart = function (productId) {
    const cartItem = this.cart.find(
        (item) => item.product.toString() === productId.toString()
    );

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        this.cart.push({ product: productId, quantity: 1 });
    }

    return this.save();
};

module.exports = mongoose.model("user", userSchema);
