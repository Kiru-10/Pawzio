import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const PetCard = ({ pet, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const isAdopted = pet.adopted;
  const mood = isAdopted ? 'Adopted' : pet.mood;

  const moodStyles = {
    Happy: {
      bg: 'from-green-100 to-green-50',
      ring: 'ring-green-300',
      emoji: '😊',
      text: 'text-green-700',
      badge: 'bg-green-200 text-green-800'
    },
    Excited: {
      bg: 'from-yellow-100 to-yellow-50',
      ring: 'ring-yellow-300',
      emoji: '😄',
      text: 'text-yellow-700',
      badge: 'bg-yellow-200 text-yellow-800'
    },
    Sad: {
      bg: 'from-red-100 to-red-50',
      ring: 'ring-red-300',
      emoji: '😢',
      text: 'text-red-700',
      badge: 'bg-red-200 text-red-800'
    },
    Adopted: {
      bg: 'from-blue-100 to-blue-50',
      ring: 'ring-blue-300',
      emoji: '🏠',
      text: 'text-blue-700',
      badge: 'bg-blue-200 text-blue-800'
    }
  };

  const { bg, ring, emoji, text, badge } = moodStyles[mood] || {
    bg: 'from-gray-100 to-gray-50',
    ring: 'ring-gray-300',
    emoji: '🐾',
    text: 'text-gray-700',
    badge: 'bg-gray-200 text-gray-800'
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete?.(pet);
    }, 300);
  };

  return (
    <div
      className={`relative bg-gradient-to-br ${bg} rounded-2xl p-6 shadow-xl ring-1 ${ring} mb-6 transition-all duration-300 ease-in-out transform ${
        isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 rounded-full bg-white shadow-inner flex items-center justify-center text-4xl">
          {emoji}
        </div>

        <div className="flex-1">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {pet.name}
              <span className="ml-2 text-base font-normal text-gray-500">({pet.species})</span>
            </h3>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${badge}`}>
              {emoji} {mood}
            </span>
          </div>

          <div className={`mt-3 text-sm ${text} space-y-1`}>
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
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => onEdit && onEdit(pet)}
            className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:bg-blue-50 text-blue-600 hover:text-blue-800 transition-all border border-gray-200 hover:border-blue-200"
            title="Edit Pet"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:bg-red-50 text-red-600 hover:text-red-800 transition-all border border-gray-200 hover:border-red-200"
            title="Delete Pet"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PetCard;
