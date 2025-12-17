const http = require('http');
const fs = require('fs');
const sql = require('mysql2');
const Canteen_DB = require('./canteen');
const Signup_DB = require('./signup');
const login_DB = require('./login');
const Issue_DB = require('./issue');
const Parking_DB = require('./parking');
http.createServer((req, res) => {
    // FIRSTPAGE
    if(req.url === '/'){
            fs.readFile("firstpage.html", 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(501, { "content-type": "text/plain" });
            res.end("Server not found");
            return;
        } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        }
    })
    }
    // SIGNUP PAGE
    else if(req.url === '/signup' && req.method === 'GET'){
        fs.readFile("signup.html",'utf8',(err,data) =>{
            if (err) {
            res.writeHead(501, { "content-type": "text/plain" });
            res.end("Server not found");
            return;
        } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        }
        })
    }
    // SUBMMITING AND GIVING DATA TO DATABASE
    else if(req.url === '/submit-signup' && req.method === 'POST'){
        return Signup_DB(req,res);
    }
    // LOGIN PAGE
    else if(req.url === '/login'){
        fs.readFile("login.html",'utf8',(err,data) =>{
            if (err) {
            res.writeHead(501, { "content-type": "text/plain" });
            res.end("Server not found");
            return;
        } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        }
        })
    }
    // CHECKING ID PASS FROM SIGNUP DATABASE
    else if(req.url === '/submit-login' && req.method === 'POST'){
        return login_DB(req,res);
    }
    // INDEX PAGE
    else if(req.url === '/index'){
        fs.readFile("index.html",'utf8',(err,data)=>{
           if (err) {
            res.writeHead(501, { "content-type": "text/plain" });
            res.end("Server not found");
            return;
        } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        } 
        })
    }
    // CANTEEN PAGE
    else if(req.url === '/canteen'){
        fs.readFile("canteen.html",'utf8',(err,data)=>{
           if (err) {
            res.writeHead(501, { "content-type": "text/plain" });
            res.end("Server not found");
            return;
        } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        } 
        })
    }
    // GIVING ORDER TO DATABASE
    else if(req.url === '/submit-canteen' && req.method === 'POST'){
        return Canteen_DB(req,res);
        // res.end();
    }
    // ISSUE PAGE
    else if(req.url === '/Issue' && req.method === 'GET'){
        fs.readFile("Issue_report.html",'utf8',(err,data)=>{
           if (err) {
            res.writeHead(501, { "content-type": "text/plain" });
            res.end("Server not found");
            return;
        } 
          else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        } 
        })
    } 
    // GINVING ISSUE TO DATABASE
    else if(req.url === '/Issue-submit' && req.method === 'POST'){
        return Issue_DB(req,res);
    }
    // LOST& FOUND PAGE
    else if(req.url === '/lost&found' && req.method === 'GET'){
        fs.readFile("lost&found.html",'utf8',(err,data)=>{
           if (err) {
            res.writeHead(501, { "content-type": "text/plain" });
            res.end("Server not found");
            return;
        } else {
            res.writeHead(200, { "content-type": "text/html" });
            res.end(data);
        } 
        })
    }
    // BUS TRACKING PAGE
    else if(req.url === '/bus_tracking' && req.method === 'GET'){
        fs.readFile('bus_tracking.html','utf8',(err,data) =>{
            if(err){
                res.writeHead(501,{'content-type' : 'text/plain'});
                res.end("Page not found");
            }
            else{
                res.writeHead(200,{'content-type' : 'text/html'});
                res.end(data);
            }
        })
    }
    // PARKING AVAILABILITY PAGE
    else if(req.url === '/Parking' && req.method === 'GET'){
        fs.readFile('Parking_availability.html','utf8',(err,data) =>{
            if(err){
                res.writeHead(501,{'content-type' : 'text/plain'});
                res.end("Page not found");
            }
            else{
                res.writeHead(200,{'content-type' : 'text/html'});
                res.end(data);
            }
        })
    }
    else if(req.url === '/Parking-submit' && req.method === 'POST'){
        return Parking_DB(req,res);
    }
    else if(req.url === '/event' && req.method === 'GET'){
        fs.readFile('Event.html','utf8',(err,data) =>{
            if(err){
                res.writeHead(501,{'content-type' : 'text/plain'});
                res.end("Page not found");
            }
            else{
                res.writeHead(200,{'content-type' : 'text/html'});
                res.end(data);
            }
        })
    }
    else{
        res.writeHead(501,{"content-type" : "text/plain"});
        res.end("Server not Found");
    }




}).listen(2000, () => {
    console.log("Server running on http://localhost:2000");
});