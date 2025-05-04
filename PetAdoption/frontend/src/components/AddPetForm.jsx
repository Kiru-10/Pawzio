import React, { useEffect, useState } from 'react';
import API from '../services/api';

const AddPetForm = () => {
  const [pet, setPet] = useState({
    name: '',
    species_id: '',
    age: '',
    personality_id: ''
  });

  const [speciesList, setSpeciesList] = useState([]);
  const [personalityList, setPersonalityList] = useState([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    API.getSpecies()
      .then(res => setSpeciesList(Array.isArray(res.data) ? res.data : res.data.data))
      .catch(err => console.error('Failed to fetch species:', err));

    API.getPersonalities()
      .then(res => setPersonalityList(Array.isArray(res.data) ? res.data : res.data.data))
      .catch(err => console.error('Failed to fetch personalities:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPet(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...pet,
      age: parseInt(pet.age, 10),
      species_id: parseInt(pet.species_id, 10),
      personality_id: parseInt(pet.personality_id, 10)
    };
    API.addPet(payload)
      .then(() => {
        setToast(`"${pet.name}" was created successfully`);
        setPet({ name: '', species_id: '', age: '', personality_id: '' });
        setTimeout(() => setToast(''), 3000);
        window.location.reload();
      })
      .catch(err => console.error('Add pet error:', err));
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full mx-auto">
      {/* Toast message */}
      {toast && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          {toast}
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-6 flex justify-center">
        <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.25a12.083 12.083 0 01-6.16-10.672L12 14z" />
        </svg>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add a New Pet</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
            <select
              name="species_id"
              value={pet.species_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">-- Select species --</option>
              {speciesList.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={pet.age}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Personality</label>
            <select
              name="personality_id"
              value={pet.personality_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">-- Select personality --</option>
              {personalityList.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
            <button type="reset" className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Reset</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Pet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetForm;
