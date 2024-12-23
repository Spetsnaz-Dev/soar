const Classroom = require('../models/classroom');

exports.createClassroom = async (req, res) => {
  try {
    const classroom = new Classroom({ ...req.body, createdBy: req.user.id });
    await classroom.save();
    res.status(201).json(classroom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllClassrooms = async (req, res) => {
  const classrooms = await Classroom.find().populate('school');
  res.json(classrooms);
};

exports.updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(classroom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  await Classroom.findByIdAndDelete(req.params.id);
  res.json({ message: 'Classroom deleted' });
};