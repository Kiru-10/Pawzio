// import jwt from 'jsonwebtoken';

// const protect = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ error: 'Not authorized - no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Token invalid or expired' });
//   }
// };

// export default protect;

import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
  // 1. Get token from cookies
  const token = req.cookies.token;

  // 2. Check if token exists
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'Not authorized - no token provided' 
    });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach user to request object
    req.user = {
      id: decoded.id,
      username: decoded.username
      // Add other needed user properties
    };
    
    next();
  } catch (err) {
    // Handle different error types specifically
    let errorMessage = 'Not authorized - invalid token';
    
    if (err.name === 'TokenExpiredError') {
      errorMessage = 'Session expired - please login again';
    } else if (err.name === 'JsonWebTokenError') {
      errorMessage = 'Invalid token - please login again';
    }

    return res.status(401).json({ 
      success: false,
      error: errorMessage 
    });
  }
};

export default protect;