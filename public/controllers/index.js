var lab_nums = require('./nums.js');
var lab_weather = require('./weather.js');
var lab_quiz = require('./quiz.js')
module.exports.do_setup = function(app) {
 lab_nums.run_setup(app);
 lab_weather.run_setup(app);
 lab_quiz.run_setup(app);
}
// module.exports preceding an entity is essentially a public declaration
// i.e. do_setup is callable function from this file