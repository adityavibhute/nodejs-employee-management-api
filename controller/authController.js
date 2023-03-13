const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.signup = async(req, res) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.password
        });
        const token = signToken(newUser._id);
        res.status(201).json({ status: 'success', token: token, data: newUser });
    } catch(err){
        return res.status(400).json({ status: 'failed', message: err.message });        
    }
}

exports.login = async(req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(401).json({ status: 'failed', message: 'Please provide email and password' }); 
        }
        const user = await User.findOne({ email }).select('+password');
        if(!user || !(await user.correctPassword(password, user.password))){
            return res.status(401).json({ status: 'failed', message: 'Wrong email or password' });            
        }
        const token = signToken(user._id);
        res.status(200).json({ status: 'success', token: token });
    } catch(err){
        return res.status(400).json({ status: 'failed', message: err.message });        
    }
}

exports.protect = async(req, res, next)=>{
    try{
        let token = '';
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return res.status(401).json({ status: 'failed', message: 'You are not logged in to get access' });                
        }
        next();
    } catch(err){
        return res.status(400).json({ status: 'failed', message: err.message });        
    }
};