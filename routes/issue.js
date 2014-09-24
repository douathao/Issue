var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	path = require('path'),
	multipart = require('connect-multiparty');


function post35998 (req, res) {
	var file,
		newPath;

	// save file to upload directory
	if (req.files) {
		file = req.files.uploadedfile;

		fs.readFile(file.path, function (err, data) {
			newPath = path.normalize(__dirname + '/../public/upload/' + file.originalFilename);

			fs.writeFile(newPath, data, function (err) {
				if (err) { return next(err); }
				res.json({success: true, message: 'file is successfully uploaded.', filename: file.originalFilename});
			});
		});
	} else {
		res.status(400).json({success: false, message:'No file attached'});
	}
}

// Issue routes
router.post('/35998', multipart(), post35998);

module.exports = router;
