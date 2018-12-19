var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const db = require('./config/key').mongoURI;
mongoose
.connect(db)
.then(() => console.log("MongoDb Connected..."))
.catch(err => console.log("There is some error...",err))
app.get('/',(req,res)=>{
    res.send("Hello Sagar Jadhav")
})

//Passport middleware
app.use(passport.initialize());

require('./config/passport')(passport)

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

var port = process.env.PORT || 5000

app.listen(port,()=> console.log(`The Server Running On==>>> ${port}`))  
