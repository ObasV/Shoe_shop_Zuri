const express = require('express');
const userRouter = require("./routes/user_routes");
const authRouter = require("./routes/auth_routes")
const productRouter = require("./routes/product_routes")
const inventoryRouter = require("./routes/inventory_routes");
const cartRouter = require('./routes/cart_routes');

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/inventory', inventoryRouter);
app.use('/cart', cartRouter);
app.use('*', (req, res) =>{
    res.json({message:'page not found'})
})


module.exports = app;