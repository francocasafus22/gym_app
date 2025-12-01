import { Schema, model, Types } from "mongoose"; 

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        maxLength: 255
    },
    precio: {
        type: Number,
        required: true,
        default: 0,
        min: 1
    },
    precioCosto: {
        type: Number,
        required: true,
        default: 0,
        min: 1
    },
    stock: {
        type: Number,
        required: true,
        default: 0,        
    },    
    categoria: {
        type: String,
        enum: ["Bebidas", "Snacks", "Suplementos", "Accesorios", "Indumentaria"],
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
},
{
    timestamps: true
})

const Producto = model("Producto", productoSchema)

export default Producto