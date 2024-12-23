const jwt = require('jsonwebtoken');
const Student = require('../libs/models/student');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Student.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }
    console.log(req.user);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// const jwt = require('jsonwebtoken');
// const Student = require('../models/student');

// const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Validate the user ID in the database
//     req.user = await Student.findById(decoded.id);
//     if (!req.user) {
//       return res.status(401).json({ error: 'User not found' });
//     }

//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// };

// module.exports = authMiddleware;

module.exports = authMiddleware;
