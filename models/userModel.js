const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A Employee must have name'],
    },
    email: {
        type: String,
        required: [true, 'A Employee must have email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm password'],
        validate: {
            validator: function(el){
                return el === this.password;
            },
            message: "Passwords are not same"
        }
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

userSchema.methods.correctPassword = async function(candidatePassoword, userPassword){
    return await bcrypt.compare(candidatePassoword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
