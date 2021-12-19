const cors = require('cors');
const express = require('express');
let server = express();

const host = 'localhost';
const port = 7000;

server.use('*', cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const sql = require('mysql');

const connection = sql.createConnection({
    host     : 'myholdings.ce32gg8cgwze.us-east-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'bf4oVKcALvALJeQc8m2z',
    port     : '3306',
    database : 'myholdings'
});

connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});  


server.get('/api/stash', function (req, res) {
    connection.query(`SELECT * from cryptoholdings`, (error, data) => {
        if (error) {
            console.error();
        } else {
            res.send(data);
        }
    })
});

server.delete('/api/deleteCoin', function (req, res) {
    console.log(req);
    connection.query(`DELETE FROM cryptoholdings WHERE coin = '${req.body.coin}';`, (error, data) => {
        if (error) {
            console.error();
        } else {
            res.send(data);
        }
    })
});

// server.post('/api/addCoin', function (req, res) {
//     connection.query(`INSERT INTO cryptoholdings (coin, amount)
//     VALUES ('${req.body.coin}', '${req.body.amount}');`, (error, data) => {
//         if (error) {
//             console.error();
//         } else {
//             res.send(data);
//         }
//     })
// });

// server.put('/api/updateCoin', function (req, res) {
//     connection.query(`UPDATE cryptoholdings SET amount = '${req.body.amount}' WHERE coin = '${req.body.coin}';`)
// });

server.post('/api/addOrUpdateCoin', function (req, res) {
    connection.query(`INSERT INTO cryptoholdings (coin, amount) VALUES (${req.body.coin}, ${req.body.amount}) ON DUPLICATE KEY UPDATE amount = ${req.body.amount}`, (error, data) => {
        if (error) {
            console.error();
        } else {
            res.send(data);
        }
    })
});

server.listen(port, (error) => {
    if (error) {
        console.console.error();
    } else {
        console.log(`Server says hi from http://${host}:${port}`);
    }
});
