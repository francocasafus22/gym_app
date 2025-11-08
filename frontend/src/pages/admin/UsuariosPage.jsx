import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/GymAPI";
import { Search } from "lucide-react";
import Loading from "../../components/Loading";
import CardUsers from "../../components/CardUsers";
import { useState } from "react";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import NuevoUsuarioForm from "../../components/forms-modal/NuevoUsuarioForm";

const UsuariosPage = () => {
  const [queryInput, setQueryInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenNewUserModal, setIsOpenNewUserModal] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => getAllUsers(queryInput, currentPage),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleQuery = (e) => {
    e.preventDefault();
    refetch();
  };

  if (isLoading)
    return (
      <div className="min-h-[80vh] flex justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="min-h-screen  p-10 max-w-7xl mx-auto">
      <h1 className="text-center mb-5 text-5xl font-bold  ">Socios</h1>

      <form className="flex flex-row items-center gap-2" onSubmit={handleQuery}>
        <Search className="text-secondary" />
        <input
          type="text"
          placeholder="Busqueda por dni, nombre o apellido"
          className="flex-1 w-full bg-transparent outline-none flex items-center my-5 px-3 py-2 gap-2 rounded-xl border border-border focus-within:ring-2 focus-within:ring-accent"
          onChange={(e) => setQueryInput(e.target.value)}
        />
        <button
          className="bg-accent rounded-xl w-1/4 py-2 hover:brightness-90 transition-all duration-150 cursor-pointer text-accent-foreground"
          type="submit"
        >
          Buscar
        </button>
      </form>

      <button
        className="w-full bg-accent rounded-lg py-2 mb-5 hover:brightness-90 shadow-xl hover:shadow-2xl cursor-pointer transition-all duration-200 text-accent-foreground"
        onClick={() => {
          setIsOpenNewUserModal(true);
        }}
      >
        Nuevo Usuario
      </button>

      {data?.users?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.users.map((user) => (
            <CardUsers key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary">No se encontraron usuarios</p>
      )}
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {isOpenNewUserModal && (
        <Modal
          onClose={() => setIsOpenNewUserModal(false)}
          isOpen={isOpenNewUserModal}
        >
          <NuevoUsuarioForm onClose={() => setIsOpenNewUserModal(false)} />
        </Modal>
      )}
    </div>
  );
};

export default UsuariosPage;
