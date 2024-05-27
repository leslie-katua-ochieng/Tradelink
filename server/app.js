const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const app = express();
const cors=require('cors');
const corsOptions={
  origin:'*',
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/', routes);
app.listen(5000, () => {
    console.log('Server started on port 5000');
})