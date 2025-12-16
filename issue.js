const sql = require('mysql2');
const queryString = require('querystring');

const db = sql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '77393034',
    database : 'IssueDB'
});
db.connect(err =>{
    if(err){
        console.log("Issue db not connected");
    }
    console.log("Issue db connected successfully");
});
function Issue_DB(req,res){
    let dataBody = [];
    req.on('data',(chunks) =>{
        dataBody.push(chunks);
    })
    req.on('end',() =>{
        let raw_data = Buffer.concat(dataBody).toString();
        let rd = queryString.parse(raw_data);
        console.log("Data received");
        const sql = `insert into complain(category,description)
                    values(?,?)`;
        db.query(sql,[rd.category,rd.description],(err,result) =>{
            if(err){
                res.writeHead(501,{'content-type' : 'text/plain'});
                res.end("Server not found");
            }
            else{
                res.writeHead(200,{'content-type' : 'text/html'});
                res.end("<h1>Your complain is received</h1>");
                console.log("Your complain is received");
            }
        })
    })
}
module.exports = Issue_DB;