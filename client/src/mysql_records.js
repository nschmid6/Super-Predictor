var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Mattingly_1994"
//  database: "Weather_test"
});



//con.connect(function(err) {
//  if (err) throw err;
//  console.log("Connected!");
//});




con.connect(function(err) {
  if (err) throw err;
  con.query("Use Weather_test", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  con.query("Select * From Records", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});


