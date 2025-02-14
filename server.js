var express = require('express');
var compression = require('compression')

var path = require('path');
var http = require('http');
var app = express();
app.use(compression())
app.use(express.static(path.join(__dirname, 'build')));

// app.use(formidable());
/**
 * Route handler for serving the index.html file for all routes.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns None
 */
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

/**
 * GET request handler for the '/sign' route.
 * Reads the index.html file, replaces placeholders with actual values,
 * and sends the modified HTML content as the response.
 * @param {Object} request - The request object.
 * @param {Object} response - The response object.
 * @returns None
 */
app.get('/sign', function (request, response) {
    const filePath = path.resolve(__dirname, './build', 'index.html');
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, 'Sign | Giving For Living');
        data = data.replace(/\$OG_DESCRIPTION/g, "Giving For Living");
        result = data.replace(/\$OG_IMAGE/g, 'https://dummyimage.com/1200x630/000/fff');
        response.send(result);
    });
});

//Set Port
var port = process.env.PORT || '2000';
app.set('port', port);
var server = http.createServer(app, function (req, res) {

});
server.listen(port)
console.log('Running on localhost:' + port);
