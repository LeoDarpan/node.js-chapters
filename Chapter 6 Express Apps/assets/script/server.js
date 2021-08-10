const http = require("http");
const fs = require("fs");
const _ = require("lodash");


const server = http.createServer((req, res) => {
    let num = _.random(0, 100);

    console.log(num);
    
    const greet = _.once(() => {
        console.log("Hello there!");
    });

    greet();
    greet();
    res.setHeader('Content-Type', 'text/html');
    
    let path = "../../";

    switch(req.url){
        case '/':
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about-me.html":
            res.statusCode = 301;
            res.setHeader('Location', "/about");
            res.end();
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;  
    }

    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            res.write(data);
            res.end();
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log("Listening for requests on port 3000!");
});