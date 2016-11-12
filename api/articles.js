(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/articles',get_all_articles)
	.post('/articles',insert_into_articles)
	.delete('/articles/:articles_id',delete_from_articles)
	.get('/articles/:articles_id',get_by_id_from_articles)
	.put('/articles/:articles_id',update_existing_from_articles)
	;



	function get_all_articles(req, res){
		db.collection_articles.find(callback_find);
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

	function delete_from_articles(req, res){

		console.log(req.params.articles_id);

		db.collection_articles.remove(
			{_id: db.ObjectId(req.params.articles_id)},
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

	function get_by_id_from_articles(req, res){

		db.collection_articles.findOne(
			{_id: db.ObjectId(req.params.articles_id)},
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

	function insert_into_articles(req, res){
		var object_to_insert = req.body;

		db.collection_articles.insert(object_to_insert,callback_insert);
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

	function update_existing_from_articles(req, res){
		db.collection_articles.update(
			{_id: db.ObjectId(req.params.articles_id)},
			{$set : {
				article_title: req.body.article_title,
				article_published_on: req.body.article_published_on,
				article_short_description: req.body.article_short_description,
				article_contents: req.body.article_contents
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