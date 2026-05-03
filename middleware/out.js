const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ code: 401, message: 'no tienes permiso' });
        }

        const token = req.headers.authorization.split(' ');
        const decoded = jwt.verify(token, 'jwt_secreto'); 

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ code: 401, message: 'no tienes permiso' });
    }
};

module.exports = auth; 