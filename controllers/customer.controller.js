const Products = require("../models/Products");


exports.diplayProducts= async(req,res) =>{
     const vendorObject = JSON.parse(req.data);
     if (vendorObject.role=="CUSTOMER")
     {
      await Products.find().then((result)=>{
        res.status(200).send(result)
      }).catch((err)=>{
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the product.",
        });
      })
    }else{
      res.status(403).json("Only Customers can view all products!");
    }
}

exports.purchaseProduct =async(req,res)=>{
        const vendorObject = JSON.parse(req.data);
        if (vendorObject.role=="CUSTOMER") {
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
      } else {
        res.status(403).json("Only Customers can purchase product!");
      }  
}