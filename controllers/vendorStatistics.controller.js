const VendorStatistics = require("../models/VendorStatistics");

exports.findStatistics = async(req,res) =>{
    const id = req.params.id;

        await VendorStatistics.find({ vendor_id:id})
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(400).send({
              message: "Statistics of the given vendor not found",
            });
          });
}