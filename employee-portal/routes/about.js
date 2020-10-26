var express = require('express');
var router = express.Router();

/* GET About us page. */
router.get('/about', function(req, res, next) {
  res.render('pages/index');
});

module.exports = router;
