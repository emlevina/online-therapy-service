const mongoose = require('mongoose');
const { createCustomError } = require('../errors/customError');
const User = require('./User'); 
const Theme = require('./Theme'); 
const Method = require('./Method'); 

const TherapistDetailsSchema = new mongoose.Schema({
    therapistId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Details must be assigned to a therapist.'],
        unique: true
    },
    themes: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Theme' }],
        validate: [(val) => val.length > 0, 'Must have at least one theme.']
    },
    methods: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Method' }],
        validate: [(val) => val.length > 0, 'Must have at least one method.']
    }
})

TherapistDetailsSchema.pre('save', async function (next) {
    const therapist = await User.findById(this.therapistId)
    console.log(therapist)
    if(!therapist){
        return next(createCustomError('Therapist does not exist.', 404))
    }
    if(therapist.role !== 'therapist'){
        return next(createCustomError('This user is not a therapist', 404))
    }

    for(let methodId of this.methods){
        const method = await Method.findById(methodId)
        if(!method){
            return next(createCustomError('Method does not exist.', 404))
        }
    }
    for(let themeId of this.themes){
        const theme = await Theme.findById(themeId)
        if(!theme){
            return next(createCustomError('Theme does not exist.', 404))
        }
    }
    next()
})

TherapistDetailsSchema.post('save', function (err, doc, next) {
    if (err.code && err.code == 11000) {
        next(createCustomError('Details for this therapist already exist, please use "put" instead of "post" if you want to update.', 409))
    } else {
        next(err);
    }
});

module.exports = mongoose.model('TherapistDetails', TherapistDetailsSchema)