const mongoose = require('mongoose')
const app = require('./app')
require('dotenv').config()

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(3000, () => {
      console.log('connected')
    })
  })
  .catch((err) => {
    console.error(err)
  })
