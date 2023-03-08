const {Schema, mongoose} = require('mongoose')

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        default: `Пользователь ${Math.floor(Math.random() * 1000) + new Date().getTime()}`
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    roles: [
        {
            type: String,
            require: true,
            default: 'user'
        }
    ]
})

module.exports = mongoose.model('users', userSchema)