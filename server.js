var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
// app.set('api', __dirname + '/api');
app.set('view engine', 'ejs');


//// Website reserchmoz code ////

var session = require('express-session');
var http = require('http');
// var express = require('express');
// var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	next();
});


app
// .use(express.static(__dirname + '/public'))
.use(bodyParser.json({limit: '50mb'}))
.use(session(
		{ 
			secret: 'keyboard cat', 
			cookie: { maxAge: 0.5*60*1000 },  //5 minutes
			resave: true, 
			saveUninitialized: true 
		}
	)
)
.use(bodyParser.urlencoded({extended: true}))
;

// var api_path = '../node-js-getting-started/api/';	//Path For localhost
// var api_path = '/app/api/';							//Path for AWS cloude
var api_path = '/app/api/';								//Path for Heroku cloude

var api_files = [
	// {api : '/app/api/countries.js'},
	{api : api_path + 'countries.js'},
	{api : api_path + 'publishers.js'},
	{api : api_path + 'main_categories.js'},
	{api : api_path + 'sub_categories.js'},
	{api : api_path + 'articles.js'},
	{api : api_path + 'press_releases.js'},
	{api : api_path + 'reports.js'},
	{api : api_path + 'user.js'},
	{api : api_path + 'email.js'},
	{api : api_path + 'payment_paypal.js'},
];

var MONGOLAB_URI = "mongodb://user_marketresearchandreports:pass_marketresearchandreports@ds053146.mlab.com:53146/db_marketresearchandreports";

// var db = mongojs('db_website_researchmoz1', 
var db = mongojs(MONGOLAB_URI, 
	[
	 	'collection_user',
	 	'collection_countries',
	 	'collection_publishers',
	 	'collection_main_categories',
	 	'collection_sub_categories',
	 	'collection_articles',
	 	'collection_press_releases',
	 	'collection_reports',
	 	
	]
);

api_files.forEach(function(each_item){
	require(each_item.api)(app, db);
});

//// Website reserchmoz code ////



app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.get('/times', function(request, response) {
    var result = '';
    var times = process.env.TIMES || 5;
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});