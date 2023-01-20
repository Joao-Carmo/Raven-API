var jwt = require('jsonwebtoken');

const generateToken = (user_info, callback) => {
  console.log(user_info)
    let secret = process.env.SECRET; 
    let token = jwt.sign({data: user_info}, secret, {expiresIn: '1h'});
    return callback(token); 
}

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Token not provided!"
      });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      next();
    });
  };

exports.generateToken = generateToken
exports.verifyToken = verifyToken