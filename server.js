const http = require('http');
const fs = require('fs');
const sql = require('mysql2');
const Canteen_DB = require('./canteen');
const Signup_DB = require('./signup');
const login_DB = require('./login');
const Issue_DB = require('./issue');
http.createServer((req, res) => {
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
    else if(req.url === '/submit-signup' && req.method === 'POST'){
        return Signup_DB(req,res);
    }
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
    else if(req.url === '/submit-login' && req.method === 'POST'){
        return login_DB(req,res);
    }
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
    else if(req.url === '/submit-canteen' && req.method === 'POST'){
        return Canteen_DB(req,res);
        // res.end();
    }
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
    else if(req.url === '/Issue-submit' && req.method === 'POST'){
        return Issue_DB(req,res);
    }
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
    else{
        res.writeHead(501,{"content-type" : "text/plain"});
        res.end("Server not Found");
    }




}).listen(2000, () => {
    console.log("Server running on http://localhost:2000");
});