var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname));

app.post('/upload', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send('OK');
});

app.listen(3000);