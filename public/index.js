var express = require( 'express' ) ;
var  https = require('https');
var app = express() ;
var path = require('path');
var hbs = require('hbs');
//
var session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  name: 'snorkles',
  secret: 'mysecret92589258aijfio2095u210958s'
}))
var controllers = require('./controllers');
app.set( 'port' , process.env.PORT || 8080 ) ;
app.use(express.static(path.join(__dirname,'static')));
app.set('view engine', 'hbs');
hbs.registerPartials( path.join(__dirname,'views','partials') )
controllers.do_setup(app);


app.get('/', function(req, res){
  res.render('index')
});
app.get('/:page', function(req, res){

    var info = {
        page : req.params.page
    };

    res.json(info)
});
var listener = app . listen( app.get( 'port' )  , function() {   

   console . log( "Express server started on port: " + listener . address() . port ) ;

} ) ;