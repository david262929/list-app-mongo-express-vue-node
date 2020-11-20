const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/bucketListItems')

const app = express()

const {MONGODB_URI, PORT, NODE_ENV} = require('./configs')

app.use(cors())
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms `, {
  stream: fs.createWriteStream('./logs/access.log', {flags: 'a'}),
}))
app.use(bodyParser.json())
app.use('/api/bucketListItems', bucketListItemRoutes)

if(NODE_ENV === 'development'){
  app.get('/davo', (req, res) => res.status(200).send('Hello world Davo dev'))
  app.get('/', (req, res) => res.status(200).send('Hello world'))
}else if(NODE_ENV === 'production'){
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
  app.get('/davo', (req, res) => res.status(200).send('Hello world Davo'))
}else{
  app.get('/davo', (req, res) => res.status(200).send('Hello world xzzzzzzzzzzzz'))
}


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
