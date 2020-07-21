const {Schema, model, Types} = require('mongoose')

const UserSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String},
    isDriver: {type: Boolean, required: true},
    isPedestrian: {type: Boolean, required: true},
    about: {type: String},
    birth: {type: Date},
    rate: {type: String},
    car: {type: String},
    isCarVisible: {type: Boolean},
    carNumber: {type: String},
    isCarNumberVisible: {type: Boolean}
})

module.exports = model('UserModel', UserSchema)