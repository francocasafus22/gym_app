import Producto from "../models/Producto.js";

export default class ProductoController{

    static async getAll (req,res){
        console.log("query")
        try {
            const {page = 1, q} = req.query;
            const limit = 20;
            const skip = (Number(page) - 1) * limit;


        const query = {           
            ...(q
            ? {nombre: { $regex: q, $options: "i" } }
            : {}),
        };

            const productos = await Producto.find(query).skip(skip).limit(limit);
            const totalProductos = await Producto.countDocuments(query);
            
            res.json({
                productos,
                totalProductos,
                currentPage: Number(page),
                totalPages: Math.ceil(totalProductos / limit)
            }) 
        } catch (error) {
            console.error("[GET PRODUCTOS] Error: ", error.message);
            res.status(500).json({error: "Hubo un error al obtener los productos"})
        }
    }

    static async create (req,res){
        try {
            await Producto.create(req.body);
            res.status(201).json({message: "Producto creado correctamente"})
        } catch (error) {
            console.error("[CREATE PRODUCTO] Error: ", error.message);
            res.status(500).json({error: "Hubo un error al crear el producto"})
        }
    }

    static async delete(req,res){
        try {
            const {productoId} = req.params
            const product = await Producto.findById(productoId);
            if(!product){
                const error = new Error("Producto no encontrado");
                res.status(404).json({error: error.message})
                return
            }

            await product.deleteOne();

            res.json({message: "Producto eliminado correctamente"})
        } catch (error) {
            console.error("[CREATE PRODUCTO] Error: ", error.message);
            res.status(500).json({error: "Hubo un error al crear el producto"})
        }
    }

}