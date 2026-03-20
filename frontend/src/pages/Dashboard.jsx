import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Farmers" value="120" />
        <StatCard title="Total Fruits" value="10" />
        <StatCard title="Today's Profit" value="$540" />
        <h1 className="text-4xl text-red-500 font-bold">
          TEST TAILWIND
        </h1>
      </div>
    </DashboardLayout>
  );
}