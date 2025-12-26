const sql = require('mysql2');
const queryString = require('querystring');

const db = sql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '77393034',
    database : 'ParkingDB'
});

db.connect(err =>{
    if(err){
        console.log("Parking DB not connected");
    }
    console.log("Parking DB connected");
});
function Parking_DB(req,res){
    let dataBody = [];
    req.on('data',(chunks) => {
        dataBody.push(chunks);
    });
    req.on('end',() =>{
        let raw_data = Buffer.concat(dataBody).toString();
        let rd = queryString.parse(raw_data);
        console.log("Data Received");
        const sql = `insert into vehicle(number,email,message)
                    values(?,?,?)`;
        db.query(sql,[rd.number,rd.email,rd.message],(err,data)=>{
            if(err){
                res.writeHead(501,{'content-type' : 'text/plain'});
                res.end("Server not found");
            }
            else{
                res.writeHead(200,{'content-type' : 'text/html'});
                res.end("Data is received");
            }
        })
    })
}
module.exports = Parking_DB;