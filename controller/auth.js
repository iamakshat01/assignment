const db = require('../models');
const jwt = require('jsonwebtoken');

const registerHandler = async (req, res, next) => {
    try {
        const user = await db.User.create(req.body);
        const { id, username } = user;
        const token = jwt.sign({ id, username }, process.env.SECRET);
        return res.status(201).json({
            id,
            username,
            token,
        });
    } catch (err) {
        if (err.code === 11000) {
            return next({
                status: 409,
                message: 'Sorry, that username is already taken',
            });
        }
        return next({
            status: 400,
            message: err.message,
        });
    }
};
  
// login a user
const loginHandler = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            username: req.body.username,
        });
        const { id, username } = user;
        const valid = await user.comparePassword(req.body.password);

        if (valid) {
        const token = jwt.sign({ id, username }, process.env.SECRET);
            return res.status(200).json({
                id,
                username,
                token,
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        return next({ status: 401, message: 'Invalid Username/Password' });
    }
};

module.exports = {loginHandler, registerHandler};