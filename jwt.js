const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) =>{
    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try{
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;
    next();
    }catch(err){
        console.log(err);
        res.status(401).json({ error: 'Invalid token'});
    }
}

// Funtion to generate JWT token 
const generateToken = (userDate) => {
    // Generate a new JWT token using user data
    // return jwt.sign(userDate, process.env.JWT_SECRET, {expiresIn: 30});
    return jwt.sign(userDate, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddleware, generateToken}