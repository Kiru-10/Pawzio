import React, { useEffect, useState } from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import API from '../../services/api';

const ManageFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterRating, setFilterRating] = useState(null);

  // Fetch feedbacks from backend on mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await API.getAllFeedback();
        // Check the response structure in case there is a different format or data key
        console.log(res.data);
        setFeedbacks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch feedbacks:', err);
      }
    };

    fetchFeedbacks();
  }, []);

  // Filtered list
  const filteredFeedbacks = Array.isArray(feedbacks)
    ? feedbacks.filter(fb => {
        if (filterRating !== null && fb.rating !== filterRating) return false;
        return true;
      })
    : [];

  // Render star rating
  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );

  // Format date (if needed)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manage Customer Feedback</h1>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center text-gray-700">
            <FiFilter className="mr-2" />
            <span>Filter by rating:</span>
          </div>

          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              onClick={() => setFilterRating(filterRating === rating ? null : rating)}
              className={`px-3 py-1 rounded-full flex items-center gap-1 ${
                filterRating === rating
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {renderStars(rating)}
              {filterRating === rating && <FiX className="ml-1" />}
            </button>
          ))}

          {filterRating !== null && (
            <button
              onClick={() => setFilterRating(null)}
              className="text-sm text-blue-500 hover:underline flex items-center"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* Feedback Cards */}
      <div className="space-y-4">
        {filteredFeedbacks.length > 0 ? (
          filteredFeedbacks.map(fb => (
            <div
              key={fb.id}
              className="p-5 rounded-lg border bg-white border-gray-300 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{fb.name}</h3>
                  <p className="text-sm text-gray-600">{fb.email}</p>
                </div>
                <span className="text-sm text-gray-500">{formatDate(fb.created_at)}</span>
              </div>

              <div className="mb-3">{renderStars(fb.rating)}</div>
              <p className="text-gray-700 mb-4">"{fb.comment}"</p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-gray-500">
            No feedback found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageFeedback;
