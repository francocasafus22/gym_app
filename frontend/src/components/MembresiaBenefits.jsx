import MembresiaCardHome from "./MembresiaCardHome";

export default function MembresiasBenefits({ data }) {
  console.log(data);

  const membresias = [
    {
      nombre: "Plan Mensual",
      precio: data[0].precio,
      destacado: false,
      beneficios: [
        { incluido: true, texto: "Acceso a zona de musculación" },
        { incluido: true, texto: "Acceso a zona cardio" },
        {
          incluido: false,
          texto: "Clases grupales (spinning, funcional, etc.)",
        },
        { incluido: false, texto: "Entrenador personal" },
        { incluido: false, texto: "Seguimiento nutricional" },
        { incluido: false, texto: "Rutina personalizada" },
      ],
    },
    {
      nombre: "Plan Trimestral",
      precio: data[1].precio,
      destacado: true,
      beneficios: [
        { incluido: true, texto: "Acceso a zona de musculación" },
        { incluido: true, texto: "Acceso a zona cardio" },
        { incluido: true, texto: "Clases grupales incluidas" },
        { incluido: true, texto: "Rutina personalizada mensual" },
        { incluido: true, texto: "Seguimiento personalizado con entrenador" },
        { incluido: false, texto: "Acceso a nutricionista" },
        { incluido: false, texto: "Acceso al spa / sauna" },
      ],
    },
    {
      nombre: "Plan Anual",
      precio: data[2].precio,
      destacado: false,
      beneficios: [
        {
          incluido: true,
          texto: "Acceso total a todas las áreas del gimnasio",
        },
        {
          incluido: true,
          texto: "Clases ilimitadas (funcional, box, spinning, etc.)",
        },
        { incluido: true, texto: "Entrenador personal asignado" },
        { incluido: true, texto: "Seguimiento nutricional y corporal mensual" },
        {
          incluido: true,
          texto: "Rutinas personalizadas actualizadas mensualmente",
        },
        { incluido: true, texto: "Acceso al spa y sauna" },
        { incluido: true, texto: "Descuentos en suplementos y merchandising" },
      ],
    },
  ];

  return (
    <section id="planes" className=" px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {membresias.map((membresia, i) => (
          <MembresiaCardHome key={i} data={membresia} />
        ))}
      </div>
    </section>
  );
}
