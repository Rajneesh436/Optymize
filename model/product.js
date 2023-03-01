const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productId:{
        type:Number,
        Unique:true,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    qtyPerUnit:Number,
    unitPrice:Number,
    unitInStock:Number,
    discontinued: Boolean,
    categoryId: Number
})

//create a collection
const productCollection = new mongoose.model("productCollection", productSchema);

module.exports = productCollection;
