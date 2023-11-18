const User = require('../model/userModel');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const getOtp = require('../utils/getOtp');

function validateMobileNumber(mobileNumber) {
    const cleanedNumber = mobileNumber.replace(/\D/g, '');

    if (/^\d{10}$/.test(cleanedNumber)) {
        return true;
    } else {
        return false;
    }
}
// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    const { name, mobileNumber } = req.body;
    if (!validateMobileNumber(mobileNumber)) {
        return next(new ErrorHandler("Please Enter a valid mobile number", 400));
    }

    const opt = getOtp();
    const user = await User.create({
        name,
        mobileNumber,
        otp
    });


    return res.status(200).json({
        ...user._doc
    });
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { mobileNumber } = req.body;

    if (!validateMobileNumber(mobileNumber)) {
        return next(new ErrorHandler("Please Enter a valid mobile number", 400));
    }
    if (!mobileNumber) {
        return next(new ErrorHandler("Please Enter mobileNumber", 400));
    }

    const user = await User.findOne({ mobileNumber });

    if (!user) {
        return next(new ErrorHandler("Invalid mobileNumber", 401));
    }
    otp = getOtp();
    user.otp = otp;
    await user.save();
    return res.status(200).json({
        ...user._doc
    });
});


exports.verifyOtp = asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const { otp } = req.body;

    if (!id || !otp) {
        return next(new ErrorHandler("Invalid request", 400));
    }
    const user = await User.findById(id);
    if (!user || user.otp !== otp) {
        return next(new ErrorHandler("Invalid Otp", 401));
    }
    user.otp = null;
    await user.save();

    const token = user.getJWTToken();

    return res.status(200).json({
        ...user._doc,
        token
    });
});




// ADMIN DASHBOARD

// Get All Users --ADMIN
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const { name, ...restOfQuery } = req.query;
    let searchQuery = {};
    if (name) {
        searchQuery = { $text: { $search: name } };
    }
    if (Object.keys(restOfQuery).length > 0) {
        searchQuery = { $and: [searchQuery, restOfQuery] };
    }
    let users = await User.find(searchQuery);
    users = users.filter(user => user.id != req.user.id);
    return res.status(200).json([...users]);

});


// Add User  --ADMIN
exports.addUser = asyncErrorHandler(async (req, res, next) => {

    const { name, mobileNumber, role } = req.body;
    const user = await User.create({
        name,
        mobileNumber,
        role
    });

    return res.status(200).json({
        ...user._doc
    });
});

// Get Single User Details --ADMIN
exports.getSingleUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }

    return res.status(200).json({
        ...user._doc,
    });
});


// Update User Role --ADMIN
exports.updateUserRole = asyncErrorHandler(async (req, res, next) => {


    await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        message: `Role updated to ${req.body.role}`,
    });
});

// Delete Role --ADMIN
exports.deleteUser = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User doesn't exist with id: ${req.params.id}`, 404));
    }
    res.status(200).json({
        "message": "User deleted"
    });
});