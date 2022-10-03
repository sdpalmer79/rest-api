const express = require('express');
const programRoutes = require('./routes/program');
const bodyParser = require('body-parser');
const path = require('path');
const mongoDb = require('./util/database');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: "a" });

const privateKey = fs.readFileSync('server.key');
const certificate = fs.readFileSync('server.cert');

const app = express();
app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: logStream }));
app.use(bodyParser.json());

/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    //test
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Autorization');
    next();
});
*/

app.use('/program', programRoutes.router);
app.use((req, res, next) => {
    res.status(404).send();
});
//app.listen(process.env.PORT || 8080);
https
.createServer({key: privateKey, cert: certificate}, app)
.listen(process.env.PORT || 8080);
