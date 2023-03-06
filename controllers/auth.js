const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const errorHandler = require('../utils/error')

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email})

    // проверяем есть ли пользователь
    if(candidate) {
        const password = bcrypt.compareSync(req.body.password, candidate.password)

        // генерация токена
        if(password) {
            const token = jwt.sign({
                userId: candidate._id,
                email: candidate.email
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({token: `Bearer ${token}`})
        } else {
            res.status(401).json({message: 'Не верный пароль'})
        }
    } else {
        res.status(404).json({message: 'Пользователя с таким email не найден.'})
    }
}

module.exports.registration = async (req, res) => {
    // поиск текущего пользователя в базе
    const candidate = await User.findOne({email: req.body.email})

    if(candidate) {
        return res.status(409).json({message: 'Пользователь с таким email уже существует!'})
    }

    // шифруем и получаем пароль
    const salt = bcrypt.genSaltSync(7)
    const password = req.body.password

    // создаем объект с новым пользователем
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(String(password), salt)
    })

    // сохраняем в базу
    try {
        await user.save()
        res.status(201).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}