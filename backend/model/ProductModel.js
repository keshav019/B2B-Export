const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    reviews: [{
        userName: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    }
});

// Calculate average rating before saving the product
productSchema.pre('save', function (next) {
    if (this.reviews.length > 0) {
        const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        this.averageRating = totalRating / this.reviews.length;
    }

    next();
});

const ProductModel = mongoose.model('Products', productSchema);

module.exports = ProductModel;
