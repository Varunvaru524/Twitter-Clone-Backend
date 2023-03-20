const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 0, maxlength: 15, },
    lastName: { type: String, required: true, minlength: 0, maxlength: 15 },
    userName: { type: String, required: true, minlength: 0, maxlength: 15, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4, maxlength: 20 },
    confirmPassword: {
        type: String, required: true, minlength: 4, maxlength: 20,
        validate: {
            validator: function (props) { 
                return (this.password == props)
             },
            message: () => 'Password and Confirm Password does not match'
        }
    },
})

module.exports = mongoose.model('users',schema)