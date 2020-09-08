require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/user-route')
const cors = require("cors");

const app = express();

app.set('port', 3000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Routes
app.use('/users', userRouter)

// Run app
app.listen(app.get('port'), () => console.log('Running on ', app.get('port')));