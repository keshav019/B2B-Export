const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const ProductModel = require("../model/ProductModel");

exports.addProduct = asyncErrorHandler(async (req, res, next) => {
    console.log(req.body);
    const { title, description, price } = req.body;
    const image = req.file.buffer;
    console.log(req.body);
    console.log(image);
    const product = await ProductModel.create({
        title,
        description,
        price,
        image: {
            data: image,
            contentType: req.file.mimetype,
        },
        vendor: req.user._id,
    });
    return res.status(200).json({ ...product._doc });

});

exports.getProductByVendor = asyncErrorHandler(async (req, res, next) => {
    const vendorId = req.user._id;
    const products = await ProductModel.find({ vendor: vendorId });
    return res.status(200).json([...products]);

});


exports.getAllProduct = asyncErrorHandler(async (req, res, next) => {
    const products = await ProductModel.find();
    return res.status(200).json([...products]);

});