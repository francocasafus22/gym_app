import cron from "node-cron";
import Membresia from "../models/Membresia.js";

// Job que se ejecuta cada día a las 00:00
export const updateMembresias = cron.schedule("0 0 * * *", async () => {
    try {
        const hoy = new Date();
        // Busca todas las membresias cuya fechaFin sea menor que la fecha de hoy y cambia su estado a false
        const result = await Membresia.updateMany({fechaFin: {$lt: hoy}, estado:true}, {$set:{estado:false}})
    
        console.log(`Se han actualizado ${result.modifiedCount} membresias vencidas`);

    } catch (error) {
        console.error("Error al actualizar las membresias:", error.message);
    }
});