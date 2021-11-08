const jwt = require('jsonwebtoken')
const User = require('../models/user')

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token, role: "admin" });

        if (!user) {
            res.status(401).send({
                success: false,
                message: 'Administrator Authentication Needed',
            });
        }

        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ success: false, message: "Administrator Authentication Needed" });
    }
}

module.exports = adminAuth