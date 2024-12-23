const jwt = require('jsonwebtoken');
const config = require('./config/index.config'); // Adjust the path to your configuration file

// user details of admin
const testPayload = {
  firstName: 'admin', // Replace with a valid ID from your database
  lastName: 'user',
  address: '45th Street, Bangalore', // Replace with the role you want to test
  role: 'superadmin',
  id: '67647939ad1de27f2a985168',
};

// id of user is the admin who will be calling the apis
const createStudent = {
  id: '64a000000000000000000001', // Use the actual user ID from the database
  role: 'superadmin', // Or "superadmin"
};

const schoolObject = {
  id: '6769d5ba1679e20ab3bfa520', // Use the actual user ID from the database
  role: 'schooladmin', // Or "superadmin"
};

const generateToken = () => {
  try {
    const token = jwt.sign(createStudent, config.JWT_SECRET, {
      expiresIn: '6d',
    });
    console.log('Generated JWT Token:', token);
  } catch (error) {
    console.error('Error generating token:', error.message);
  }
};

generateToken();
