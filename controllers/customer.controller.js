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
        const vendorObject = JSON.parse(req.data);
        console.log(`v_id:${vendorObject._id}`)
      if(vendorObject.role=="CUSTOMER")

      {
        
        try {
          await Products.updateOne({_id:req.params.id},{$inc: {stock: -1}}).then((async result=>{
            // res.status(200).json(result);
            await Products.findById(req.params.id).then((result=>{
                // res.status(200).json(result);//
                
                Orders.countDocuments({customer_id: vendorObject._id}, function (err, count){ 
                  if(count>0){
                      //document exists });
                      Orders.findOneAndUpdate(
                        {customer_id: vendorObject._id}, 
                        { $push: { orders: {prodcuct_id:req.params.id,paymentStatus:true}} },{ new: true },
                        function (error, success) {
                          if (error) {
                              res.send(error);
                          } else {
                              res.send(success);
                          }
                      });
                  }else{
                    Orders.create({customer_id:vendorObject._id, orders: {prodcuct_id:req.params.id,paymentStatus:true}})
                    .then((data) => {
                      res.send(data);
                    })
                    .catch((err) => {
                      res.status(500).send({
                        message:
                          err.message || "Some error occurred while creating the product.",
                      });
                    });
                  }
              })

              }))
          }))
          
        } catch (err) {
          res.status(500).json(err);
        }
      }else{
        res.status(401).send({
             message:"Only CUSTOMERS can buy new products"
        })
    }
       
}