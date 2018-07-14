var express=require('express');
var router=express.Router();
var pool=require('../Db/mysqlLib');



router.get('/places/:region?',function (req,res,next) {
    // if(req.params.region){
    //     var selectedregion=req.params.region;
    //     PlacesQuery = "SELECT * from places where region = ? ";
    //     pool.query(PlacesQuery,selectedregion, function (error, results, fields) {
    //         if (error) {
    //             res.render('guest/index', { title: 'results' ,layout:'mainlayout'});
    //             throw error
    //         };
    //
    //         // res.render('guest/index', { List: results,layout:'mainlayout'});
    //         res.send(results);
    //     });
    // }


});

module.exports=router;