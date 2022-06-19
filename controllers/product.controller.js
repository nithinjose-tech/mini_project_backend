const router = require("express").Router();
const Products = require("../models/Products");
let path = require('path');




const jwt = require("jsonwebtoken");





//Create Product
exports.createProduct = async(req,res) =>{
  const vendorObject = JSON.parse(req.data);
  console.log(`Data Field:${req.data}`);
  console.log(`file Field:${req.file.filename}`);
  if(vendorObject.role=="VENDOR")
  {
     const product={
         name:req.body.name,
         category:req.body.category,
         vendor:vendorObject.fullname,
         vendor_id:vendorObject._id,
         stock:req.body.stock,
         price:req.body.price,
         tags:req.body.tags,
         image:req.file.path,
         description:req.body.description,
         
     }

     

     Products.create(product)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the product.",
          });
        });

  }else{
      res.status(401).send({
           message:"Only VENDORS can create new products"
      })
  }

}

//Find all product of a vendor


exports.findAllProducts = async(req,res) => {
    const vendorObject = JSON.parse(req.data);
    const vendorId = vendorObject._id

    await Products.find({vendor_id:vendorId}).then((result)=>{
        res.status(200).send(result)
    }).catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the product.",
        });
      });
}

//find product by id


exports.findProductById = async(req,res) =>{
    const vendorObject = JSON.parse(req.data);

    if (vendorObject.role=="VENDOR") {
        try {
          await Products.findById(req.params.id).then((result=>{
            res.status(200).json(result);
          }))
          
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("Customers are not allowed to access the product!");
      }  
   
}




//delete a product 

exports.deleteProduct = async(req,res)=>{
    const vendorObject = JSON.parse(req.data);

    if (vendorObject.role=="VENDOR") {
        try {
          await Products.findByIdAndDelete(req.params.id);
          res.status(200).json("Product has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("Customers are not allowed to delete the product!");
      }  
}

var filepath = 'images/f4dec649-2f57-4f38-b50e-b6c2453d3574-1652289630675.png'








//Update Product


exports.updateProduct= async (req, res) => {

    const vendorObject = JSON.parse(req.data);
    const product={
      name:req.body.name,
      category:req.body.category,
      stock:req.body.stock,
      price:req.body.price,
      size:req.body.size,
      tags:req.body.tags,
      image:req.file.path,
      description:req.body.description,
      rating:req.body.rating
  }

    if (vendorObject.role=="VENDOR") {
      try {
        const updatedProduct = await Products.findByIdAndUpdate(
          req.params.id,
          {
            $set: product,
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (err) {
        res.status(500).send({
            message: `Cannot update user with id=${ req.params.id}. Maybe User was not found or req.body is empty!`,
          });;
      }
    } else {
      res.status(403).json("CUSTOMERS cannot update the product");
    }
  };

