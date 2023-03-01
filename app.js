const express = require("express")
const bodyParser = require("body-parser")
const router = require("./routers/routers")
require("./connection/mongoDB")
const Product = require("./model/product");
const Category = require("./model/category")

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)

app.listen(3000, ()=>{
    console.log("Started listening at port 3000");
})
