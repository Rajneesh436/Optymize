const express = require("express")
const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    categoryId:{
        type:Number,
        required:true
    },
    categoryName:{
        type:String,
        required:true
    }
})

//create a collection

const categoryCollection = new mongoose.model("categoryCollection", categorySchema)

module.exports = categoryCollection;
