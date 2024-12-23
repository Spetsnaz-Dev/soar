const express = require('express');
const router = express.Router();
const schoolController = require('../libs/controllers/schoolController.js');
const authMiddleware = require('../mws/auth.js');
const authorize = require('../mws/authorize.js');

router.post('/', authMiddleware, authorize(['superadmin']), schoolController.createSchool);
router.get('/', authMiddleware, authorize(['superadmin']), schoolController.getAllSchools);
router.put('/:id', authMiddleware, authorize(['superadmin']), schoolController.updateSchool);
router.delete('/:id', authMiddleware, authorize(['superadmin']), schoolController.deleteSchool);

module.exports = router;