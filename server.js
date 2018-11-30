const  express = require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log('Lod Time :', log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
    //res.send('<h1>hello express</h1>');
    res.send({
        name: 'Prabhat',
        likes:['Biking',
                'Cities'
            ]
    })
});


app.get('/about', (req, res) =>{
    //res.send('<h1>About</h1>');    
    res.render('about.hbs', {
        pageTitle: 'About Page............'
    });
});

app.get('/home', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Wellcome to home page',
        WellcomeMsg : 'Welcome to home page! thank you for visiting'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errormessage:[
            {status : 500},
            {error_message : 'Invalid Request'}
        ]
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});