const mongoose = require('mongoose'); // Importing mongoose to interact with MongoDB
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({ // Defining a schema for user data and validation
    name:{
        type: String, 
        required: true 
    }, 
    age : {
        type: Number, 
        required: true 
    },
    email: { // 
        type: String,
    },  
    mobile : { 
        type: String,
    },
    address: { 
        type: String,
        required: true 
    },
    aadharCardNumber: { 
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    role: { // Role is a string
        type: String,
        enum: ['voter', 'admin'], // Role can be either 'admin' or 'user'
        default: 'voter' // Default role is 'user'   
    },
    isVoted: { // Voted status is a boolean
        type: Boolean, 
        default: false //If the user has not voted then it is false and if the user has voted then it is true
    }
});

userSchema.pre('save', async function(next) {
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed one
        person.password = hashedPassword;

        next();
    }catch(error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // use bcrypt to compare the provided password with the hashed password 
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;

    } catch (error) {
        throw err;
    }
}

const User = mongoose.model('User', userSchema); // Creating a model from the schema
module.exports = User; // Exporting the User model for use in other files
