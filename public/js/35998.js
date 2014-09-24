require([
	'dojo/_base/declare',
	'dojo/_base/array',
	'dojox/form/Uploader',
	'dstore/Memory',
	'dstore/csv',
	'dstore/legacy/StoreAdapter',
	'dgrid/OnDemandGrid', // branch dev-0.4
	'dojo-smore/Csv',
	'put-selector/put',
	'dojo/request',
	'dojo/domReady!'
], function(
	declare,
	array,
	Uploader,
	Memory,
	csv,
	StoreAdapter,
	OnDemandGrid,
	SmoreCsv,
	put,
	request
) {
	var uploader,
		csvData,
		CsvMemory = declare([Memory, csv]);

	uploader = new Uploader({
		mame: 'uploadedfile',
		type: 'file',
		label: 'Select CSV file',
		uploadOnSelect: true,
		onComplete: onComplete
	}, 'uploader');
	uploader.startup();

	function onComplete (res) {
		if (res.success) {
			put(uploader.domNode, '.hidden');

			// request the uploaded csv file
			request('upload/' + res.filename).then(function (response) {
				var columns = {};

				// dstore csv
				csvData = new CsvMemory({
					data: response
				});
				array.forEach(csvData.fieldNames, function (name) {
					columns[name] = name;
				});

				// smore-Csv
//				csvData = new StoreAdapter({
//					objectStore: new SmoreCsv({data: response})
//				});
//				array.forEach(csvData.objectStore.fieldNames, function (name) {
//					columns[name] = name;
//				});

				new OnDemandGrid({
					collection: csvData,
					columns: columns
				}, 'dataResult');

			});
		} else {
			console.log('Fail to upload file');
		}
	}
});