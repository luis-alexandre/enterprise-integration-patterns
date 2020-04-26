const express       = require('express');
const bodyParser    = require('body-parser');
const config        = require('config');
const productRouter = require('../api/routes/productRouter')

module.exports = () => {

    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(function(req, res, next){
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Credentials", true);
        next();
    });

    app.set('port', process.env.PORT || config.get('server.port'));

    app.use('/api/v1', productRouter())

    return app;
};