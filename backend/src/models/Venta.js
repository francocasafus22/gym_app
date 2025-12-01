import { Schema, model, Types } from "mongoose";

const ventaSchema = new Schema({
    productos: [{
        producto: {
        type: Types.ObjectId,
        ref: "Producto",
        required: true
    },
    name: {type: String, required: true},
    price: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    total: {type: Number, required: true}
    }],
    total: {type: Number, required: true},
    metodoPago: {type: String, enum: ["efectivo", "transferencia"]}
},
{
    timestamps: true
})

const Venta = model("Venta", ventaSchema)

export default Venta