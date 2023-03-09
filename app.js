const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const keys = require('./config/keys')
const passport = require('passport')

const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')

// подключение к базе данных
mongoose.connect(keys.mongoURI)
    .then(() => console.log('Соединение с базой данных прошло успешно'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

// для просмотра информации в командной строке
app.use(morgan('dev'))

// cors
app.use(cors())

// учим понимать json формат
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// роуты
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)


module.exports = app
