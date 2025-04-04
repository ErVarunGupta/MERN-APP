const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next)=>{
    const token = req.headers['authorization'];
    // console.log(token);
    if(!token){
        return res.status(403).json({
            message: 'Unauthorized, JWT token is required'
        });
    }

    try{//check token is correct, expire

        // const bearerToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;//use decoded data like email, name
        next();
    }catch(err){
        return res.status(403).json({
            message: 'Unauthorized, JWT token wrong or expire'
        })
    }
}

module.exports = ensureAuthenticated;