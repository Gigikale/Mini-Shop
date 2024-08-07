const jwt = require("jsonwebtoken")

const generalAuthoriser = async (request ,response, next) => {
    try {
      const authorization = request.headers.authorization;
  
      if (authorization === undefined) {
        return response.status(401).json({
          message: `You are not authorized to view this page`,
        });
      }
  
      const token = authorization.split(" ");
      const mainToken = token[1];
      if (!mainToken || mainToken === "") {
        return response.status(401).json({
          status: `Failed`,
          message: `Login required`,
        });
      }
  
      const decode = jwt.verify(mainToken, `mini-shop`)
      request.user = decode;
      next();
    } catch (error) {
      console.log(error.message);
    }
  };

  module.exports = generalAuthoriser