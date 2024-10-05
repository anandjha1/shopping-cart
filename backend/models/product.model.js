import mangoose from 'mongoose';

const productSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true // createdAt, updateAt
});

const Product = mangoose.model("Product", productSchema);

export default Product;