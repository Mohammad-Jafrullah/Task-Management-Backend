const jsonwebtoken = require('jsonwebtoken');
const jwt_secret_code = process.env.JWT_SECRET;

const decodeJWT = (req, res, next) => {
    // Get the user's JWT token from the request headers
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ success: false, message: "Please authenticate using a valid token!" });
    }
    try {
        const decodedToken = jsonwebtoken.verify(token, jwt_secret_code);
        req.id = decodedToken.data.id;
        next();
    } catch (error) {
        return res.status(401).send({ success: false, message: "Please authenticate using a valid token!" });
    }
}

// Export the middleware function
module.exports = decodeJWT; 