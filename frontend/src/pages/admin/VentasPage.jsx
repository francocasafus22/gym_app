import { Search } from "lucide-react";
import TablaProductos from "../../components/TablaProductos";

const VentasPage = () => {
    return (
        <div className='min-h-screen flex flex-col md:flex-row w-full'>

            <div className='md:w-4/5 pt-10'>
                <p className='text-5xl font-bold text-center'>Productos</p>

                <form className="flex flex-row items-center gap-2 px-10" onSubmit={()=>{}}>
                    <Search className="text-secondary" />
                    <input
                    type="text"
                    placeholder="Busqueda por nombre"
                    className="flex-1 w-full bg-transparent outline-none flex items-center my-5 px-3 py-2 gap-2 rounded-xl border border-border focus-within:ring-2 focus-within:ring-accent"
                    onChange={()=>{}}
                    />
                    <button
                    className="bg-accent rounded-xl w-1/4 py-2 hover:brightness-90 transition-all duration-150 cursor-pointer text-accent-foreground"
                    type="submit"
                    >
                    Buscar
                    </button>
                </form>
                <TablaProductos/>
            </div>
            <div className='border-l pt-10 border-border md:w-1/5'>
                <p className='text-4xl font-bold text-center'>Carrito</p>
            </div>

        </div>
    );
}

export default VentasPage;