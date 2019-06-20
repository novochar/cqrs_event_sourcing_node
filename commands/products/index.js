import express from 'express'
import RedisSMQ from 'rsmq'
import bodyParser from 'body-parser'

const rsmq = new RedisSMQ({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, ns: "rsmq" })

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use((req, res, next) => {
  console.log(req.body)
  next()
})

app.post('/message', (req, res) => {
  const body_json = JSON.stringify(req.body)
  rsmq.sendMessageAsync({
    qname: "products_events",
    message: JSON.stringify(req.body)
  }).then(function (resp) {
    if (resp) {
      console.log("Message sent. ID:", resp)
      console.log("body:", JSON.stringify(body_json));
    }
  });
  res.send(body_json)
})

const PORT = process.env.HOST_PORT
app.listen(PORT, () => console.log(`App listening to ${PORT}....`))