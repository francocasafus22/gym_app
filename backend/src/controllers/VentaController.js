import Venta from "../models/Venta.js";
import Producto from "../models/Producto.js"

export default class VentaController {

    static async getAll(req,res){
        try {
            const ventas = await Venta.find();
            res.json(ventas)
        } catch (error) {
            console.error("[GET VENTAS] Error: ", error.message);
            res.status(500).json({error: error.message})
        }
    }

    static async create(req, res){
        try {
            const {productos, metodo} = req.body            
            const ids = productos.map(p=>p.productoId)

            const productosDB = await Producto.find({
                _id: {$in: ids}
            })


            const venta = {
                productos: productosDB.map(p=>{
                    const item = productos.find(i=>i.productoId === p._id.toString());

                    return {
                        producto: p._id,
                        nombre: p.nombre,
                        precio: p.precio,
                        cantidad: item.cantidad,
                        total: p.precio * item.cantidad
                    }
                }                
                ),
                total: productosDB.reduce((acc, p)=>{
                    const item = productos.find(i=>i.productoId === p._id.toString());

                    return acc + (item.cantidad * p.precio)
                }, 0),
                metodoPago: metodo
            }

            await Venta.create(venta)

            res.status(201).json({message: "Venta creada correctamente"})
        } catch (error) {
            console.error("[CREATE VENTAS] Error: ", error.message);
            res.status(500).json({error: error.message})
        }
    }

}