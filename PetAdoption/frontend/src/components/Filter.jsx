import React from 'react';
import { FaSmile, FaGrinStars, FaFrown, FaFilter } from 'react-icons/fa';

const FilterBar = ({ selectedMood, onFilter }) => {
  const moods = [
    { label: 'All', icon: <FaFilter className="inline mr-1" /> },
    { label: 'Happy', icon: <FaSmile className="inline mr-1 text-green-500" /> },
    { label: 'Excited', icon: <FaGrinStars className="inline mr-1 text-yellow-500" /> },
    { label: 'Sad', icon: <FaFrown className="inline mr-1 text-red-500" /> },
  ];

  return (
    <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl shadow-sm">
      <h3 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
        <FaFilter className="mr-2 text-indigo-500" />
        Filter by Mood:
      </h3>
      <div className="flex flex-wrap gap-3">
        {moods.map(({ label, icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => onFilter(label)}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedMood === label
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
