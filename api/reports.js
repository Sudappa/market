(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/reports',get_all_reports)
	.post('/reports',insert_into_reports)
	.delete('/reports/:reports_id',delete_from_reports)
	// .get('/reports/:reports_id',get_by_id_from_reports)
	.get('/reports/:report_title',get_by_title_from_reports)
	.put('/reports/:reports_id',update_existing_from_reports)
	.post('/reports/get_report_by_country_object', get_report_by_country_object)
	.post('/reports/get_report_by_sub_category_object', get_report_by_sub_category_object)
	.post('/reports/get_report_by_publisher_object', get_report_by_publisher_object)
	;

	function get_report_by_publisher_object(req, res){
		// db.mycollection.find({level: {$gt: 90}}).forEach(callback_find);
		db.collection_reports.find(
			{
				"publisher": req.body
			},
			callback_find
		);
		// db.collection_reports.find(callback_find);
		function callback_find(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function get_report_by_sub_category_object(req, res){
		// db.mycollection.find({level: {$gt: 90}}).forEach(callback_find);
		db.collection_reports.find(
			{
				"sub_category": req.body
			},
			callback_find
		);
		// db.collection_reports.find(callback_find);
		function callback_find(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function get_report_by_country_object(req, res){
		// db.mycollection.find({level: {$gt: 90}}).forEach(callback_find);
		db.collection_reports.find(
			{
				"country": req.body
			},
			callback_find
		);
		// db.collection_reports.find(callback_find);
		function callback_find(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function get_all_reports(req, res){
		db.collection_reports.find(callback_find);
		function callback_find(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function delete_from_reports(req, res){

		console.log(req.params.reports_id);

		db.collection_reports.remove(
			{_id: db.ObjectId(req.params.reports_id)},
			callback_remove
		);
		function callback_remove(err, doc) {
			if( err ){
				console.log("Record NOT deleted");
				res.json(err);
			}else{
	  			console.log("Record DELETED");
				res.json(doc);
	  		} 
		}
	}

	function get_by_id_from_reports(req, res){

		db.collection_reports.findOne(
			{_id: db.ObjectId(req.params.reports_id)},
			callback_findOne
		);
		function callback_findOne(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function get_by_title_from_reports(req, res){

		db.collection_reports.findOne(
			{report_title: req.params.report_title},
			callback_findOne
		);
		function callback_findOne(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function insert_into_reports(req, res){
		var object_to_insert = req.body;

		db.collection_reports.insert(object_to_insert,callback_insert);
		function callback_insert(err, doc) {
			if( err ){
				console.log("Record NOT inserted");
				res.json(err);
			}else{
	  			console.log("Record INSERTED");
				res.json(doc);
	  		} 
		}
	}

	function update_existing_from_reports(req, res){
		db.collection_reports.update(
			{_id: db.ObjectId(req.params.reports_id)},
			{$set : {
				report_title: req.body.report_title,
				report_published_on: req.body.report_published_on,
				country: req.body.country,
				publisher: req.body.publisher,
				sub_category: req.body.sub_category,
				no_of_report_pages: req.body.no_of_report_pages,
				report_price: req.body.report_price,
				report_short_description: req.body.report_short_description,
				report_full_description: req.body.report_full_description
			}},
			callback_update 
		);
		function callback_update(err, doc) {
			if( err ){
				res.json(err);
				console.log("Record NOT updated");
			}else{
	  			console.log("Record UPDATED");
				res.json(doc);
	  		} 
		}

	}

};

})();