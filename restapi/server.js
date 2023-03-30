var express = require('express');
var server = express();
var routes = require('./routes/routes');
const cors = require('cors');

server.use(express.json());
server.use(routes);
server.use(cors({
    origin:"*"
}));



// Swagger Definition
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

var database

const options = {
    definition:{
        openapi : '3.0.0',
        info : {
            title: 'Product REST API ' , 
            version: '1.0.0'
        },
        servers:[
            {
                url: 'http://localhost:3000/'
            }
        ]
    },
    apis: ['./routes/routes.js']
}

const swaggerSpec = swaggerJSDoc(options)
server.use('/api/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerSpec))

 
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