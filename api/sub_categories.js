(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/sub_categories',get_all_sub_categories)
	.post('/sub_categories',insert_into_sub_categories)
	.delete('/sub_categories/:sub_categories_id',delete_from_sub_categories)
	.get('/sub_categories/:sub_categories_id',get_by_id_from_sub_categories)
	.put('/sub_categories/:sub_categories_id',update_existing_from_sub_categories)
	;


	/*function get_all_sub_categories(req, res){
		// db.mycollection.find({level: {$gt: 90}}).forEach(callback_find);
		db.collection_sub_categories.find(
			{
				"main_category": {
					"_id": "57cbf35ab2b5d91a105a14d8",
					"main_category_name": "Automobile1"
				}
			},
			callback_find
		);
		// db.collection_sub_categories.find(callback_find);
		function callback_find(err, doc) {
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}*/

	function get_all_sub_categories(req, res){
		db.collection_sub_categories.find(callback_find);
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

	function delete_from_sub_categories(req, res){

		console.log(req.params.sub_categories_id);

		db.collection_sub_categories.remove(
			{_id: db.ObjectId(req.params.sub_categories_id)},
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

	function get_by_id_from_sub_categories(req, res){

		db.collection_sub_categories.findOne(
			{_id: db.ObjectId(req.params.sub_categories_id)},
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

	function insert_into_sub_categories(req, res){
		var object_to_insert = req.body;

		db.collection_sub_categories.insert(object_to_insert,callback_insert);
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

	function update_existing_from_sub_categories(req, res){
		console.log(req.params);
		db.collection_sub_categories.update(
			{_id: db.ObjectId(req.params.sub_categories_id)},
			{$set : {
				sub_category_name: req.body.sub_category_name,
				main_category: req.body.main_category
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