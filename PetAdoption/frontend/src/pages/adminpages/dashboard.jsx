import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  ReferenceLine
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    feedbacks: 0,
    totalPets: 0,
    adoptedPets: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.getCounts();
        console.log("Full API Response:", res.data);

        const apiData = res.data.data || res.data;

        console.log("Extracted Data:", apiData); 

        const parsedStats = {
          customers: Number(apiData.total_users) || 0,
          feedbacks: Number(apiData.total_feedbacks) || 0,
          totalPets: Number(apiData.total_pets) || 0,
          adoptedPets: Number(apiData.total_adoptions) || 0,
        };

        console.log("Parsed Stats:", parsedStats); 

        setStats(parsedStats);
      } catch (error) {
        console.error('Failed to fetch dashboard counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: 'Customers', value: stats.customers },
    { name: 'Feedbacks', value: stats.feedbacks },
    { name: 'Total Pets', value: stats.totalPets },
    { name: 'Adopted Pets', value: stats.adoptedPets },
  ];

  // Generate line chart data dynamically
  const lineChartData = Array.from({ length: 7 }).map((_, index) => {
    const factor = (index + 1) / 7;
    return {
      name: `Day ${index + 1}`,
      customers: Math.round(stats.customers * factor),
      feedbacks: Math.round(stats.feedbacks * factor),
      totalPets: Math.round(stats.totalPets * factor),
      adoptedPets: Math.round(stats.adoptedPets * factor),
    };
  });

  const highestValue = Math.max(
    ...lineChartData.map(d => Math.max(d.customers, d.feedbacks, d.totalPets, d.adoptedPets))
  );
  const target = highestValue * 0.8;

  const COLORS = ['#0ea5e9', '#34d399', '#f59e0b', '#8b5cf6'];

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="p-5 bg-blue-100 rounded-lg shadow-md">
          <h3 className="text-md font-medium text-gray-700">Total Customers</h3>
          <p className="text-2xl font-bold text-blue-700">{stats.customers}</p>
        </div>
        <div className="p-5 bg-green-100 rounded-lg shadow-md">
          <h3 className="text-md font-medium text-gray-700">Total Feedback</h3>
          <p className="text-2xl font-bold text-green-700">{stats.feedbacks}</p>
        </div>
        <div className="p-5 bg-yellow-100 rounded-lg shadow-md">
          <h3 className="text-md font-medium text-gray-700">Total Pets</h3>
          <p className="text-2xl font-bold text-yellow-700">{stats.totalPets}</p>
        </div>
        <div className="p-5 bg-purple-100 rounded-lg shadow-md">
          <h3 className="text-md font-medium text-gray-700">Adopted Pets</h3>
          <p className="text-2xl font-bold text-purple-700">{stats.adoptedPets}</p>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Distribution Pie Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={5}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value, 'Count']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Trends Bar Chart Section */}
<div className="bg-gray-50 p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Trends</h2>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={lineChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, (dataMax) => Math.ceil(dataMax / 100) * 100]} />
      <Tooltip />
      <Legend />
      <Bar dataKey="customers" fill="#0ea5e9" />
      <Bar dataKey="feedbacks" fill="#34d399" />
      <Bar dataKey="totalPets" fill="#f59e0b" />
      <Bar dataKey="adoptedPets" fill="#8b5cf6" />
      <ReferenceLine y={target} label="Target" stroke="red" strokeDasharray="5 5" />
    </BarChart>
  </ResponsiveContainer>
</div>

    </div>
  );
};

export default Dashboard;
