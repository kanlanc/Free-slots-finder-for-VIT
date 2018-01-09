/*jshint esversion: 6 */
var express = require('express');
var passport = require("passport");
var LocalStrategy = require("passport-local");
var session = require('express-session');
var methodOverride = require('method-override');
var flash = require("connect-flash");
require('dotenv').config();



var User = require("./models/users");
var Admin = require('./models/admin');



var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://'+process.env.user+':'+process.env.password+'@ds249787.mlab.com:49787/freeslotsfinder');




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "this is a secret"
}));


passport.use(new LocalStrategy(Admin.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.set("view engine", "ejs");

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// Admin.create({
//     username:"",
//     password:""
// }, function(err,user){
//     if(err)
//     {
//         console.log(err);
//         req.flash("error",err.message);
//         res.redirect("/login");
//     }
// });

// remove this 

// app.post('/user', function (req, res) {
// Admin.register(new Admin({username:req.body.username}),req.body.password,(err,user)=>{
//     if(err)
//     {
//         req.flash("error",err.message);            
//         return res.redirect("/");
//     }
//     passport.authenticate("Local")(req,res,()=>{
//         req.flash("success","Welcome" +user.username);            
//          res.redirect("/admin");
//         // res.send("Registration Successfull");
//     });
// });    
// });

// Index page
app.get('/', function (req, res) {
    res.render("index");
});


// User Routes

app.get('/user', function (req, res) {
    res.render("index");
});

app.post('/user', function (req, res) {
    var document = {
        name: req.body.name,
        reg: req.body.reg,
        slots: req.body.slot
    };

    User.create(document, (err, user) => {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/");
        }
        else {
            req.flash("success", "Your data has been stored in the database");
            res.redirect("/");
        }
    });

});




// Admin Routes

app.get("/admin", isLoggedIn, (req, res) => {
    res.render("admin");
});



// Auth Routes

app.get("/login", (req, res) => {
    res.render("login");
});

app.post('/login', passport.authenticate("local", {
    successRedirect: "/admin",
    failureRedirect: "/login"
}), function (req, res) {

});

app.get('/logout', function (req, res) {
    req.logout();
    req.flash("success", "Logged Out!!");
    res.redirect("/");
});


app.get('/monday', function (req, res) {
    var mon_slots = [];
    var i, j;

    for (i = 0; i < 7; i++)
        mon_slots.push(i);


    for (i = 31; i < 37; i++)
        mon_slots.push(i);
    
    fs = [];
   
    User.find({}, (err, userx) => {
        if (err)
            console.log(err);
        userx.forEach(function (user) {
            var docs = {
                name: "xx",
                slots: []
            };
            var free_slots = [];
            for (i = 0; i < mon_slots.length; i++) {
                if (user.slots.indexOf(mon_slots[i]) == -1) {
                    free_slots.push(mon_slots[i]);
                }

            }
            docs.name = user.name;
            docs.slots = free_slots;
            console.log(docs.name);
            fs.push(docs);
            console.log(fs);
        });
        //  console.log(fs);
        res.render("day", { day: "Monday", guy: fs });
    });

});

app.get('/tuesday', function (req, res) {
    var mon_slots = [];
    var i, j;

    for (i = 7; i < 13; i++)
        mon_slots.push(i);


    for (i = 37; i < 43; i++)
        mon_slots.push(i);
    
    fs = [];
    
    User.find({}, (err, userx) => {
        if (err)
            console.log(err);
        userx.forEach(function (user) {
            var docs = {
                name: "xx",
                slots: []
            };
            var free_slots = [];
            for (i = 0; i < mon_slots.length; i++) {
                if (user.slots.indexOf(mon_slots[i]) == -1) {
                    free_slots.push(mon_slots[i]);
                }

            }
            docs.name = user.name;
            docs.slots = free_slots;
            fs.push(docs);
        });
        
        res.render("day", { day: "Tuesday", guy: fs });
    });

});

app.get('/wednesday', function (req, res) {
    var mon_slots = [];
    var i, j;

    for (i = 13; i < 17; i++)
        mon_slots.push(i);


    for (i = 43; i < 49; i++)
        mon_slots.push(i);
    fs=[];
    User.find({}, (err, userx) => {
        if (err)
            console.log(err);
        userx.forEach(function (user) {
            var docs = {
                name: "xx",
                slots: []
            };
            var free_slots = [];
            for (i = 0; i < mon_slots.length; i++) {
                if (user.slots.indexOf(mon_slots[i]) == -1) {
                    free_slots.push(mon_slots[i]);
                }

            }
            docs.name = user.name;
            docs.slots = free_slots;
            fs.push(docs);
        });

        res.render("day", { day: "Wednesday", guy: fs });
    });

});

app.get('/thursday', function (req, res) {
    var mon_slots = [];
    var i, j;

    for (i = 19; i < 25; i++)
        mon_slots.push(i);


    for (i = 49; i < 55; i++)
        mon_slots.push(i);
    fs=[];
    User.find({}, (err, userx) => {
        if (err)
            console.log(err);
        userx.forEach(function (user) {
            var docs = {
                name: "xx",
                slots: []
            };
            var free_slots = [];
            for (i = 0; i < mon_slots.length; i++) {
                if (user.slots.indexOf(mon_slots[i]) == -1) {
                    free_slots.push(mon_slots[i]);
                }

            }
            docs.name = user.name;
            docs.slots = free_slots;
            fs.push(docs);
        });

        res.render("day", { day: "Thursday", guy: fs });
    });

});


app.get('/friday', function (req, res) {
    var mon_slots = [];
    var i, j;

    for (i = 25; i < 31; i++)
        mon_slots.push(i);


    for (i = 55; i < 61; i++)
        mon_slots.push(i);
    fs=[];
    User.find({}, (err, userx) => {
        if (err)
            console.log(err);
        userx.forEach(function (user) {
            var docs = {
                name: "xx",
                slots: []
            };
            var free_slots = [];
            for (i = 0; i < mon_slots.length; i++) {
                if (user.slots.indexOf(mon_slots[i]) == -1) {
                    free_slots.push(mon_slots[i]);
                }

            }
            docs.name = user.name;
            docs.slots = free_slots;
            fs.push(docs);
        });

        res.render("day", { day: "Friday", guy: fs });
    });

});



//Middleware 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First!!");
    res.redirect("/login");
}

app.listen(process.env.PORT ||3000, function () {
    console.log('Server listening on port 3000!');
});