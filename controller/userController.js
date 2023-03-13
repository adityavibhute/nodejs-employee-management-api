const User = require('../models/userModel');

exports.getAllUsers = async(req, res, next)=>{
    try{
        const users = await User.find();
        res
      .status(200)
      .json({ status: '200 Okay', length: users.length, data: users });
    } catch(err){
        return res.status(400).json({ status: 'failed', message: err.message });
    }
};
