import mongoose from "mongoose";

const orderDetailSchema = new mongoose.Schema({
    orderDetailID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    variantID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});     

const OrderDetail = mongoose.model("Variant", orderDetailSchema);

export default OrderDetail;