import React, { useEffect, useState } from 'react';
import API from '../../services/api';  

const Adopted = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);

  useEffect(() => {
    const fetchAdoptedPets = async () => {
      try {
        const response = await API.getAllAdopted();  
        setAdoptedPets(response.data);  
      } catch (error) {
        console.error('Error fetching adopted pets:', error);
      }
    };

    fetchAdoptedPets();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPersonalityEmoji = (trait) => {
    switch (trait) {
      case 'Friendly': return '😊';
      case 'Playful': return '🎾';
      case 'Loyal': return '🤝';
      case 'Calm': return '🧘';
      case 'Curious': return '🔍';
      case 'Affectionate': return '💖';
      default: return '🐾';
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            🏡 Forever Homes 💕
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Heartwarming stories of pets and their families
          </p>
        </div>

        {adoptedPets.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No adopted pets yet 🌱</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adoptedPets.map((entry, index) => (
              <div 
                key={index} 
                className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Pet header */}
                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-5 py-4">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🐾</span>
                    <div>
                      <h2 className="text-xl font-bold text-white">{entry.pet.name}</h2>
                      <p className="text-blue-100">{entry.pet.species}</p>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="p-5">
                  {/* Age and personality */}
                  <div className="mb-4">
                    <div className="flex items-center text-sm mb-3">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                        <span className="mr-1">🕒</span>
                        {entry.pet.age} {entry.pet.age === 1 ? 'year' : 'years'} old
                      </span>
                    </div>
                    <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs flex items-center">
                      <span className="mr-1">{getPersonalityEmoji(entry.pet.personality)}</span>
                      {entry.pet.personality}
                    </div>
                  </div>

                  {/* Owner information */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                      <span className="mr-2">👨‍👩‍👧‍👦</span>
                      Adopted by {entry.owner.name}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2">📅</span>
                        <div>
                          <p className="text-gray-500 text-xs">Adoption Date</p>
                          <p className="font-medium">{formatDate(entry.owner.adoptionDate)}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">📋</span>
                        <div>
                          <p className="text-gray-500 text-xs">Registration</p>
                          <p className="font-medium">{entry.owner.regno}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2">✉️</span>
                        <div>
                          <p className="text-gray-500 text-xs">Contact</p>
                          <p className="font-medium text-blue-600 truncate">{entry.owner.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-500">Every adoption makes the world better 🌎✨</p>
        </div>
      </div>
    </div>
  );
};

export default Adopted;
