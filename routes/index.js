var express = require('express'),
	router = express.Router(),
	issues = [
		35998,
		36047,
		36050
	];

router.get('/', function(req, res) {
  res.render('index', {issues: issues});
});

module.exports = router;
