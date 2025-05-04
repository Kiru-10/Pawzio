import React, { useState, useEffect } from 'react';
import AdoptCard from '../../components/AdoptCard';
import API from '../../services/api';

const AdoptPets = () => {
  const [pets, setPets] = useState([]);
  const [toast, setToast] = useState(null);
  const [confirmPet, setConfirmPet] = useState(null);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Fetch pets from API
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await API.getPets();
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

  const handleAdopt = (pet) => {
    if (!isLoggedIn) {
      setToast('🚫 You need to log in to adopt a pet.');
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setConfirmPet(pet);
  };

  const confirmAdoption = async () => {
    if (!confirmPet) return;
  
    try {
      // Get current user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        throw new Error('User not logged in');
      }
  
      await API.adoptPet(confirmPet.id);
      setToast(`🎉 Congratulations! You adopted "${confirmPet.name}" the ${confirmPet.species}.`);
      setConfirmPet(null);
  
      const response = await API.getPets();
      setPets(response.data.data);
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      console.error('Adoption failed:', err);
      setToast('❌ Adoption failed. Please try again.');
      setTimeout(() => setToast(null), 3000);
    }
  };

  const availablePets = Array.isArray(pets) ? pets.filter(pet => !pet.adopted) : [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10 relative">

      {/* Toast Message */}
      {toast && (
        <div className="fixed top-5 right-5 bg-yellow-100 border border-yellow-500 text-yellow-700 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity duration-500">
          {toast}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmPet && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center relative">
            <h2 className="text-3xl mb-4">Are you sure?</h2>
            <p className="text-gray-700 mb-3">
              Do you want to adopt <strong>{confirmPet.name}</strong> the <strong>{confirmPet.species}</strong>?
            </p>
            <div className="text-6xl mb-4">🐾</div>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmAdoption}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow"
              >
                Yes, Adopt
              </button>
              <button
                onClick={() => setConfirmPet(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🐾 Find Your New Best Friend</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Browse our lovable pets and give them the forever home they deserve.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Available for Adoption
        </h2>
        {availablePets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {availablePets.map(pet => (
              <AdoptCard
                key={pet.id}
                pet={pet}
                onAdopt={handleAdopt}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No pets available for adoption! 🐾</p>
        )}
      </section>
    </div>
  );
};

export default AdoptPets;
