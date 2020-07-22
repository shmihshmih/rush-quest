const {Schema, model, Types} = require('mongoose')

const UserSchema = new Schema({
    id: {type: String},
    name: {type: String},
    email: {type: String, required: true},
    password: {type: String},
    avatar: {type: String},
    isDriver: {type: Boolean},
    isPedestrian: {type: Boolean},
    about: {type: String},
    birth: {type: String},
    rate: {type: String},
    car: {type: String},
    isCarVisible: {type: Boolean},
    carNumber: {type: String},
    isCarNumberVisible: {type: Boolean}
})

module.exports = model('UserModel', UserSchema)