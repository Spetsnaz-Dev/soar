const express = require('express');
const router = express.Router();
const studentController = require('../libs/controllers/studentController');
const authMiddleware = require('../mws/auth');
const authorize = require('../mws/authorize');

router.post(
  '/',
  authMiddleware,
  authorize(['schooladmin', 'superadmin']),
  studentController.createStudent
);

router.get(
  '/',
  authMiddleware,
  authorize(['schooladmin', 'superadmin']),
  studentController.getAllStudents
);

router.put(
  '/:id',
  authMiddleware,
  authorize(['schooladmin', 'superadmin']),
  studentController.updateStudent
);

router.delete(
  '/:id',
  authMiddleware,
  authorize(['schooladmin', 'superadmin']),
  studentController.deleteStudent
);

module.exports = router;
