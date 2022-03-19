var express = require('express');
var router = express.Router();

const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'dannyo',
  password: 'dannyo',
  database: 'longmoneyOffshore'
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.render('index', { title: 'Hello World X' });
  console.log("HELLO WORLD endpoint was accessed");

});

router.post('/saveUser', function(req, res, next) {
  // res.render('index', { title: 'Hello World X' });

  console.log("SAVE USER endpoint accessed ");

  let bod = req.body;

  console.log("bodie " + JSON.stringify(bod));
  console.log(bod);

  let payload = JSON.parse(JSON.stringify(bod));

  // res.send(payload);
  // res.send("GET FUGGD");

  let q = 'INSERT INTO `entry` (`id`, `date`, `name`) VALUES (' +
    payload.id + ', "' +
    payload.date + '", "' +
    payload.name + '");';

  console.log('The QUERY HOT RELOAD: ', q);


  connection.query(q, (err, rows, fields) => {
    if (err) throw err;
    //console.log('The solution is: ', JSON.stringify(rows));

    res.send('INSERTED ' + JSON.stringify(payload) + " INTO DB.");

  });

});

module.exports = router;
