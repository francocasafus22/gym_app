export default function NewsCard({ title, image }) {
  return (
    <div
      className="news-card"
      style={{
        background: "#fff",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        border: "1px solid #e5e7eb",
        marginBottom: "16px",
        width: "100%",
        maxWidth: "550px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "10px",
          color: "#1a1a1a",
        }}
      >
        {title}
      </h3>

      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          borderRadius: "12px",
          objectFit: "cover",
          marginTop: "8px",
        }}
      />
    </div>
  );
}