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
                res.send('No file uploaded at ' + new Date().toString());
            else {
                var file = req.files.file;
                fs.unlink(file.path, function (err) {
                    if (err)
                        throw err;
                    else
                        res.send('<b>"' + file.name + '"<b> uploaded to the server at ' + new Date().toString());
                });
            }
        },
        req.param('delay', 'yes') == 'yes' ? 6000 : -1
    );
});

app.get('/upload', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(
        'You can only post to "/upload".  Visit <a href="Index.html">Index</a> for more usage options. '
    );
});

app.listen(process.env.PORT || 3000);

console.log('Server started.  Running at http://localhost:3000');