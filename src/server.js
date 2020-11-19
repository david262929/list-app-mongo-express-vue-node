const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/bucketListItems')

const app = express()

const {MONGODB_URI, PORT} = require('./configs')

app.use(cors())
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms `, {
  stream: fs.createWriteStream('./logs/access.log', {flags: 'a'}),
}))
app.use(bodyParser.json())
app.use('/api/bucketListItems', bucketListItemRoutes)

app.get('/', (req, res) => res.status(200).send('Hello world'))

app.listen(PORT, async () => {
  console.log(`App started on port:${PORT}`)

  try{
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex: false,
    })
    console.log('successfully connected to mongodb')
  }catch (e) {
    console.log('Have a some error -_-_-_- ', e)
  }
})
