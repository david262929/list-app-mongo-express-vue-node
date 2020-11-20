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

fs.stat('./access.log', err => {
  if( !err ) {
    return
  }else if(err.code !== 'ENOENT'){
    return console.log('Some other error: ', err.code)
  }

  fs.writeFile('./access.log', 'Loging started\n', _err => {
    if (_err) throw _err
  })

})

app.use(cors())
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms `, {
  stream: fs.createWriteStream('./access.log', {flags: 'a'}),
}))
app.use(bodyParser.json())
app.use('/api/bucketListItems', bucketListItemRoutes)

if(NODE_ENV === 'development'){
  app.get('/', (req, res) => res.status(200).send('Hello world'))
}else if(NODE_ENV === 'production'){
  app.use(express.static('client/dist'))
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
  app.get('/davoo', (req, res) => res.status(200).send('davoo'))
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
