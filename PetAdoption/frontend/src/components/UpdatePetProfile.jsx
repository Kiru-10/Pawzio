import React, { useState, useEffect } from 'react';
import API from '../services/api';

const UpdatePetProfile = ({ petData, onClose, onUpdate }) => {
  const [pet, setPet] = useState({ ...petData });
  const [speciesList, setSpeciesList] = useState([]);
  const [personalityList, setPersonalityList] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    setPet({ ...petData });

    // Fetch species list
    API.getSpecies()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        if (Array.isArray(data)) {
          setSpeciesList(data);
        }
      })
      .catch(err => console.error('Failed to fetch species:', err));

    // Fetch personality list
    API.getPersonalities()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        if (Array.isArray(data)) {
          setPersonalityList(data);
        }
      })
      .catch(err => console.error('Failed to fetch personalities:', err));
  }, [petData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet(prev => ({
      ...prev,
      [name]: name === "age" || name === "species_id" || name === "personality_id" ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedPet = {
      ...pet,
      age: parseInt(pet.age, 10)
    };
  
    try {
      await API.updatePet(updatedPet.id, updatedPet);
      onUpdate(updatedPet);                          
      setToast(`"${pet.name}" was updated successfully`);
      setTimeout(() => setToast(''), 3000);
      window.location.reload();
      onClose();
    } catch (err) {
      console.error('Failed to update pet:', err);
      alert('Failed to update pet. Please try again.');
    }
  };
  

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-xl w-full mx-auto animate-fade-in">
      {toast && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          {toast}
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 flex items-center justify-center">
        <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.25a12.083 12.083 0 01-6.16-10.672L12 14z" />
        </svg>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Update Pet Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name</label>
            <input
              type="text"
              name="name"
              value={pet.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Species Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
            <select
              name="species_id"
              value={pet.species_id || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            >
              <option value="">-- Select species --</option>
              {speciesList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age (in years)</label>
            <input
              type="number"
              name="age"
              value={pet.age}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              min="0"
              required
            />
          </div>

          {/* Personality Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personality</label>
            <select
              name="personality_id"
              value={pet.personality_id || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              required
            >
              <option value="">-- Select personality --</option>
              {personalityList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePetProfile;
