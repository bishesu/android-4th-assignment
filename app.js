const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./connection/connection'); // path of the database connection code i.e connection.js
const User = require('./model/user'); //path for user.js in the model
const Item = require('./model/item'); //path for item.js in the model
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/registration', (req, response) => { // /registraion url path (req)-> api ma aaeko req | (response)-> action
    console.log(req.body); // shows the parameters that the user sends from body 
    var mydata = new User(req.body); //sends the req from client to our model user
    mydata.save().then(function() { //mydata.save initialies the data sending process though the model
        response.send(mydata); //client gets the response

    }).catch(function(e) { //if data is not saved catch triggers the reason why
        response.send(e);
    })
})

app.post('/insertitem', (req, response) => {
    console.log(req.body);
    var itemdata = new Item(req.body);
    itemdata.save().then(function() {
        response.send(itemdata);
    }).catch(function(j) {
        response.send(j);
    })
})

app.get('/selectitem', (req, response) => {
    Item.find().then(function(data) { // Select query is run throygh the model i.e. item
        response.send(data); //result is displayed to the client as response from server
    }).catch(function(h) {
        response.send(h)
    })
})
app.get('/selectitembyID/:id', (req, response) => {
    Item.findById(req.params.id).then(function(data) {
        response.send(data);
    }).catch(function(i) {
        response.send(i)
    })
})

app.post('/login', function(req, response) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ 'username': username, 'password': password }).count(function(err, number) {
        if (number != 0) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json') //what format the response is being sent in
            response.json({ success: true, status: 'Successfully Logged in' });
        } else {
            res.send('username and password did not match');
            console.log('username and password did not match')
        }
    })
})

app.listen(3000);