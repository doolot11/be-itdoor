const swaggerJSDoc = require("swagger-jsdoc");
const glob = require("glob");

const routeFiles = glob.sync('./src/route/*.js');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "IT DOOR WEB PAGE",
      version: "1.0.0",
      description: "ALL INFORMATION ABOUT IT DOOR CURSES",
      contact: {
        email: "doolot928@gmail.com"
      },
    },
    // Todo: {
    //   id: '1',
    //   text: 'test',
    //   done: true
    // },
    servers: [
      { url: "http://localhost:3000/" }
    ]
  },
  apis: routeFiles
}

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;