import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected route token base
export const requireSignin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: 'No token provided'
            });
        }
        let token = authHeader;
        if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

//admin access
export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized Access'
            });
        }
        const user = await userModel.findById(req.user._id);
        if (!user || user.role != 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized Access'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware!!"
        })
    }
};