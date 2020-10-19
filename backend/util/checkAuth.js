const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const auth = req.header('Authorization')
    const token=auth.split(' ')[1]
    if (token) {
        const verifyToken = jwt.verify(token, process.env.KEY, { algorithms: 'HS256' })
        if (verifyToken) {
                req.user = verifyToken.id;
                next();
        }else {
            res.status(400).json({
                msg: 'get lost inner block'
            })
        }
    }
    else {
        res.status(400).json({
            msg: 'get lost outer block'
        })
    }
}