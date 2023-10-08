const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    let token;

    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];
    }
    var decodedToken = null;

    if (token) {
      try {
        decodedToken = await jwt.verify(token, 'secret', { expiresIn: '7d' });

        req.user = decodedToken;
        next();
      } catch (err) {
        console.log(err)
        return res.status(401).json({ msg: "Error Token!" });
      }

      // return decodedToken
    } else {
      res.status(401).json({ msg: "Not found JWT" });
    }
  } catch (err) {
    res.status(401).json({ msg: "Account is not validate JWT" });
  }
}

module.exports = checkAuth;