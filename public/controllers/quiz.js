const {  AuthorizationCode } = require('simple-oauth2');
var  https = require('https');

module.exports.run_setup = function(app) {
    var ion_client_id = 'kxPonp6rlh0QnVlUipJCKl5cX6znzYp9QY8psQ1L';
var ion_client_secret = 'IENWkTCJ0yDerLdmUFm17ughAUL8EogrTLo1k5PPID2ptLij4dgf2bCDN4bnIDF4xrJQsb7nSILyEJkmEOovziwrFQGgLmJUMh8jCY9i3Fm9k6WLNUYKXCwHj4C6IKG8';
var ion_redirect_uri = 'https://jh.sites.tjhsst.edu/login';    //    <<== you choose this one
var client = new AuthorizationCode({
  client: {
    id: ion_client_id,
    secret: ion_client_secret,
  },
  auth: {
    tokenHost: 'https://ion.tjhsst.edu/oauth/',
    authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
    tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
  }
});
// This is the link that will be used later on for logging in. This URL takes
// you to the ION server and asks if you are willing to give read permission to ION.

var authorizationUri = client.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});
function checkAuthentication(req,res,next) {

    if ('authenticated' in req.session) {
        // the user has logged in
        next()
    }
    else {
        // the user has not logged in
        res.render('quiz', {'user': 'Unkown', 'link' : authorizationUri, 'message':'Login'})
    }
}
function getUserName(req,res,next) {
    var access_token = req.session.token.access_token;
    var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;
    
    https.get(profile_url, function(response) {
    
      var rawData = '';
      response.on('data', function(chunk) {
          rawData += chunk;
      });
    
      response.on('end', function() {
        res.locals.profile = JSON.parse(rawData);
        next(); 
      });
    
    }).on('error', function(err) {
        next(err)
    });

}
async function convertCodeToToken(req, res, next) {
    var theCode = req.query.code;

    var options = {
        'code': theCode,
        'redirect_uri': ion_redirect_uri,
        'scope': 'read'
     };
    
    // needed to be in try/catch
    try {
        var accessToken = await client.getToken(options);      // await serializes asyncronous fcn call
        res.locals.token = accessToken.token;
        next()
    } 
    catch (error) {
        console.log('Access Token Error', error.message);
         res.send(502); // error creating token
    }
}


app.get('/login', [convertCodeToToken], function(req, res) { 

    req.session.authenticated = true;
    req.session.token = res.locals.token;
    
    res.redirect('https://jh.sites.tjhsst.edu/quiz');
    
});
app.get('/logout', function (req, res) {
    
    delete req.session.authenticated;
    console.log(res.locals.token);
    res.redirect('https://jh.sites.tjhsst.edu/quiz');

});
    app.get('/quiz', [checkAuthentication, getUserName], function(req, res){
        var profile = res.locals.profile;
        var first_name = profile.first_name;
        
        var visit_count;
    if (!('visit_count' in req.session)) {
        visit_count = 0;
    } else {
        visit_count = req.session.visit_count
    }
    

	if (Number.isNaN(visit_count)) {
		visit_count = 1;
	} else {
		visit_count += 1;
	}
	req.session.visit_count = visit_count;
   res.render('quiz', {'visitor':visit_count, 'user': first_name, 'link':'https://jh.sites.tjhsst.edu/logout', 'message':'Logout'});     
});
}