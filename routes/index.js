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
  console.log("BARE endpoint accessed ");

  res.render('index', { title: 'Kingdom Come' });
});

router.get('/hello', function(req, res, next) {
  res.render('index', { title: 'Hello World X' });
  console.log("HELLO WORLD endpoint was accessed");

});

router.get('/usersById', function(req, res, next) {
  console.log("REQUEST " + JSON.stringify(req.body));
  // res.send(req.body);
  // console.log("USER IDS: " + JSON.stringify(req.body));

  let payload = req.body.userIds;
  console.log("PAYLOAD: " + JSON.stringify(payload));


  let userIds = payload.split(',');
  userIds = userIds.map(el => {return el.trim()});


  let q = 'SELECT * FROM `entry` WHERE `id` IN (' + payload + ');';
  console.log("QUERY: " + JSON.stringify(q));

  connection.query(q, (err, rows, fields) => {
    if (err) throw err;
    //console.log('The solution is: ', JSON.stringify(rows));
    res.send('SELECT USERS' + JSON.stringify(rows) + " IN ID LIST.");
  });

});

router.get('/allUsers', function(req, res, next) {
  console.log("getting all users");

  let q = 'SELECT * FROM `entry` WHERE 1;';

  connection.query(q, (err, rows, fields) => {
    if (err) throw err;
    //console.log('The solution is: ', JSON.stringify(rows));
    res.send('SELECT EXECUTEERD ' + JSON.stringify(rows) + " INTO DB.");
  });

});

router.post('/saveUser', function(req, res, next) {
  console.log("SAVE USER endpoint  ");
  let bod = req.body;

  let payload = JSON.parse(JSON.stringify(bod));

  // res.send(payload);
  // res.send("GET FUGGD");

  let q = 'INSERT INTO `entry` (`id`, `date`, `name`) VALUES (' +
    payload.id + ', "' +
    payload.date + '", "' +
    payload.name + '");';

  console.log('The QUERY HOT RELOAD: ', q);

  try {

    connection.query(q, (err, rows, fields) => {
      if (err) throw err;
      res.send('INSERTED ' + JSON.stringify(payload) + " INTO DB.");
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  } finally {
    console.log("FINALLY");
  }
});

module.exports = router;
