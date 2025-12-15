const sql = require('mysql2');
const queryString = require('querystring');

const db = sql.createConnection({
    host : "localhost",
    user : "root",
    password : "77393034",
    database : "SignupDB"
});
db.connect(err =>{
    if(err){
        console.log("Database signup not connected");
        return;
    }
    console.log("Database signup connected");
})
function Signup_DB(req,res){
    let dataBody = [];
    req.on('data',(chunks)=>{
        dataBody.push(chunks);
    })
    req.on('end',() =>{
        let raw_data = Buffer.concat(dataBody).toString();
        let rd = queryString.parse(raw_data);
        console.log("Data received");
        const sql = `insert into id_pass(name,email,password)
                    values(?,?,?)`;
        db.query(sql,[rd.name,rd.email,rd.password],(err,result) =>{
                        if(err){
                res.writeHead(501,{'content-type' : 'text/plain'});
                res.end("Something went wrong");
            }
            res.writeHead(302,{Location : '/login'});
                
            res.end();
        })
    })
}
module.exports = Signup_DB;