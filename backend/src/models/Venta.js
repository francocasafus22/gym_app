import { Schema, model, Types } from "mongoose";

const ventaSchema = new Schema({
    productos: [{
    producto: {
        type: Types.ObjectId,
        ref: "Producto",
        required: true
    },
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    total: {type: Number, required: true}
    }],
    total: {type: Number, required: true},
    metodoPago: {type: String, enum: ["Efectivo", "Transferencia"]}
},
{
    timestamps: true
})

const Venta = model("Venta", ventaSchema)

export default Venta