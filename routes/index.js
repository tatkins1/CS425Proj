var express = require('express');
var router = express.Router();
var path = require('path');
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: path.normalize(__dirname+'/../views')});
});


module.exports = router;

