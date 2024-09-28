var express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const db = require('./db')

const authRouter = require('./Routes/authRouter')

const postRouter = require('./Routes/postRouter')

const userRouter = require('./Routes/userRouter')

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send("Welcome to node js Server")
})

//auth router
app.use('/auth',authRouter);

//user router
app.use('/user', userRouter);

//post router
app.use('/post', postRouter);

app.listen(5000, ()=>{console.log("Server is listening on PORT 5000")})
