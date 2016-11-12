(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/main_categories',get_all_main_categories)
	.post('/main_categories',insert_into_main_categories)
	.delete('/main_categories/:main_categories_id',delete_from_main_categories)
	.get('/main_categories/:main_categories_id',get_by_id_from_main_categories)
	.put('/main_categories/:main_categories_id',update_existing_from_main_categories)
	;



	function get_all_main_categories(req, res){
		db.collection_main_categories.find(callback_find);
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

	function delete_from_main_categories(req, res){

		console.log(req.params.main_categories_id);

		db.collection_main_categories.remove(
			{_id: db.ObjectId(req.params.main_categories_id)},
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

	function get_by_id_from_main_categories(req, res){

		db.collection_main_categories.findOne(
			{_id: db.ObjectId(req.params.main_categories_id)},
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

	function insert_into_main_categories(req, res){
		var object_to_insert = req.body;

		db.collection_main_categories.insert(object_to_insert,callback_insert);
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

	function update_existing_from_main_categories(req, res){
		db.collection_main_categories.update(
			{_id: db.ObjectId(req.params.main_categories_id)},
			{$set : {
				main_category_name: req.body.main_category_name
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