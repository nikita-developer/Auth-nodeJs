const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const keys = require('./config/keys')

// подключение к базе данных
mongoose.connect(keys.mongoURI)
    .then(() => console.log('Соединение с базой данных прошло успешно'))
    .catch(error => console.log(error))

// для просмотра информации в командной строке
app.use(morgan('dev'))

// cors
app.use(cors())

// учим понимать json формат
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


module.exports = app