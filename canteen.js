const sql = require('mysql2');
const queryString = require('querystring');

const db = sql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '77393034',
    database : 'CanteenDB'
});
db.connect((err) =>{
    if(err){
        console.log("Database connection failed❌");
        return;
    }
    console.log("Database connected succesfully🫡");
})

function Canteen_DB(req,res){
    let dataBody = [];
    req.on('data',(chunks) =>{
        dataBody.push(chunks);
    })
    req.on('end',() =>{
        let raw_data = Buffer.concat(dataBody).toString();
        let rd = queryString.parse(raw_data);
        console.log("Data received");
        const sql = `insert into orders(name,phone,fooditem,quantity)
                    values(?,?,?,?)`;
        db.query(sql,[rd.name,rd.phone,rd.fooditem,rd.quantity],(err,result) => {
            if(err){
                res.writeHead(501,{'content-type' : 'text/plain'});
                res.end("Something went wrong");
            }
            else{
                res.writeHead(200,{'content-type' : 'text/html'});
                res.end("<h1>Your order is placed</h1>");
                console.log("Order submitted");
            }
        })
    })
}
module.exports = Canteen_DB;