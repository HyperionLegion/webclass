var https = require('https');
var path = require('path')
var hbs = require('hbs');
module.exports.run_setup = function(app) {
 
function getWeatherLatLong(req, res, next){
  var url = 'https://api.weather.gov/points/'+req.query.lat+','+req.query.long
  var options =  { headers : {
    'User-Agent': 'request'
  }
}
  https.get(url, options, function(response) {

  var rawData = '';
  response.on('data', function(chunk) {
      rawData += chunk;
  });

  response.on('end', function() {
      var obj = JSON.parse(rawData);
      if('properties' in obj){
        if('forecast' in obj.properties){
        res.locals.forecasturl = obj.properties.forecast
	if('relativeLocation' in obj.properties){
        if('properties' in obj.properties.relativeLocation){
            if('city' in obj.properties.relativeLocation.properties && 'state' in obj.properties.relativeLocation.properties){
                        res.locals.city=obj.properties.relativeLocation.properties.city+", " +obj.properties.relativeLocation.properties.state;
            }
            else{
                res.locals.city = "City unknown"
            }
	}
else{
            res.locals.city="City unknown"
        }
        }
        else{
            res.locals.city="City unknown"
        }
        next()
      }
      else{
  res.render('error');
    }
      }
      else{
  res.render('error');
    }
  });

}).on('error', function(e) {
    res.send(e + " has occured")
    console.error(e);
});
}
function getWeatherForecast(req, res, next){
  var url = res.locals.forecasturl
  var options =  { headers : {
    'User-Agent': 'request'
  }
}
  https.get(url, options, function(response) {

  var rawData = '';
  response.on('data', function(chunk) {
      rawData += chunk;
  });

  response.on('end', function() {
      var obj = JSON.parse(rawData);
      if('properties' in obj){
        if('periods' in obj.properties){
      var result = {}
      
      result.city = res.locals.city;
      result.facts = [ obj.properties.periods[0].temperature+obj.properties.periods[0].temperatureUnit, obj.properties.periods[0].windSpeed+obj.properties.periods[0].windDirection, obj.properties.periods[0].shortForecast, obj.properties.periods[0].detailedForecast]
      result.lat = req.query.lat;
      result.long = req.query.long;
      if (result.facts[3]==""){
        result.facts[3] = "No detailedForecast"
      }
      res.render('result', result);
    }
    else{
  res.render('error');
    }
    }
      else{
  res.render('error');
    }
  });

}).on('error', function(e) {
    res.send(e + " has occured")
    console.error(e);
});
}
app.get('/funform', function(req, res){
  res.render('form');
});

app.get('/getweather', getWeatherLatLong, getWeatherForecast);
}