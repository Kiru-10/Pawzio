import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import FilterBar from './Filter';
import AddPetForm from './AddPetForm';
import UpdatePetProfile from './UpdatePetProfile';
import API from '../services/api';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [selectedMood, setSelectedMood] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await API.getPets();
        console.log('Fetched Pets:', response.data);

        if (Array.isArray(response.data.data)) {
          setPets(response.data.data);
        } else {
          console.error('Unexpected response format', response);
        }
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  const handleFilterChange = (mood) => setSelectedMood(mood);
  const toggleForm = () => setShowForm(prev => !prev);
  const handleEdit = (pet) => setEditingPet(pet);
  const handleCloseEdit = () => setEditingPet(null);

  const handleUpdatePet = (updatedPet) => {
    setPets(prevPets => prevPets.map(p => (p.id === updatedPet.id ? updatedPet : p)));
  };

  const handleDeletePet = (pet) => {
    setPets(prev => prev.filter(p => p.id !== pet.id));
    setToast(`"${pet.name}" was deleted successfully.`);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredPets = pets.filter(pet =>
    selectedMood === 'All' ? !pet.adopted : !pet.adopted && pet.mood === selectedMood
  );

  const adoptedPets = pets.filter(pet => pet.adopted);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 relative">
      {toast && (
        <div className="fixed top-5 right-5 bg-green-100 border border-green-500 text-green-700 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          {toast}
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={toggleForm}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {showForm ? 'Close Form' : 'Add New Pet'}
        </button>
      </div>

      <FilterBar selectedMood={selectedMood} onFilter={handleFilterChange} />

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white w-full max-w-lg mx-auto rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={toggleForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <AddPetForm />
          </div>
        </div>
      )}

      {editingPet && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <UpdatePetProfile
            petData={editingPet}
            onClose={handleCloseEdit}
            onUpdate={handleUpdatePet}
          />
        </div>
      )}

      <section className="my-8">
        <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
          Available Pets 
          <span className="flex items-center gap-2">
            <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredPets.length} pets available
            </span>
          </span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} onEdit={handleEdit} onDelete={handleDeletePet} />
          ))}
        </div>
      </section>

      {selectedMood === 'All' && (
        <section>
          <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
            Adopted Pets 
            <span className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                {adoptedPets.length} pets adopted
              </span>
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {adoptedPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PetList;