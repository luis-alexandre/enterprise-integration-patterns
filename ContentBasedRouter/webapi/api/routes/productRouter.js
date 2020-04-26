var express = require('express');
const productController = require('../controllers/productController');

module.exports = () => {

    var router = express.Router();

    router.post('/', function(req, res){

        let response = productController(req.header("system-id"), req.body);
        res.json(response);
        
    });

    return router;
}