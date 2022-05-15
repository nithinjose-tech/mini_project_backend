const Products = require("../models/Products");


exports.diplayProducts= async(req,res) =>{
   
     
      await Products.find(req.query.category?{ category: req.query.category }:{}).then((result)=>{
        res.status(200).send(result)
      }).catch((err)=>{
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the product.",
        });
      })
    
}

exports.viewCategories=async(req,res)=>{
   const categoriers = ["Electronics","Pottery","Digital","Paintings","Sculptures","Crokery","Jewellery","Bags"];
   res.send(categoriers);
}


exports.findProductById = async(req,res) =>{
        const id = req.params.id;

        await Products.findById(id)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(400).send({
              message: "Product with given id not found",
            });
          });
 
}


exports.purchaseProduct =async(req,res)=>{
        const vendorObject = JSON.parse(req.data);
        
        try {
          await Products.updateOne({_id:req.params.id},{$inc: {stock: -1}}).then((async result=>{
            // res.status(200).json(result);
            await Products.findById(req.params.id).then((result=>{
                res.status(200).json(result);
              }))
          }))
          
        } catch (err) {
          res.status(500).json(err);
        }
       
}