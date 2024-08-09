const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    password: "",
    database: "electron",
    user: "root",
});

db.connect((err) => 
{
    if (err) {
        console.log("Datebase connection Failed : " , err.stack);
        return;
    }
    console.log("Connected to database.");
})
module.exports =  db ;