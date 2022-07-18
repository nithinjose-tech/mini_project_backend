const customProducts = require("../models/CustomProducts");

exports.createCustomProduct = async (req, res) => {
  const customerObject = JSON.parse(req.data);
  const requestData = JSON.parse(req.body.requestData);
  var product = {
    vendor_id: requestData.vendor_id,
    customer_id: customerObject._id,
    description: requestData.description,
    deadline: requestData.deadline,
    minPrice: requestData.minPrice,
    maxPrice: requestData.maxPrice,
    quantity: requestData.quantity,
  };
  if (requestData.product_id) {
    product = { product_id: requestData.product_id, ...product };
  }
  if (req.file) {
    product = { customPic: req.file.path, ...product };
  }
  customProducts
    .create(product)
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

  await customProducts
    .find({ vendor_id: vendorId })
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

exports.acceptRequest = async(req,res)=>{
    const vendorObject = JSON.parse(req.data);

    if (vendorObject.role == "VENDOR") {
      try {
        await customProducts.findByIdAndUpdate(req.params.id,{status:"ACCEPT"},{ new: true }).then((result) => {
          res.status(200).json(result);
        });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Customers are not allowed to access this functionality!");
    }

}
