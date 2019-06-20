import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'

const app = express();

app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.json({
    message: 'ok'
  })
});

app.post('/api/login' , (req, res) => {
  const user = {
    id:1,
    email: 'fff@fff.com'
  }

  jwt.sign({user}, process.env.SECRET_TOKEN, (err, token) => {
    res.json({token})
  });
});

app.post('/api/check_jwt', (req, res) => {
  jwt.verify(req.body.token, process.env.SECRET_TOKEN, (err, data) => {
    if(err){
      res.sendStatus(403)
    } else {
      res.json ({
        status: 'ok',
        data
      })
    }
  })
})

app.get('/api/auth' , (req, res) => {
  const bearerHeader = req.headers['authorization'];
  console.log('bearerHeader:', bearerHeader)
  if(typeof bearerHeader !== 'undefined'){
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.SECRET_TOKEN, (err, data) => {
      if(err){
        res.sendStatus(403)
      } else {
        res.json ({
          status: 'ok',
          data
        })
      }
    })
  } else {
    res.send(403)
  }
});

const port = process.env.HOST_PORT
app.listen(port, () => console.log(`App listening to ${port}...`));
