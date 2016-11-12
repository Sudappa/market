(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/publishers',get_all_publishers)
	.post('/publishers',insert_into_publishers)
	.delete('/publishers/:publishers_id',delete_from_publishers)
	.get('/publishers/:publishers_id',get_by_id_from_publishers)
	.put('/publishers/:publishers_id',update_existing_from_publishers)
	;


	function get_all_publishers(req, res){
		db.collection_publishers.find(callback_find);
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

	function delete_from_publishers(req, res){

		console.log(req.params.publishers_id);

		db.collection_publishers.remove(
			{_id: db.ObjectId(req.params.publishers_id)},
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

	function get_by_id_from_publishers(req, res){

		db.collection_publishers.findOne(
			{_id: db.ObjectId(req.params.publishers_id)},
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

	function insert_into_publishers(req, res){
		var object_to_insert = req.body;

		db.collection_publishers.insert(object_to_insert,callback_insert);
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

	function update_existing_from_publishers(req, res){
		db.collection_publishers.update(
			{_id: db.ObjectId(req.params.publishers_id)},
			{$set : {
				publisher_name: req.body.publisher_name
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