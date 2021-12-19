const express = require('express');
const cors = require('cors');
const path = require('path');

const HOST = 'localhost';
const PORT = '4200';

const server = express();

server.use(cors());

server.use('/', express.static(path.join(__dirname, 'docs')))

server.listen(PORT, (err) => {
    if (err) {
        console.log('There was a problem with the server: ', err);
    } else {
        console.log('App Server says hi from ', 'http://'+HOST+':'+PORT);
    }
});
