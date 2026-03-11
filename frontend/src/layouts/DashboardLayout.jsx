import Sidebar from "../components/Sidebar"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        backgroundColor: "#f8f9fa" // Light background for better contrast
      }}>
        <Navbar />

        {/* This area now scrolls independently */}
        <main style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
