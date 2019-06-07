import RSMQWorker from  "rsmq-worker"
import RedisSMQ from 'rsmq'

const rsmq = new RedisSMQ({ host: "queue", port: 6379, ns: "rsmq"}),
  worker = new RSMQWorker( "events", {alwaysLogErrors: true, rsmq} )

worker.on( "message", function( msg, next, id ){
	// process your message
  console.log("Message id : " + id)
  console.log(msg);
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