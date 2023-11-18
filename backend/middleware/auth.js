const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');


const extractBearerToken = (header) => {
    const tokenArray = header.split(' ');
    if (tokenArray.length === 2 && tokenArray[0] === 'Bearer') {
        return tokenArray[1];
    }
    return null;
};



exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return next(new ErrorHandler('Please provide a valid token in the Authorization header', 401));
    }

    const token = extractBearerToken(authorizationHeader);

    if (!token) {
        return next(new ErrorHandler("Please Login to Access", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}

exports.checkSelf = asyncErrorHandler(async (req, res, next) => {
    const user = req.user;
    const id = req.params.id;
    return user._id === id;
})
