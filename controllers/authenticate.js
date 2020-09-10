const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({
            message: 'You must put a valid token in your petition'
        });
        return;
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user_name = decodedToken.user_name;

    next();
};