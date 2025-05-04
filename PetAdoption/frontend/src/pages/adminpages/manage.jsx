import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Save } from 'lucide-react';
import API from '../../services/api';

const Manage = () => {
  const [species, setSpecies] = useState([]);
  const [personalities, setPersonalities] = useState([]);

  const [newSpecies, setNewSpecies] = useState('');
  const [newPersonality, setNewPersonality] = useState('');

  const [editingSpeciesIndex, setEditingSpeciesIndex] = useState(null);
  const [editingPersonalityIndex, setEditingPersonalityIndex] = useState(null);

  const [editSpeciesText, setEditSpeciesText] = useState('');
  const [editPersonalityText, setEditPersonalityText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [speciesRes, personalitiesRes] = await Promise.all([
        API.getSpecies(),
        API.getPersonalities()
      ]);

      setSpecies(speciesRes.data.data);
      setPersonalities(personalitiesRes.data.data);
    } catch (err) {
      console.error('Error fetching data:', err.response || err);
    }
  };

  // Add functions
  const handleAddSpecies = async () => {
    if (newSpecies.trim()) {
      try {
        await API.addSpecies({ name: newSpecies.trim() });
        setNewSpecies('');
        fetchData();
      } catch (err) {
        console.error('Error adding species:', err);
      }
    }
  };

  const handleAddPersonality = async () => {
    if (newPersonality.trim()) {
      try {
        await API.addPersonality({ name: newPersonality.trim() });
        setNewPersonality('');
        fetchData();
      } catch (err) {
        console.error('Error adding personality:', err);
      }
    }
  };

  // Delete functions
  const handleDeleteSpecies = async (index) => {
    const item = species[index];
    try {
      await API.deleteSpecies(item.id);
      fetchData();
    } catch (err) {
      console.error('Error deleting species:', err);
    }
  };

  const handleDeletePersonality = async (index) => {
    const item = personalities[index];
    try {
      await API.deletePersonality(item.id);
      fetchData();
    } catch (err) {
      console.error('Error deleting personality:', err);
    }
  };

  // Edit functions
  const handleEditSpecies = (index) => {
    setEditingSpeciesIndex(index);
    setEditSpeciesText(species[index].name);
  };

  const handleSaveEditSpecies = async () => {
    const item = species[editingSpeciesIndex];
    try {
      const updatedItem = { name: editSpeciesText.trim() };
      await API.updateSpecies(item.id, updatedItem);
      setEditingSpeciesIndex(null);
      setEditSpeciesText('');
      fetchData();
    } catch (err) {
      console.error('Error updating species:', err);
    }
  };

  const handleEditPersonality = (index) => {
    setEditingPersonalityIndex(index);
    setEditPersonalityText(personalities[index].name);
  };

  const handleSaveEditPersonality = async () => {
    const item = personalities[editingPersonalityIndex];
    try {
      const updatedItem = { name: editPersonalityText.trim() };
      await API.updatePersonality(item.id, updatedItem);
      setEditingPersonalityIndex(null);
      setEditPersonalityText('');
      fetchData();
    } catch (err) {
      console.error('Error updating personality:', err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-sm rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Species & Personality</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Species Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Species</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSpecies}
              onChange={(e) => setNewSpecies(e.target.value)}
              placeholder="New species"
              className="border px-3 py-2 rounded w-full"
            />
            <button onClick={handleAddSpecies} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add
            </button>
          </div>

          <table className="w-full text-left text-gray-700">
            <thead>
              <tr>
                <th className="border-b pb-2">Name</th>
                <th className="border-b pb-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {species.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-2">
                    {editingSpeciesIndex === index ? (
                      <input
                        value={editSpeciesText}
                        onChange={(e) => setEditSpeciesText(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="py-2 text-center space-x-2">
                    {editingSpeciesIndex === index ? (
                      <button onClick={handleSaveEditSpecies} className="text-green-600 hover:text-green-800">
                        <Save size={16} />
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleEditSpecies(index)} className="text-blue-500 hover:text-blue-700">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDeleteSpecies(index)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Personality Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Personality</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newPersonality}
              onChange={(e) => setNewPersonality(e.target.value)}
              placeholder="New personality name"
              className="border px-3 py-2 rounded w-full"
            />
            <button onClick={handleAddPersonality} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add
            </button>
          </div>

          <table className="w-full text-left text-gray-700">
            <thead>
              <tr>
                <th className="border-b pb-2">Name</th>
                <th className="border-b pb-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {personalities.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-2">
                    {editingPersonalityIndex === index ? (
                      <input
                        value={editPersonalityText}
                        onChange={(e) => setEditPersonalityText(e.target.value)}
                        className="border px-2 py-1 rounded w-full"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="py-2 text-center space-x-2">
                    {editingPersonalityIndex === index ? (
                      <button onClick={handleSaveEditPersonality} className="text-green-600 hover:text-green-800">
                        <Save size={16} />
                      </button>
                    ) : (
                      <>
                        <button onClick={() => handleEditPersonality(index)} className="text-blue-500 hover:text-blue-700">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDeletePersonality(index)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Manage;
