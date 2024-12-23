const Student = require('../models/student');

exports.createStudent = async (req, res) => {
  try {
    const student = new Student({ ...req.body, createdBy: req.user.id });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllStudents = async (req, res) => {
  const students = await Student.find().populate('school classroom');
  res.json(students);
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  // console.log(req.params.id);
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
};
