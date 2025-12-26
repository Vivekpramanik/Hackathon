const fs = require('fs');

function serveHtml(res,fileName){
     fs.readFile(fileName,'utf8',(err,data) =>{
        if(err){
            res.writeHead(404,{'content-type' : 'text/plain'});
            res.end("Server not found");
        }
        else{
            res.writeHead(200,{'content-type' : 'text/html'});
            res.end(data);
        }
     });
}
module.exports = serveHtml;