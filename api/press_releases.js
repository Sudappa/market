(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/press_releases',get_all_press_releases)
	.post('/press_releases',insert_into_press_releases)
	.delete('/press_releases/:press_releases_id',delete_from_press_releases)
	.get('/press_releases/:press_releases_id',get_by_id_from_press_releases)
	.put('/press_releases/:press_releases_id',update_existing_from_press_releases)
	;


	function get_all_press_releases(req, res){
		db.collection_press_releases.find(callback_find);
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

	function delete_from_press_releases(req, res){

		console.log(req.params.press_releases_id);

		db.collection_press_releases.remove(
			{_id: db.ObjectId(req.params.press_releases_id)},
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

	function get_by_id_from_press_releases(req, res){

		db.collection_press_releases.findOne(
			{_id: db.ObjectId(req.params.press_releases_id)},
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

	function insert_into_press_releases(req, res){
		var object_to_insert = req.body;

		db.collection_press_releases.insert(object_to_insert,callback_insert);
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

	function update_existing_from_press_releases(req, res){
		db.collection_press_releases.update(
			{_id: db.ObjectId(req.params.press_releases_id)},
			{$set : 
				{
					press_release_title: req.body.press_release_title,
					press_release_published_on: req.body.press_release_published_on,
					press_release_short_description: req.body.press_release_short_description,
					press_release_contents: req.body.press_release_contents,
				}
			},
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