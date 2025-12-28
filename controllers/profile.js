const sql = require("mysql2");

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "77393034",
    database: "SignupDB"
});

function profileData(req, res) {

    if (!req.headers.cookie) {
        res.writeHead(401);
        return res.end("Login required");
    }

    // cookie → userId
    const userId = req.headers.cookie.split("=")[1];

    const q = "SELECT name, email, roll, department FROM id_pass WHERE id=?";
    db.query(q, [userId], (err, result) => {

        if (err || result.length === 0) {
            res.writeHead(500);
            return res.end("User not found");
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result[0]));
    });
}

module.exports = profileData;
