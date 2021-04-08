// Imports
const express = require('express');
const swagger = require('swagger-ui-express');
// Local imports
const swaggerDoc = require('./public/doc/js/swagger.json');
// Express
const app = express()

// port
const port = process.env.PORT || 8080;

// Static directory '/public'
app.use(express.static(__dirname + '/public'));

// Swagger doc
app.use('/swaggerJSON', swagger.serve, swagger.setup(swaggerDoc));

// GET '/documentation' : Documentation Page
app.get('/documentation', function(req, res) {
    res.sendFile('/documentation.html', {root: __dirname + '/public/doc/html'})
});

// GET '/': Landing Page
app.get('/', function(req, res) {
    res.sendFile('/landing.html', {root: __dirname + '/public/landing/html'})
});

// GET "/welcome" Main page
app.get('/welcome', function(req, res) {
    res.sendFile('/index.html', {root: __dirname + '/public/index/html'})
});

// GET '/admin': Admin Page
app.get('/admin', function(req, res) {
    res.sendFile('/admin.html', {root: __dirname + '/public/admin/html'})
});

// GET '/register': Registration Page
app.get('/register', function(req, res) {
    res.sendFile('/registration.html', {root: __dirname + '/public/registration/html'})
});

// GET '/login': Login Page
app.get('/login', function(req, res) {
    res.sendFile('/login.html', {root: __dirname + '/public/login/html'})
});

// GET '/taskList': Tasks Page
app.get('/taskList', function(req, res) {
    res.sendFile('/taskList.html', {root: __dirname + '/public/taskList/html'})
});


// Listen on port 
app.listen(port, function() {
    console.log("App listening on port: " + port);
});