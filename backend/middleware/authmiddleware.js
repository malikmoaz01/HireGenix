import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("Decoded token:", decoded);  

      const user = await User.findById(decoded.userId).select('-password');  
      if (!user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      req.user = user;
      next();

    } catch (error) {
      console.error('JWT verification failed:', error.message);
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  } else {
    res.status(401).json({ success: false, message: 'No token provided' });
  }
};

export default protect;
