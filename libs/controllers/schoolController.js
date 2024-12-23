const School = require('../models/school');

exports.createSchool = async (req, res) => {
  try {
    const school = new School({ ...req.body, superadmin: req.user.id });
    await school.save();
    res.status(201).json(school);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllSchools = async (req, res) => {
  const schools = await School.find();
  res.json(schools);
};

exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(school);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSchool = async (req, res) => {
  await School.findByIdAndDelete(req.params.id);
  res.json({ message: 'School deleted' });
};