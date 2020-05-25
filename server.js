const express = require('express');
const bodyParser = require('body-parser');
const api = require('./server/routes/api');
const port = 3000;

const app = express();
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use('/api', api);

app.listen(port, function () {
  console.log("server running on localhost:" + port);
})
