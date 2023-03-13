const Employee = require('../models/employeeModel');

exports.checkBodyMid = (req, res, next) => {
  const reqBody = req.body;
  if (!('name' in reqBody && 'mobile' in reqBody)) {
    return res
      .status(404)
      .json({ status: 'failed', data: 'Name and Mobile are mandaatory' });
  }
  next();
};

exports.getAllEmployees = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5
    } = req.query;
    const emps = await Employee.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
    res
      .status(200)
      .json({ status: '200 Okay', length: emps.length, data: emps });
  } catch (err) {
    return res.status(400).json({ status: 'failed', message: err.message });
  }
};

exports.getEmployeeUsingId = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json({ status: '200 Okay', data: employee });
  } catch (err) {
    return res.status(400).json({ status: 'failed', message: err.message });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(200).json({ status: 'success', data: newEmployee });
  } catch (err) {
    return res.status(400).json({ status: 'failed', message: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updatedItem = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: updatedItem });
  } catch (err) {
    return res.status(400).json({ status: 'failed', message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    if(req.params.id.indexOf(',')>-1){
      let arr = req.params.id.split(',');
      await Employee.findByIdAndRemove((arr), (err, data)=>{
        if(err){
          return res.status(400).json({ status: 'failed', message: err.message });          
        }
        return res.status(204).json({ status: 'success' });
      });    
    } else{
      await Employee.findByIdAndDelete(req.params.id);
      res.status(204).json({ status: 'success' });
    }
  } catch (err) {
    return res.status(400).json({ status: 'failed', message: err.message });
  }
};
