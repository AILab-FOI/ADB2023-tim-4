const express = require('express')
const cors = require('cors');
const Producer = require('./kafka/producer');
const Consumer = require('./kafka/consumer');
const RestVideo = require("./service/restVideo.js");
const restVideo = new RestVideo();
const producer = new Producer()
const consumer = new Consumer()
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
var mes = [];

app.post('/produce',async(req,res)=>{
  producer.produce(req,res)
  const cons = await consumer.consume();
  cons.run({
    eachMessage: ({message }) => {
      console.log({
        value: message.value,
        key: JSON.parse(message.key),
      });
      const new_message = Object.assign({}, message);
      //const start = 0;
      //const end = message.value.length;
      //const chunksize = end - start + 1;
      mes.push(new_message);
    },
  });
  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send({ message: "producing" });
})

app.get('/videos', (req, res) => {
  restVideo.getVideos(req, res);
})

app.get('/videos/:id', (req, res) => {
  restVideo.getVideoById(req, res);
})

app.get('/hlsPlaylist/', async (req, res) => {
  res.setHeader('Content-type', 'application/vnd.apple.mpegurl');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const key = req.query.name.split('.')[0]+".m3u8_playlist"
  const playlist = mes.find((message) => JSON.parse(message.key).key === key);
  if (playlist) {
    const buf_array = playlist.value;
    const buf = Buffer.from(buf_array);
    res.end(buf);
  } else {
    res.status(404).send('HLS playlist not found');
  }
});

app.get('/:segment', async (req, res) => {
  const key = req.params.segment
  const message = mes.find((message) => JSON.parse(message.key).key === key);
  if(message)
  {
    const buf_array = message.value;
    const buffer = Buffer.from(buf_array);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Length', buffer.length);
    res.setHeader('Content-Type', 'video/mp4');
    res.end(buffer);
  } else {
    res.status(404).send('Segment not found');
  }
});

async function produceVideo(name)
{
  producer.produce(name)
  const cons = await consumer.consume();
  cons.run({
    eachMessage: ({message }) => {
      console.log({
        value: message.value,
        key: JSON.parse(message.key),
      });
      const new_message = Object.assign({}, message);
      mes.push(new_message);
    },
  });
}

async function produceAllContent()
{
  var result = await restVideo.getContent();
  var videos = JSON.parse(result);
  videos.forEach(async function(item) {
  await produceVideo(item.videoPath)
  })
  console.log("Content produced")
}


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    produceAllContent();
  })