const Products = require("../models/Products");
const Orders = require("../models/Orders");
const VendorStatistics = require("../models/VendorStatistics");

exports.diplayProducts = async (req, res) => {
  await Products.find()
    .where(
      req.query.category
        ? { category: { $regex: req.query.category, $options: "i" } }
        : {}
    )
    .where(
      req.query.name
        ? {
            $or: [
              { name: { $regex: req.query.name, $options: "i" } },
              { tags: { $regex: req.query.name, $options: "i" } },
              {category:{$regex: req.query.name, $options: "i"}}
            ],
          }
        : {}
    )
    .where(req.query.tags ? { tags: req.query.tags } : {})
    .sort({ createdAt: "desc" })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred during retrieving the product.",
      });
    });
};

exports.viewCategories = async (req, res) => {
  const categoriers = [
    "Pottery",
    "Paintings",
    "Apparel",
    "Used",
    "Books",
    "Crockery",
    "Antiques",
    "Utensils",
    "Textiles",
    "Handicrafts",
    "Wood Crafts",
    "Paper Crafts",
    "Ornaments",
  ];
  res.send(categoriers);
};

exports.findProductById = async (req, res) => {
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
};

exports.purchaseProduct = async (req, res) => {
  const customerObject = JSON.parse(req.data);
  console.log(`v_id:${customerObject._id}`);
  if (customerObject.role == "CUSTOMER") {
    try {
      const purchase = {
        customer_id: customerObject._id,
        items: req.body.items,
        price: req.body.price,
        paymentStatus: req.body.paymentStatus,
        shipTo: req.body.shipTo,
      };

      console.log(`items:${req.body.items.length}`);

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

      for (let i = 0; i < req.body.items.length; i++) {
        // console.log(req.body.items[i].name);
        Promise.all([
          VendorStatistics.create({
            vendor_id: req.body.items[i].vendor_id,
            product_id: req.body.items[i].product_id,
            name: req.body.items[i].name,
            price: req.body.items[i].price,
            quantity: req.body.items[i].quantity,
          }),
          Products.findOneAndUpdate(
            { _id: req.body.items[i].product_id },
            { $inc: { stock: req.body.items[i].quantity * -1 } }
          ),
        ]);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).send({
      message: "Only CUSTOMERS can buy new products",
    });
  }
};

exports.viewOrders = async (req, res) => {
  const customerObject = JSON.parse(req.data);
  await Orders.find({ customer_id: customerObject._id })
    .sort({ createdAt: "desc" })
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
