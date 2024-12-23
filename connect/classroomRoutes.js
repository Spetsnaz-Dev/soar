const express = require('express');
const router = express.Router();
const classroomController = require('../libs/controllers/classroomController');
const authMiddleware = require('../mws/auth');
const authorize = require('../mws/authorize');

router.post(
  '/',
  authMiddleware,
  authorize(['schooladmin']),
  classroomController.createClassroom
);
router.get(
  '/',
  authMiddleware,
  authorize(['schooladmin', 'superadmin']),
  classroomController.getAllClassrooms
);
router.put(
  '/:id',
  authMiddleware,
  authorize(['schooladmin']),
  classroomController.updateClassroom
);
router.delete(
  '/:id',
  authMiddleware,
  authorize(['schooladmin']),
  classroomController.deleteClassroom
);

module.exports = router;
