const customProducts = require("../models/CustomProducts");

exports.createCustomProduct = async (req, res) => {
    const customerObject = JSON.parse(req.data);
   
    
      const product = {
        vendor_id: req.body.vendor_id,
        customer_id:customerObject._id ,
        description:req.body.description,
        customPic:req.file.path,
        deadline:req.body.deadline,
        price:req.body.price,
      };
      customProducts.create(product)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the product.",
          });
        });
    
  };


  exports.findAllCustomProduct = async (req, res) => {
    const vendorObject = JSON.parse(req.data);
    const vendorId = vendorObject._id;
  
    await customProducts.find({ vendor_id: vendorId })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving the product.",
        });
      });
  };
