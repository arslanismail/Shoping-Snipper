var express = require('express');
var router = express.Router();
var pool=require('../Db/mysqlLib');

/* GET home page. */
router.get('/', function(req, res, next) {


    res.send('CALL API ROUTE ...!');


});

module.exports = router;
