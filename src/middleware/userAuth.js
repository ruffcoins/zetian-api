const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        //If user is not found, return an error



        if (!user) {
            return res.status(401).send({
                success: false,
                message: 'Please Authenticate',
            });
        }

        req.user = user;
        next();
    } catch (e) {
        return res.status(401).send({ success: false, message: "Please Authenticate" });
    }
}

module.exports = userAuth