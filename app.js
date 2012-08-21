/**
 * Module dependencies.
 */

var express = require('express');

var app = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use('/public', express.static(__dirname + '/public'));
});

// Routes

app.get('/', function(req, res) {
  var title = 'Chirpie',
      header = 'Welcome to Chirpie';

  res.render('index', {
    locals: {
      'title': title,
      'header': header,
      'tweets': tweets,
      stylesheets: ['/public/style.css']
    }
  })
})

var tweets = [];

app.get('/tweets', function(req,res) {
  res.send(tweets);
	res.render('index', {
		locals: {
			'title': title,
			'header': header,
			'tweets': tweets,
			stylesheets: ['/public/style.css']
		}
	});
});

app.post('/send', express.bodyParser(), function(req, res) {
  if (req.body && req.body.tweet) {
    tweets.push(req.body.tweet);
    res.send({status:"ok", message:"Tweet received"});
  } else {
    //no tweet?
    res.send({status:"nok", message:"No tweet received"});
  }
})

app.listen(8000);