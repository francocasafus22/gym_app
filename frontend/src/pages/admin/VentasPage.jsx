import { Search } from "lucide-react";
import TablaProductos from "../../components/TablaProductos";
import { useQuery } from "@tanstack/react-query";
import { getAllProductos } from "../../api/GymAPI";
import Loading from "../../components/Loading";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import { useEffect } from "react";

const VentasPage = () => {

    const [currentPage, setCurrentPage] = useState(1)   
    const [query, setQuery] = useState("")
    const [lastQuery, setLastQuery] = useState("")


    const {data,isLoading, refetch} = useQuery({
        queryKey: ["productos", currentPage, lastQuery],
        queryFn: ()=>getAllProductos(query, currentPage),
        retry: 1,
        refetchOnWindowFocus: false
    })

    const handleSubmit = (e) => {
        e.preventDefault()                  
        if(lastQuery == query) return
        setLastQuery(query)
        setCurrentPage(1)
    }    

    return (
        <div className='min-h-screen flex flex-col md:flex-row w-full'>

            <div className='md:w-4/5 pt-10'>
                <p className='text-5xl font-bold text-center'>Productos</p>
                
                <form className="flex flex-row items-center gap-2 px-10" onSubmit={(e)=>handleSubmit(e)}>
                    <Search className="text-secondary" />
                    <input
                    type="text"
                    placeholder="Busqueda por nombre"
                    className="flex-1 w-full bg-transparent outline-none flex items-center my-5 px-3 py-2 gap-2 rounded-xl border border-border focus-within:ring-2 focus-within:ring-accent"
                    onChange={(e)=>{setQuery(e.target.value)}}
                    />
                    <button
                    className="bg-accent rounded-xl w-1/4 py-2 hover:brightness-90 transition-all duration-150 cursor-pointer text-accent-foreground"
                    type="submit"
                    >
                    Buscar
                    </button>
                </form>

                {
                    isLoading  
                    ? 
                    <div className="flex items-center justify-center h-[60vh]"><Loading/></div> 
                    :
                    <>
                    <TablaProductos data={data}/>
                    <Pagination
                    currentPage={data.currentPage}
                    totalPages={data.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                    />
                    </>
                }
                
            </div>
            <div className='border-l pt-10 border-border md:w-1/5'>
                <p className='text-4xl font-bold text-center'>Carrito</p>
            </div>
                
        </div>
    );
}

export default VentasPage;