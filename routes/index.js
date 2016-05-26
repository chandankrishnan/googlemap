/**
 * define require module
 */
var express = require('express'),
    router = express.Router();

/**
 * GET home page.
 */
router.get('/', function(req, res) {
    res.render('index.html', {
        title: 'Locate Me'
    });
});

/** 
 * @exports {router}
 */
module.exports = router;