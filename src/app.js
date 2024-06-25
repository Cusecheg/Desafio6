const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api')
// const clientRoute = require('./routes/clientRoute');
// const orderRoute = require('./routes/orderRoute');
// const productRoute = require('./routes/productRoute');



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', apiRoutes);
// app.use('/', clientRoute);
// app.use('/order', orderRoute);
// app.use('/product', productRoute);

module.exports = app;