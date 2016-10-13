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

router.post('/details',function(req,res){
    
})

/** 
 * @exports {router}
 */
module.exports = router;