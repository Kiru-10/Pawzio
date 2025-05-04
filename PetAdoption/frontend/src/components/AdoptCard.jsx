import React from 'react';

const AdoptCard = ({ pet, onAdopt, isLoggedIn }) => {
  const isAdopted = pet.adopted;

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-lg ring-1 ring-gray-200 mb-6 transition-all duration-300">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full bg-gray-100 shadow-inner flex items-center justify-center text-4xl">
          🐾
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900">
            {pet.name}
            <span className="ml-2 text-base font-normal text-gray-500">({pet.species})</span>
          </h3>

          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Age:</span> {pet.age}
            </p>
            <p>
              <span className="font-semibold">Personality:</span> {pet.personality}
            </p>
            {isAdopted && (
              <p className="text-green-700 font-medium">
                ✓ Adopted on{' '}
                {new Date(pet.adoption_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      {!isAdopted && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => onAdopt?.(pet)}
            disabled={!isLoggedIn}
            className={`px-4 py-2 rounded-lg shadow-md transition-all text-white font-semibold ${
              isLoggedIn
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoggedIn ? 'Adopt Me! 🐶' : 'Login Required 🔒'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdoptCard;
