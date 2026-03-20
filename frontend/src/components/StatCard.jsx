export default function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}