require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/user-route');
const organizationRouter = require('./routes/organization-route');
const basketRouter = require('./routes/basket-route');
const orderRouter = require('./routes/order-route');
const cors = require("cors");
const authenticate = require('./controllers/authenticate');


const app = express();

app.set('port', 3000);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Routes
app.use('/users', userRouter);
app.use('/organizations', organizationRouter);
app.use('/baskets', authenticate, basketRouter);
app.use('/orders', authenticate, orderRouter);


// Run app
app.listen(app.get('port'), () => console.log('Running on ', app.get('port')));