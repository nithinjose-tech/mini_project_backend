const jwt = require("jsonwebtoken");
const Users = require('../models/Users');

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(`Real error:${err}`);
        res.json({ auth: false, message: "Failed to Authenticated" });
      } else {
        // console.log("Decided Value");
        // console.log(JSON.stringify(decoded));
        // console.log(`UniqueID:${decoded.uniqueID}`);
        const uniqueid = decoded.id;
        // console.log(`Uniqueis:${JSON.stringify(uniqueid)}`)
        // console.log(`UniqueID:${decoded.id}`);

        Users.findById(uniqueid).then((userObject) => {
          // console.log(`Data:${userObject.role}`);
          const loggedUser = JSON.stringify(userObject);
          // console.log(`Data:${loggedUser}`);
          req.data = loggedUser;
          // console.log(`Req.data=${req.data}`);
          next();
        });
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;