var express = require('express');
var fs = require('fs');

var app = express();
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname));

app.post('/upload', function (req, res) {
    setTimeout(
        function () {
            res.setHeader('Content-Type', 'text/html');
            if (req.files.length == 0 || req.files.file.size == 0)
                res.send({ msg: 'No file uploaded at ' + new Date().toString() });
            else {
                var file = req.files.file;
                fs.unlink(file.path, function (err) {
                    if (err)
                        throw err;
                    else
                        //res.end("Hello");
                        res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString() });
                });
            }
        },
        (req.param('delay', 'yes') == 'yes') ? 2000 : -1
    );
});

app.post('/upload-full-form', function (req, res) {
    res.setHeader('Content-Type', 'text/html');

    var pictureUrl = '/path/to/default/pictures';
    var fileUploadMessage = '';
    
    // process file
    if (!req.files.file || req.files.file.size == 0) {
      fileUploadMessage = 'No file uploaded at ' + new Date().toString();
      res.send(fileUploadMessage);
    }
    else {
        var file = req.files.file;
       
        fs.unlink(file.path, function (err) {
            if (err)
                throw err;
            else
            {
                fileUploadMessage = '<b>"' + file.name + '"<b> uploaded to the server at ' + new Date().toString();
                pictureUrl = '/picture-uploads/' + file.name;

                var responseObj = {
                    fullname: req.param('fullname'),
                    gender: req.param('gender'),
                    color: req.param('color'),
                    pictureUrl: pictureUrl
                }
                res.send(JSON.stringify(responseObj));
            }             
        });
    }
});

app.get('/upload', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(
        'You can only post to "/upload".  Visit <a href="Index.html">Index</a> for more usage options. '
    );
});

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server started.  Running at http://localhost:' + port);