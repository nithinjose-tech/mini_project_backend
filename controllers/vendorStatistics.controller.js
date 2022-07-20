const VendorStatistics = require("../models/VendorStatistics");
const Products = require("../models/Products");

exports.findStatistics = async(req,res) =>{

  const vendorObject = JSON.parse(req.data);
  const vendorId = vendorObject._id;

   
    if(req.body.Fromdate!=null)
    {

        var start = new Date(req.body.Fromdate);
        start.setHours(0,0,0,0);
        var end = new Date(req.body.Todate);
        end.setHours(23,59,59,999);

  }else{


        var start = new Date("1683-12-27");
        start.setHours(0,0,0,0);
        var end = new Date();
        end.setHours(23,59,59,999);

        
          
  }
   
   
  if(start.getTime()>end.getTime())
  {
    res.send({
              message:"Start date cannot be greater than end date",
            });

            return
  }


    Promise.all([
      VendorStatistics.find({ vendor_id:vendorId}).where({createdAt: {$gte:start, $lte:end}}),
      Products.find({ vendor_id: vendorId }),
      VendorStatistics.aggregate([{
        $match: {
          vendor_id:vendorId
        },
      },{
        $project : {
            year : {
                $year : "$createdAt"
            },
            month : {
                $month : "$createdAt"
            },
            week : {
                $week : "$createdAt"
            },
            day : {
                $dayOfWeek : "$createdAt"
            },
            _id : 1,
            price : 1
        }
    }, {
        $group : {
            _id : {
                year : "$year",
                month : "$month",
                week : "$week",
                day : "$day"
            },
            totalWeightDaily : {
                $sum : "$price"
            }
        }
    },
    {
        $group : {

            _id : {
                year : "$_id.year",
                month : "$_id.month",
                week : "$_id.week"
            },
            totalWeightWeekly : {
                $sum : "$totalWeightDaily"
            },
            totalWeightDay : {
                $push : {
                    totalWeightDay : "$totalWeightDaily",
                    dayOfWeek : "$_id.day"
                }
            }
        },
        

        
    }
])
    ]).then( ([ sale, product ,per]) => {

          const saleCount = sale.length;
          const productCount = product.length
          var saleAggregate = 0;
          var productAggregate = 0
          console.log(`SaleCount=${saleCount}`) 
          console.log(`ProductCount=${productCount}`) 

          for(let i=0;i<saleCount;i++)
          {
            saleAggregate += sale[i].price;
          }

          for(let j=0;j<productCount;j++)
          {
            productAggregate += product[j].price;
          }

           console.log(`saleag:${saleAggregate}`)
           console.log(`prodag:${productAggregate}`)
           console.log(start.getTime())

        const ultData = {
             sales:sale,
             saleCount:saleCount,
             saleAggregate:saleAggregate,
             productCount:productCount,
             productAggregate:productAggregate,
             perDay:per



        }
                res.send(ultData)
                // res.send(per)


          
        
    })
    .catch((err)=>{
      console.log(err)
    })

    

        
    


}