import RSMQWorker from  "rsmq-worker"
import RedisSMQ from 'rsmq'
import axios from 'axios'

const rsmq = new RedisSMQ({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, ns: "rsmq"}),
  worker = new RSMQWorker( "products_events", {alwaysLogErrors: true, rsmq} )

worker.on( "message", function( msg, next, id ){
	// process your message
  console.log("Message id : " + id)
  console.log(msg);
  axios.post('http://logs_stream:3000', { service: 'product', id , msg })
  .then(function(response){
    console.log('saved...')
    console.log(response)
  }); 
  next()
})

// optional error listeners
worker.on('error', function( err, msg ){
  console.log( "ERROR", err, msg.id )
})
worker.on('exceeded', function( msg ){
  console.log( "EXCEEDED", msg.id )
})
worker.on('timeout', function( msg ){
  console.log( "TIMEOUT", msg.id, msg.rc )
})

worker.start()