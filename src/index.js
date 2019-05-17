const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const host = 'localhost';


const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.listen(port, host); 
console.log(`Executanto em http://${host}:${port}`);