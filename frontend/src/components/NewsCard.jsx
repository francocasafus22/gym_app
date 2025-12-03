export default function NewsCard({ title, image }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "0", // quitamos padding porque ahora el header tiene color de fondo
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        overflow: "hidden", // para que el fondo rojo respete el borde redondeado
      }}
    >
      {/* ENCABEZADO ROJO — FOTO + TEXTO */}
      <div
        style={{
          background: "#DC2626",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* FOTO DEL USUARIO */}
        <img
          src="/user-placeholder.jpg"
          alt="User"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            objectFit: "cover",
            background: "#fff", // queda más prolija sobre fondo rojo
            padding: "2px",
          }}
        />

        {/* TEXTO RECEPCIÓN */}
        <span
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: "#FFFFFF",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          RECEPCIÓN SPARTAN GYM
        </span>
      </div>

      {/* IMAGEN PRINCIPAL */}
      {image && (
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "0",
            marginBottom: "12px",
            marginTop: "12px",
          }}
        />
      )}

      {/* TÍTULO */}
      <div style={{ padding: "0 16px 16px 16px" }}>
        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
          {title}
        </h3>
      </div>
    </div>
  );
}