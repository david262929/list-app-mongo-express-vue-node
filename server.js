const express = require('express')
const app = express()
const PORT = 5003

app.get('/', (req, res) => res.status(200).send('Hello world'))

app.listen(PORT, () => console.log(`App started on port:${PORT}`))
