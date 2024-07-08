import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
    variantID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});     

const Variant = mongoose.model("Variant", variantSchema);

export default Variant;