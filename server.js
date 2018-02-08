/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-02-07 02:15:23 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-02-08 12:07:12
 */

// #############REQUIRE#######################################
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.Port || 3000;

// #############APP############################################
var app = express();
app.listen(port, () => {
    console.log(`Server is running oon port  ${port}`);

});


// #############Partials/Helpers##############################
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('addition', (a, b) => {
    return a * b;
});
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//################MIDDLEWARE#################################

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to write the logs of application');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/shoppingCart'));

//################HANDLEBAR########################################
//################LOGIN########################################
app.set('view engine', 'hbs');
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express - web framework for Node.js application</h1>');
    res.render('login.hbs');
});

//################HOME########################################

app.get('/home', (req, res) => {
    // var jsObject = {
    //     name: 'dheeraj',
    //     address: '2501 mcgee street',
    //     activity: [
    //         'jumping',
    //         'running',
    //         'playing'
    //     ]
    // };
    // res.send(JSON.stringify(jsObject, undefined, 2));
    res.render('home.hbs', {
        welcome: 'Welcome Dheeraj',
        currentYear: new Date().getFullYear()
    });
});

//################ABOUT#######################################

app.get('/about', (req, res) => {
    // res.send('<h1>Hello Express - web framework for Node.js application</h1>');
    res.render('about.hbs', {
        title: 'About Page',
        currentYear: new Date().getFullYear()
    });
});