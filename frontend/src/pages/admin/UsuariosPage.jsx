import {ArrowLeft, ArrowRight} from "lucide-react"
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/GymAPI";
import { fechaDiaMesAño } from "../../utils/formatText"
import { Search } from "lucide-react";
import Loading from "../../components/Loading";
import CardUsers from "../../components/CardUsers";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

const UsuariosPage = () => {
    
    const [queryInput, setQueryInput] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const {data, isError, error, isLoading, refetch} = useQuery({
        queryKey: ["users", currentPage],
        queryFn: ()=>getAllUsers(queryInput, currentPage),            
        retry: 1,
        refetchOnWindowFocus: false
    })  
    
    const handleQuery = (e) => {
        e.preventDefault()
        refetch()
    }


    console.log(data);
    

    if(isLoading) return <div className="min-h-[80vh] flex justify-center"><Loading/></div>
    
    return (
        <div className="min-h-screen  p-10 max-w-7xl mx-auto">

            <h1 className="text-center mb-5 text-5xl font-bold ">Socios</h1>
            
            <form className="flex flex-row items-center gap-2" onSubmit={handleQuery}>               
                    <Search className="text-secondary" />
                    <input
                        type="text"
                        placeholder="Busqueda por dni, nombre o apellido"
                        className="flex-1 w-full bg-transparent outline-none flex items-center my-5 px-3 py-2 gap-2 rounded-xl border border-border focus-within:ring-2 focus-within:ring-accent"
                        onChange={(e)=>setQueryInput(e.target.value)}
                    />                                  
                <button className="bg-accent rounded-xl w-1/4 py-2 hover:brightness-90 transition-all duration-150 cursor-pointer text-secondary" type="submit">
                        Buscar
                </button> 
            </form>  
                {data?.users?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {data.users.map((user)=>(
                            <CardUsers key={user._id} user={user}/>
                        ))}
                    </div>
                ) : <p className="text-center text-gray-500">No se encontraron usuarios</p>
                }
            <Pagination
                currentPage={data.currentPage}
                totalPages={data.totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
}

export default UsuariosPage;