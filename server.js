var express = require('express')
var mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();
const db = require('./config/key').mongoURI;
mongoose
.connect(db)
.then(() => console.log("MongoDb Connected..."))
.catch(err => console.log("There is some error..."))
app.get('/',(req,res)=>{
    res.send("Hello Sagar Jadhav")
})

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

var port = process.env.PORT || 5000

app.listen(port,()=> console.log(`The Server Running On==>>> ${port}`))  
