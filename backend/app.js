//some code from https://vmokshagroup.com/blog/building-restful-apis-using-node-js-express-js-and-ms-sql-server/

let express = require('express');
let app = express();
let mysql = require('mysql');
let bodyParser = require('body-parser');
let cors = require('cors');
let config = require('./config');
let port = config.expressPort;

app.use(bodyParser.json());
app.use(cors({
    origin: [process.env.URL, 'http://localhost:3002']
}));

app.options('*', cors());

let userConnection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "superpredictor",
  database: "weather_users"
});

userConnection.connect(function (err) {
    if (err) {
        console.log("Error while connecting database: ", err);
        res.send(err);
    }
});

let weatherConnection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "superpredictor",
    database: "weather_data"
});

weatherConnection.connect(function(err){
    if(err){
        console.log("Error while connecting database: ", err);
        res.send(err)
    }
});

let queryUser = function(req, res){
        userConnection.query(req, function(err,dbRes){
            if(err){
                console.log("Error while querying:", err);
                res.send(err);
            }
            else{
                res.json(dbRes);
            }
        });
};


app.post('/login', function(req,res){

    let userQuery = "SELECT * FROM users WHERE username= '" + req.body.username + "'";

    userConnection.query(userQuery, function(err, user) {
        if (err) {
            res.send(err);
        }
        if (!user[0] || req.body.password !== user[0].password) {
            res.send('Incorrect username or password.');
        }
        else{
            if (user[0].role === 'Admin') {
                res.send('/admin');
            }
            else if (user[0].role === 'Teacher') {
                res.send('/teacher');
            }
            else if (user[0].role === 'Student') {
                res.send('/student');
            }
        }
    }
)});

app.get("/allUsers", function(req,res){
    let query = "SELECT * FROM users";
    queryUser(query, res);
});

app.get("/allStudents", function(req,res){
    let query = "SELECT * FROM users WHERE role = 'Student'";
    queryUser(query, res);
});

app.post("/newUser", function(req,res){
    let query = "INSERT INTO users (`fname`, `lname`, `role`, `username`, `password`) VALUES ('"+ req.body.fname + "', '" + req.body.lname + "', '" + req.body.role + "', '" + req.body.username + "', '" + req.body.password +"')";
    queryUser(query, res);
});

app.get("/deleteUser/:username", function(req,res){
    let query = "DELETE FROM users WHERE username = '" + req.params.username + "'";
    queryUser(query, res);
});

app.get("/getUser/:username", function(req,res){
    let query = "SELECT * FROM users WHERE username = '" + req.params.username + "'";
    queryUser(query, res);
});

app.post("/addWeather", function (req,res) {
   let query = "INSERT INTO weather (`wind`, `precip`, `temp`) VALUES ('" + req.body.wind + "', '" + req.body.precip + "', '" + req.body.temp + "')";
    weatherConnection.query(query, function(err,dbRes){
        if(err){
            console.log("Error while querying:", err);
            res.send(err);
        }
        else{
            res.json(dbRes);
        }
    });
});

app.get("/getWeather", function(req,res){
    let query = "SELECT * FROM weather";
    weatherConnection.query(query, function(err,dbRes){
        if(err){
            console.log("Error while querying:", err);
            res.send(err);
        }
        else{
            res.json(dbRes);
        }
    });
});

app.listen(port, function(){
    console.log('Server is running on Port: ', port);
});
