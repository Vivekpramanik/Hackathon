const sql = require('mysql2');
const queryString = require('querystring');

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "77393034",
    database: "SignupDB"
});

db.connect(err => {
    if (err) {
        console.log("Login db not connected");
        return;
    }
    console.log("Login DB is connected");
});

function login_DB(req, res) {
    let data = [];

    req.on('data', (chunks) => {
        data.push(chunks);
    });

    req.on('end', () => {
        let raw_data = Buffer.concat(data).toString();
        let rd = queryString.parse(raw_data);

        const sqlquery = `
            SELECT * FROM id_pass
            WHERE name = ? AND password = ?
        `;

        db.query(sqlquery, [rd.name, rd.password], (err, result) => {
            if (err) {
                res.writeHead(501, { "content-type": "text/plain" });
                return res.end("Server not found");
            }

            if (result.length > 0) {
                // ✅ YAHI COOKIE ADD KI HAI
                const userId = result[0].id;

                res.writeHead(302, {
                    "Set-Cookie": `userId=${userId}; HttpOnly`,
                    Location: "/index"
                });
                res.end();
            } else {
                res.writeHead(401, { "content-type": "text/html" });
                res.end("<h2>Invalid name or Password</h2>");
            }
        });
    });
}

module.exports = login_DB;
