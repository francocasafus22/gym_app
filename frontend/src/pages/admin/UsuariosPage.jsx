import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/GymAPI";
import { fechaDiaMesAño } from "../../utils/formatText"
import { Search } from "lucide-react";
import Loading from "../../components/Loading";

const UsuariosPage = () => {

    const {data, isError, error, isLoading} = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
        retry: 1,
        refetchOnWindowFocus: false
    })

    if(isLoading) return <div className="min-h-[80vh] flex justify-center"><Loading/></div>
    
    const cardPrueba = () => {
        return (
            <div className="flex flex-col text-center  rounded-xl shadow-2xl bg-transparent border-1  border-border">
                    <p className="mt-5 text-2xl font-bold">{data.users[0].firstName} {data.users[0].lastName}</p>
                    <p className="text-xl text-accent">DNI: {data.users[0].dni}</p>
                    <div className="flex justify-center px-10 py-5">
                    <img
                        src="https://media-eze1-1.cdn.whatsapp.net/v/t61.24694-24/425167858_1302455100751259_3306639410341461049_n.jpg?ccb=11-4&oh=01_Q5Aa2wHfPeZ8w1ST6eDlSDWltssCfNbSnR0EhJPwwbvEg4TM-g&oe=68FC04D6&_nc_sid=5e03e0&_nc_cat=108"
                        alt="Foto de perfil"
                        className="w-32 h-32 rounded-xl object-cover shadow-md"
                    />
                    </div>

                    <p>Membresia vence: <span className="text-accent">{fechaDiaMesAño(data.users[0].membresia[0].fechaFin)}</span></p>
                    <p>Estado: <span className="text-accent">{data.users[0].membresia[0].estado ? "En pago": "Vencida"}</span></p>                    
                    <div className="flex flex-row justify-center gap-5 mx-5 ">
                        <button className="px-6 py-2 w-full my-5 bg-accent text-accent-foreground rounded-lg hover:brightness-80  transition-all duration-200 cursor-pointer">
                            Renovar Membresia
                        </button>
                        <button className="px-6 py-2 w-full my-5  bg-accent text-accent-foreground rounded-lg hover:brightness-80  transition-all duration-200 cursor-pointer">
                            Asignar Rutina
                        </button>
                    </div>
                    <p className="text-border text-center mb-2 ml-5">Socio desde: {fechaDiaMesAño(data.users[0].createdAt)}</p>
                </div>
        )
    }

    return (
        <div className="min-h-screen  p-10 max-w-7xl mx-auto">

            <h1 className="text-center mb-5 text-5xl font-bold ">Socios</h1>
            
            <div className="flex items-center w-full my-5 px-3 py-2 gap-2 rounded-xl border border-border focus-within:ring-2 focus-within:ring-accent">
                <Search className="text-sceondary w-5 h-5 " />
                <input
                    type="text"
                    placeholder="Busqueda por dni, nombre o apellido"
                    className="flex-1 w-full bg-transparent outline-none"
                />
                <span className="text-sm text-gray-500 whitespace-nowrap">
                    {data.total} resultados
                </span>
            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {cardPrueba()}
                {cardPrueba()}
                {cardPrueba()}
                {cardPrueba()}
                {cardPrueba()}
                {cardPrueba()}
            </div>
        </div>
    );
}

export default UsuariosPage;