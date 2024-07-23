const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', userRoutes)

module.exports = app
