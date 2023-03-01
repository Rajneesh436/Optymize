const express = require("express")
const router = new express.Router();
const Product = require("../model/product")
const Category = require("../model/category")

//create product
router.post("/create/product", async (req, res)=>{
    try {
        const CId = req.body.categoryId;
        if(CId!=undefined){
        const output = await Category.find({categoryId: CId});
        if(output.length===0){
            res.status(404).send(`There is no category listed with category id ${CId}`)
        }else{

        const product = new Product(req.body);
        product.save();
        res.status(201).send("created successfully...")
    }
}
else{
    const product = new Product(req.body);
        product.save();
        res.status(201).send("created successfully...")
}
    } catch(e){
        res.send(e);
    }
})


//create category
router.post("/create/category", (req, res)=>{
    try{
        
        const category = new Category(req.body);
        category.save();
        res.status(201).send("created successfully...")
    }catch(e){ res.send(e)}
})


//readAll entries
router.get("/readAll", async (req, res)=>{
    try {
   //fetch data of product from database
   const productData = await Product.find();

   //Collect categoryIds from product data
   const categoryIds = productData
   .filter(product => product.categoryId)
   .map(product => product.categoryId);

   //fetch category data for categoryIds
   const categoryData = await Category.find({categoryId:{$in : categoryIds}});

   //merge product and category data based on categoryId
   const responseData = productData.map(product =>{
    if(!product.categoryId){
    return product.toObject();
   }
   const productCategory = categoryData.find(category => category.categoryId===product.categoryId);
   return{...product.toObject(), category:productCategory}
});
res.send(responseData)
        
    } catch (e) {
        res.send(e);
    }
})


//read a particular entry
router.get("/read/:pid",async (req, res)=>{
try{

    const productData = await Product.find({productId:req.params.pid});
    if(productData.length===0){
        res.send("There is no product with this product Id")
    } else{   
        const categoryIds = await productData.map(product=>product.categoryId);
        console.log(categoryIds);
        const categoryData = await Category.find({categoryId:{$in : categoryIds}});
        console.log(categoryData);
         //merge product and category data based on categoryId
         const responseData = productData.map(product =>{
            const productCategory =categoryData.find(category => category.categoryId ===product.categoryId);
            return {...product.toObject(), category:productCategory};
         });
    res.send(responseData)
}
}catch(e){ res.send(e)}
})


//update a particular entry
router.patch("/update/:pid", async (req, res)=>{
    try{
    
    const productByPId = await Product.findOneAndUpdate({productId:req.params.pid}, req.body, {new:true});
    if(!productByPId){
        res.send(`There is no product with product id ${req.params.pid}`)
    }
    else{
        res.send(productByPId);
    }}catch(e){
        res.send(e)
    }
})


//delete a particular entry
router.delete("/delete/:pid",async (req, res)=>{
    try{
    const productByPId = await Product.findOneAndRemove({productId:req.params.pid});
    if(!productByPId){
        res.send(`There is no product id ${req.params.pid}`);
    }
    else{
        res.send(`product id ${req.params.pid} deleted successfully...`)
    }}catch(e){
        res.send(e)
    }
})


module.exports = router;
