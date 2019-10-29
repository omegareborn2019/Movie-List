var mysql = require('mysql')

var db = mysql.createConnection({
  user: "omega1984",
  password: "1917",
  database: "movies"
})

db.connect(err =>{
  if (err) console.log("database connection err");
  else{
    console.log("database connected");
  }
})

module.exports = db