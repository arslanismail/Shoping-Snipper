var express=require('express');
var router=express.Router();
var pool=require('../Db/mysqlLib');

        // For All Brands Api

        router.get('/brands/:name?',function (req,res,next) {
            var queryBuilder="select * from brand";
            if(req.params.name)
            {
                getSingleBrand(queryBuilder,req.params.name,function (data) {
                    res.send(data);
                });
            }else {
                pool.query(queryBuilder, function (error, results, fields) {
                    if (error) {
                        throw error
                    }
                    res.send(results);
                });
            }
        });

        router.get('/branches/:name?',function (req,res,next) {
            var queryBuilder="select * from branches";
            if(req.params.name)
            {
                getSingleBranch(queryBuilder,req.params.name,function (data) {
                    res.send(data);
                });
            }else {
                pool.query(queryBuilder, function (error, results, fields) {
                    if (error) {
                        throw error
                    }
                    res.send(results);
                });
            }
        });



        //For Categories Api

        router.get('/categories/:name?',function (req,res,next) {
            var queryBuilder="select * from categories";
            if(req.params.name)
            {
                getSingleCategory(queryBuilder,req.params.name,function (data) {
                    res.send(data);
                });
            }else {
                pool.query(queryBuilder, function (error, results, fields) {
                    if (error) {
                        throw error
                    }
                    res.send(results);
                });
            }
        });


        router.post('/add/category',function (req,res) {

            var queryBuilder = "INSERT INTO brand (name) VALUES (\"" + req.body.name + "\")";
            pool.query(queryBuilder, function (error, results, fields) {
                if (error) {
                    res.send(error);
                    throw error

                }
                res.send('succesfully Added');

            });
        });

        router.post('/add/branches',function (req,res) {
            var queryBuilder = "INSERT INTO branches (name) VALUES (\"" + req.body.name + "\")";
            pool.query(queryBuilder, function (error, results, fields) {
                if (error) {
                    res.send(error);
                    throw error

                }
                res.send('succesfully Added');
            })
        });
        router.post('/add/image',function (req,res) {
            var queryBuilder = "INSERT INTO image (name) VALUES (\"" + req.body.name + "\")";
            pool.query(queryBuilder, function (error, results, fields) {
                if (error) {
                    res.send(error);
                    throw error

                }
                res.send('succesfully Added');

            })
        });
        router.post('/add/brand',function (req,res) {
            var queryBuilder="INSERT INTO brand (name) VALUES (\""+req.body.name+"\")";
            pool.query(queryBuilder,function (error,results,fields) {
                if(error){
                    res.send(error);
                    throw error
                }
                res.send('succesfully Added');
            });
        });

        // Items Api

        router.get('/items/:town?/:nearby?/:type?',function (req,res,next) {
            var queryBuilder="SELECT items.name,categories.name,branches.town,branches.near_by,brand.name FROM `items` \n" +
            "JOIN categories on categories.id=items.category_id\n" +
            "JOIN brand on brand.id =items.brand_id\n" +
            "JOIN branches on branches.id=items.location_id";
            if( !req.params.type && (req.params.town || (req.params.nearby && req.params.town))) {
                console.log('checked');
            getitems(queryBuilder,req.params.town, req.params.nearby, function (data) {
               res.send(data);
            });
            }
            else if( req.params.type && (req.params.nearby && req.params.town)) {
                typeSubtypes(req.params.type,function (data) {
                    res.send(data);
                });
            }
            else{
            pool.query(queryBuilder,function (error, results, fields) {
               if (error) {
                   throw error
               }
               res.send(results);
            });
            }
            });

        // Custom Helper Function for items


        function  getitems(query,town,nearby,callback) {
            if(town && nearby){
                query=query+" where branches.town = \""+town+"\" and branches.near_by =\""+nearby+"\""
            }else if(town){
                query=query+" where branches.town = \""+town+"\"";
            }else{
            }
            pool.query(query, function (error, results, fields) {
                if (error) {
                    throw error
                }
                callback(results);
            });
        }

            // Custom Helper Functions for type
            function typeSubtypes(typeid,callback){

            var query="SELECT t4.name as t4, t3.name as t3, t2.name as t2, t1.name as t1 \n" +
                "FROM types t1 \n" +
                "LEFT JOIN types t2 ON t1.t_id=t2.id \n" +
                "LEFT JOIN types t3 ON t2.t_id=t3.id \n" +
                "LEFT JOIN types t4 ON t3.t_id=t4.id\n" +
                "WHERE t1.id=\""+typeid+"\"";

                pool.query(query, function (error, results, fields) {
                    if (error) {
                        throw error
                    }
                    callback(results);
                });


                 }





            // Custom Helper Function for single category

        function getSingleCategory(query,name,callback) {
            query=query+" where categories.name = \""+name+"\"";
            pool.query(query, function (error, results, fields) {
                if (error) {
                    throw error
                }
                callback(results);
            });
        }
        function getSingleBrand(query,name,callback) {
            query=query+" where brand.name = \""+name+"\"";
            pool.query(query, function (error, results, fields) {
                if (error) {
                    throw error
                }
                callback(results);
            });
        }
        function getSingleBranch(query,name,callback) {
            query=query+" where branches.town = \""+name+"\"";
            pool.query(query, function (error, results, fields) {
                if (error) {
                    throw error
                }
                callback(results);
            });
        }

module.exports=router;