const express = require('express')
const cors = require('cors');
var stream = require("stream");
var streamBuffers = require("stream-buffers");
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

var current = 0;
var mes = [];


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })