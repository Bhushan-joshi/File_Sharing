const User = require('../Model/AuthModel');
const crypto = require('crypto');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.postSignup = async (req, res) => {
    const { email, password ,name } = req.body;
    const errors = validationResult(req);
    const salt = crypto.randomBytes(32).toString('hex');
    const hashPassword = crypto.pbkdf2Sync(password, salt, 5, 64, 'sha256').toString('hex');
    const userExist = await User.findOne({ email: email });
    if (userExist) return res.status(400).json({ message: 'User exist with Email. Try with another Email!' })

    const newUser = new User({
        name:name,
        email: email,
        salt: salt,
        password: hashPassword
    })

    if (errors.isEmpty()) {
        newUser.save().then((userSave) => {
            const token = jwt.sign({
                id: userSave._id,
            }, process.env.KEY, { algorithm: `HS256`, expiresIn: '3600s' })
            const decode = jwt.decode(token);
            res.setHeader('Authorization', token)
            res.status(201).json({
                message: 'user created ',
                id: userSave._id,
                expiresIn: decode.exp,
                token: token
            })
        }).catch(err => {
            console.log(err);
            res.status(400).json({
               ...err
            })
        })
    } else {
        res.status(400).json({
            message: errors.errors[0].message
        })
    }

}


exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).then(founduser => {
        const salt = founduser.salt;
        const hashPassword = crypto.pbkdf2Sync(password, salt, 5, 64, 'sha256').toString('hex');
        if (founduser.password === hashPassword) {
            const token = jwt.sign({
                id: founduser._id,
            }, process.env.KEY, { algorithm: `HS256`, expiresIn: '3600s' });
            const decode = jwt.decode(token);
            res.setHeader('Authorization', token)
            res.status(200).json({
                id: founduser._id,
                message: 'successfully login',
                expiresIn: decode.exp,
                token: token,
            })
        } else {
            res.status(400).json({
                message: 'Invalid Email or password ',
            })
        }
    }).catch(err => {
        res.status(400).json({
            ...err,
            message: 'Invalid Email or password ',
        })
    })
}