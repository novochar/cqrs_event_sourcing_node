import express from 'express'
import RedisSMQ from 'rsmq'
import bodyParser from 'body-parser'

const rsmq = new RedisSMQ( {host: "queue", port: 6379, ns: "rsmq" } )

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use((req, res, next) => {
    console.log(req.body)
    next()
})

app.get('*', (req, res) => {
    const body_json = JSON.stringify(req.body)
    rsmq.sendMessageAsync({qname:"events", message:JSON.stringify(req.body)}).then(function (resp) {
        if (resp) {
            console.log("Message sent. ID:", resp)
            console.log("body:" , JSON.stringify(body_json));
        }
    });
    res.send(body_json)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})