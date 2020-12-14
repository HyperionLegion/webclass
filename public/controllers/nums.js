var https = require('https');
var path = require('path')
var hbs = require('hbs');
module.exports.run_setup = function(app) {
var one = {facts: ['anything multiplied by one is that number', 'anything divided by one is that number', '1 is its own factorial', '1 is not prime', '1 is the first odd number']};
var two = {facts: ['two is the first prime number', 'two is the first even number', 'two is the only even prime number', '2 is considered a good number in the Far East', '2 is a symbol for partnership and balance']};
app.get('/1', function(req, res){
	if('num_facts' in req.query){
		if('format' in req.query && req.query.format=='json'){
		res.json({facts: one.facts.slice(0,req.query.num_facts)});
		}
		else{
		res.render('one', {facts: one.facts.slice(0,req.query.num_facts)});
		}
	}
	else{
		if('format' in req.query&& req.query.format=='json'){
		res.json({facts: one.facts.slice(0,1)});
		}
		else{
		res.render('one', {facts: one.facts.slice(0,1)});
		}
	}
});
app.get('/2', function(req, res){
	if('num_facts' in req.query){
if('format' in req.query && req.query.format=='json'){
		res.json({facts: two.facts.slice(0,req.query.num_facts)});
		}
else{
		res.render('two', {facts: two.facts.slice(0,req.query.num_facts)});
}
	}
	else{
if('format' in req.query&& req.query.format=='json'){
		res.json({facts: two.facts.slice(0,1)});
		}
else{
		res.render('two', {facts: two.facts.slice(0,1)});
}
	}
});
}
