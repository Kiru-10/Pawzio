export const calculateMood = (createdAt) => {
    const daysInSystem = (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24);
    
    if (daysInSystem < 1) return 'Happy';
    if (daysInSystem <= 3) return 'Excited';
    return 'Sad';
  };
  
  export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };