const mongoose = require('mongoose');
const { type } = require('os');
const { ref } = require('process');
const candidateSchema = new mongoose.Schema({ // Defining a schema for candidate data and validation
    name: {
        type: String,
        required: true
    },
    party: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount:{
        type: Number,
        default: 0 
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate; 
    
