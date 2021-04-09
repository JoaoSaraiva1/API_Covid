//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome COVID API'
    });
});

//Import covid Controller
var covidController = require('./CovidController');

// covid routes
router.route('/covid')
    .get(covidController.index)
    .post(covidController.add);
router.route('/covid/:covid_id')
    .get(covidController.view);
//Export API routes
module.exports = router;