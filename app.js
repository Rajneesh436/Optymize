const express = require("express")
const bodyParser = require("body-parser")
const router = require("./routes/routes")
require("./config/database_connection/mongoDB")
const Product = require("./database_models/product");
const Category = require("./database_models/category")

const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(router)

app.listen(3000, ()=>{
    console.log("Started listening at port 3000");
})
