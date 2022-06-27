const Products = require("../models/Products");
const Orders = require("../models/Orders");


exports.diplayProducts= async(req,res) =>{
   
     
      await Products.find(req.query.category?{ category: req.query.category }:{}).sort({createdAt: 'desc'}).then((result)=>{
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
        const customerObject = JSON.parse(req.data);
        console.log(`v_id:${customerObject._id}`)
      if(customerObject.role=="CUSTOMER")

      {
        
        try {
            const purchase={
              customer_id:customerObject._id,
              items:req.body.items,
              price:req.body.price,
              paymentStatus:req.body.paymentStatus,
              shipTo:req.body.shipTo

          }

          console.log(`items:${req.body.items.length}`)

          Orders.create(purchase)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the product.",
            });
          });
          
        } catch (err) {
          res.status(500).json(err);
        }
      }else{
        res.status(401).send({
             message:"Only CUSTOMERS can buy new products"
        })
    }
       
}


exports.viewOrders = async(req,res)=>{
  const customerObject = JSON.parse(req.data);
  await Orders.find({ customer_id:customerObject._id }).sort({createdAt: 'desc'}).then((result)=>{
    res.status(200).send(result)
  }).catch((err)=>{
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving the product.",
    });
  })
}