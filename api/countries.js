(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/countries',get_all_countries)
	.post('/countries',insert_into_countries)
	.delete('/countries/:countries_id',delete_from_countries)
	.get('/countries/:countries_id',get_by_id_from_countries)
	.put('/countries/:countries_id',update_existing_from_countries)
	;



	function get_all_countries(req, res){
		db.collection_countries.find(callback_find);
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

	function delete_from_countries(req, res){

		console.log(req.params.countries_id);

		db.collection_countries.remove(
			{_id: db.ObjectId(req.params.countries_id)},
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

	function get_by_id_from_countries(req, res){

		db.collection_countries.findOne(
			{_id: db.ObjectId(req.params.countries_id)},
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

	function insert_into_countries(req, res){
		var object_to_insert = req.body;

		db.collection_countries.insert(object_to_insert,callback_insert);
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

	function update_existing_from_countries(req, res){
		db.collection_countries.update(
			{_id: db.ObjectId(req.params.countries_id)},
			{$set : {
				country_name: req.body.country_name
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