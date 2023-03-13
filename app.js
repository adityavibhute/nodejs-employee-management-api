const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const empRouter = require('./routes/empRoutes');
const userRouter = require('./routes/userRouter');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('Req from Middleware', req.url);
  req.reqTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.use('/api/v1/employees', empRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
