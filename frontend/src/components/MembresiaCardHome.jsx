import { capitalize, fechaDiaMesAño } from "../utils/formatText";

export default function MembresiaCardHome({ data }) {
    return (
        <div className="bg-zinc-800 shadow-2xl h-90 flex flex-col text-center rounded-3xl">
            <div className="flex flex-col justify-center items-center px-5 h-4/5 rounded-t-3xl w-full">
                <h1 className="text-5xl font-bold">{capitalize(data.nombre)}</h1>
                <p className="text-2xl font-bold mt-2 text-accent ">${data.precio}</p>
                <p className="text-lg font-light mt-2 w-full overflow-hidden">
                    {data.descripcion}
                </p>
            </div>
            <p className="text-md font-light text-gray-400 mb-5">
                Actualizado: {fechaDiaMesAño(data.updatedAt)}
            </p>
        </div>
    );
}