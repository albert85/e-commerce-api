const express = require('express');
const { cartRouter } = require('./cart/endpoints');
const {productRouters} = require('./products/endpoints');
const {userRouter} = require('./users/endpoints');

const app = express();

app.use('/api/v1/product', productRouters);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/cart', cartRouter);

module.exports = {allRoutes: app}