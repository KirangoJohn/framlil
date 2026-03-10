import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <DashboardLayout>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
        }}
      >
        <StatCard title="Total Farmers" value="120" />
        <StatCard title="Total Fruits" value="10" />
        <StatCard title="Today's Profit" value="$540" />
      </div>

    </DashboardLayout>
  );
}