 const express = require('express');
 require('dotenv').config();
 require('./Models/db.js');

 const bodyParser = require('body-parser');
 const cors = require('cors');
 const AuthRouter = require('./Routers/AuthRouter.js')
 const ProductRouter = require('./Routers/ProductRouter.js')

 const app = express();
 const PORT = process.env.PORT || 8080;

 app.use(bodyParser.json());
 app.use(cors());
 app.use('/auth', AuthRouter);
 app.use('/products', ProductRouter);

 app.get('/ping',(req, res)=>{
    console.log(req);
    res.send('PONG');
 })


 app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
 })