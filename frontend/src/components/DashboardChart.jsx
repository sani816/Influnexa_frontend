import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function DashboardChart({ stats }) {

  const data = [
    {
      name: "Brands",
      total: stats.totalBrands || 0,
    },
    {
      name: "Creators",
      total: stats.totalCreators || 0,
    },
  //    {
  //   name: "Campaigns",
  //   total: stats.totalCampaigns || 0,
  // },
  // {
  //   name: "Revenue",
  //   total: stats.totalRevenue || 0,
  // },
  ];

  return (
    <div className="bg-white p-5 rounded-xl mt-8">

      <h2 className="text-2xl font-bold mb-4">
        Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="total" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default DashboardChart;