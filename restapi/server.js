var express = require('express');
var server = express();
var routes = require('./routes/routes');
const cors = require('cors');



/**
Enabling CORS
*/
server.all('/*', function(req, res, next) {
          res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
          res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
          res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
          next();
});

server.use(express.json());
server.use(routes);

// Swagger Definition
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const bodyParser = require('body-parser')

/* Middlewares */
server.use(bodyParser.json())

//const swaggerSpec = swaggerJSDoc(options)
server.use('/api/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerFile))

require('./routes/routes.js')(server)

// Get port from environment and store in Express
var port = process.env.port || 3000

server.listen(port,function check(error)
{
    if(error)
    {
        console.log("errorr")
    }
    else
    {
        console.log("Server is running at port "+port)
    }
});