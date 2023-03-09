const User = require('../models/User')

module.exports.getAll = async (req, res) => {
    const users = await User.find()
    res.status(201).json(users)
}
