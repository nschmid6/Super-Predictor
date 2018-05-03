//some code from https://vmokshagroup.com/blog/building-restful-apis-using-node-js-express-js-and-ms-sql-server/

let express = require('express');
let app = express();
let mysql = require('mysql');
let bodyParser = require('body-parser');
let cors = require('cors');
let config = require('./config');
let port = config.expressPort;
let passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
let session = require('express-session');


app.use(bodyParser.json());
app.use(cors({
    origin: [process.env.URL, 'http://localhost:3002']
}));
app.use(session({secret:"weather"}));
app.use(passport.initialize());
app.use(passport.session());

app.options('*', cors());

let connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "superpredictor",
  database: "weather_users"
});

connection.connect(function (err) {
    if (err) {
        console.log("Error while connecting database: ", err);
        res.send(err);
    }
});

//let loginRouter = require('./src/routes/loginRouter');
//let weatherRouter = require('./src/routes/weatherRouter');

let executeQuery = function(req, res){
        connection.query(req, function(err,dbRes){
            if(err){
                console.log("Error while querying:", err);
                res.send(err);
            }
            else{
                res.json(dbRes);
            }
        });
};


passport.use(new LocalStrategy(
    function(username, password, done) {
        let userQuery = "SELECT * FROM users WHERE username= '" + username + "'";
        connection.query(userQuery, function(err, user){
            if (err) {return done(err);}
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (password !== user[0].password){
                return done(null, false, {message: 'Incorrect password.'});
            }

            return done(null, user[0]);
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


app.post('/login', cors(),
    passport.authenticate('local'),
    function(req, res){
        if(req.user.role === 'Admin'){
            return res.redirect('http://localhost:3002/admin');
        }
        else if(req.user.role === 'Teacher'){
            return res.redirect('/teacher');
        }
        else if(req.user.role === 'Student'){
            return res.redirect('/start');
        }
    });

app.get("/allUsers", function(req,res){
    let query = "SELECT * FROM users";
    executeQuery(query, res);
});

app.get("/allStudents", function(req,res){
    let query = "SELECT * FROM users WHERE role = 'Student'";
    executeQuery(query, res);
});

app.post("/newUser", function(req,res){
    let query = "INSERT INTO users (`fname`, `lname`, `role`, `username`, `password`) VALUES ('"+ req.body.fname + "', '" + req.body.lname + "', '" + req.body.role + "', '" + req.body.username + "', '" + req.body.password +"')";
    executeQuery(query, res);
});

app.get("/deleteUser/:username", function(req,res){
    let query = "DELETE FROM users WHERE username = '" + req.params.username + "'";
    executeQuery(query, res);
});

app.listen(port, function(){
    console.log('Server is running on Port: ', port);
});
