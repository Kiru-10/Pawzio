import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import API from '../services/api';

const CountCard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    feedbacks: 0,
    totalPets: 0,
    adoptedPets: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });

    const fetchStats = async () => {
      try {
        const res = await API.getCounts();
        const apiData = res.data.data || res.data;

        const parsedStats = {
          customers: Number(apiData.total_users) || 0,
          feedbacks: Number(apiData.total_feedbacks) || 0,
          totalPets: Number(apiData.total_pets) || 0,
          adoptedPets: Number(apiData.total_adoptions) || 0,
        };

        setStats(parsedStats);
      } catch (error) {
        console.error('Failed to fetch dashboard counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading stats...</div>;
  }

  const cardItems = [
    { label: 'Total Customers', value: stats.customers },
    { label: 'Total Feedback', value: stats.feedbacks },
    { label: 'Total Pets', value: stats.totalPets },
    { label: 'Adopted Pets', value: stats.adoptedPets },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Dashboard Stats</h1>
      <ul className="flex flex-col sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cardItems.map((item, idx) => (
          <li
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
            className="w-full text-sm font-semibold text-slate-900 p-6 bg-white border border-slate-900/10 bg-clip-padding shadow-md shadow-slate-900/5 rounded-lg flex flex-col justify-center items-center"
          >
            <span className="mb-1 text-teal-400 font-display text-5xl">{item.value}+</span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountCard;
