const http = require('http');
const fs = require('fs');
const sql = require('mysql2');
const path = require('path');
const serveHtml = require('./utils/serve')
const Canteen_DB = require('./controllers/canteen');
const Signup_DB = require('./controllers/signup');
const login_DB = require('./controllers/login');
const Issue_DB = require('./controllers/issue');
const Parking_DB = require('./controllers/parking');
http.createServer((req, res) => {
     if (req.url.startsWith('/public')) {
        const filePath = path.join(__dirname, req.url);
        const ext = path.extname(filePath);

        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.webp': 'image/webp',
            '.css': 'text/css',
            '.js': 'text/javascript'
        };

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("File not found");
            } else {
                res.writeHead(200, {
                    'Content-Type': mimeTypes[ext] || 'application/octet-stream'
                });
                res.end(data);
            }
        });
        return;
    }
    // FIRSTPAGE
    if(req.url === '/' && req.method === 'GET'){
            serveHtml(res,'pages/firstpage.html');
    }

    // SIGNUP PAGE
    else if(req.url === '/signup' && req.method === 'GET'){
       serveHtml(res,'pages/signup.html');
    }
    // SUBMMITING AND GIVING DATA TO DATABASE
    else if(req.url === '/submit-signup' && req.method === 'POST'){
        return Signup_DB(req,res);
    }
    // LOGIN PAGE
    else if(req.url === '/login'){
        serveHtml(res,'pages/login.html');
    }
    // CHECKING ID PASS FROM SIGNUP DATABASE
    else if(req.url === '/submit-login' && req.method === 'POST'){
        return login_DB(req,res);
    }
    // INDEX PAGE
    else if(req.url === '/index'){
        serveHtml(res,'pages/index.html');
    }
    // CANTEEN PAGE
    else if(req.url === '/canteen'){
        serveHtml(res,'pages/canteen.html');
    }
    // GIVING ORDER TO DATABASE
    else if(req.url === '/submit-canteen' && req.method === 'POST'){
        return Canteen_DB(req,res);
    }
    // ISSUE PAGE
    else if(req.url === '/issue' && req.method === 'GET'){
        serveHtml(res,'pages/issue.html');
    } 
    // GINVING ISSUE TO DATABASE
    else if(req.url === '/issue-submit' && req.method === 'POST'){
        return Issue_DB(req,res);
    }
    // LOST& FOUND PAGE
    else if(req.url === '/lost-found' && req.method === 'GET'){
        serveHtml(res,'pages/Lost&Found.html');
    }
    // BUS TRACKING PAGE
    else if(req.url === '/bus_tracking' && req.method === 'GET'){
        serveHtml(res,'pages/bus_tracking.html');
    }
    // PARKING AVAILABILITY PAGE
    else if(req.url === '/parking' && req.method === 'GET'){
        serveHtml(res,'pages/Parking_availability.html')
    }
    else if(req.url === '/Parking-submit' && req.method === 'POST'){
        return Parking_DB(req,res);
    }
    else if(req.url === '/event' && req.method === 'GET'){
        serveHtml(res,'pages/Event.html');
    }
    else{
        res.writeHead(501,{"content-type" : "text/plain"});
        res.end("Server not Found");
    }




}).listen(2000, () => {
    console.log("Server running on http://localhost:2000");
});