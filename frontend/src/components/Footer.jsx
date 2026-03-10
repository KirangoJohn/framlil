export default function Footer() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "15px",
        borderTop: "1px solid #ddd",
        marginTop: "auto",
        background: "#f8fafc"
      }}
    >
      © {new Date().getFullYear()} Developed and Powered by Zinofit Technologies
    </div>
  );
}