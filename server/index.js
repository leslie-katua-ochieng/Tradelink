const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/db');
const routes = require('./routes/routes');
const app = express();
const cors=require('cors');
const corsOptions={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true}));

app.use('/', routes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));