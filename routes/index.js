var express = require('express');
var router = express.Router();
var pool=require('../Db/mysqlLib');

/* GET home page. */
router.get('/', function(req, res, next) {

    pool.query('SELECT * from places', function (error, results, fields) {
        if (error) {
          throw error
        };
    res.send(results);
    });

});

module.exports = router;
