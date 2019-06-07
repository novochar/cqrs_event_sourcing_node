import express from 'express'
import RedisSMQ from 'rsmq'

const rsmq = new RedisSMQ( {host: "queue", port: 6379, ns: "rsmq" } )

const app = express()

app.get('*', (req, res) => {
    rsmq.sendMessageAsync({qname:"events", message:"Hello World"}).then(function (resp) {
        if (resp) {
            console.log("Message sent. ID:", resp);
        }
    });
    res.send("ok")
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})