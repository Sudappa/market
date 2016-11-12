(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.get('/user', get_all_user)
	.post('/user', insert_into_user)
	.post('/user/login_user', login_user)
	.delete('/user/:user_id', delete_from_user)
	.get('/user/:user_id', get_by_id_from_user)
	.put('/user/:user_id', update_existing_from_user)
	.put('/user/update_user_cart/:user_id', update_user_cart)
	.put('/user/update_item_of_user_cart/:user_id', update_item_of_user_cart)
	.put('/user/pop_from_user_cart/:user_id', pop_from_user_cart)
	;



	function get_all_user(req, res){
		db.collection_user.find(callback_find);
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

	function login_user(req, res){
		console.log("Inside user_login");
		console.log(req.body);
		db.collection_user.findOne(
			req.body,
			// {
			// 	user_email : req.body.user_email,
			// 	password : req.body.password
			// },
			callback_findOne
		);
		function callback_findOne(err, doc){
			if( err ){
				console.log("Record NOT found");
				res.json(err);
			}else{
	  			console.log("Record FOUND");
				res.json(doc);
	  		} 
		}
	}

	function delete_from_user(req, res){

		console.log(req.params.user_id);

		db.collection_user.remove(
			{_id: db.ObjectId(req.params.user_id)},
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

	function get_by_id_from_user(req, res){

		db.collection_user.findOne(
			{_id: db.ObjectId(req.params.user_id)},
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

	function insert_into_user(req, res){
		var object_to_insert = req.body;
		object_to_insert.cart = [];
		object_to_insert.orders = [];
		object_to_insert.profile = {};


		db.collection_user.insert(object_to_insert,callback_insert);
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

	function update_existing_from_user(req, res){
		db.collection_user.update(
			{_id: db.ObjectId(req.params.user_id)},
			{$set : {
				user_email: req.body.user_email
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

	function update_user_cart(req, res){
		db.collection_user.update(
			{_id: db.ObjectId(req.params.user_id)},
			{$push: { 
				cart: req.body 
			}},
			callback_update 
		);
		function callback_update(err, doc) {
			if( err ){
				res.json(err);
				console.log("Record NOT updated");
			}else{
	  			console.log("Record UPDATED (CART)");
				res.json(doc);
	  		} 
		}

	}


	function update_item_of_user_cart(req, res){
		db.collection_user.update(
			// {user_id : 123456 , "items.item_name" : "my_item_two" },
			{
				_id: db.ObjectId(req.params.user_id),
				// "cart._id" : req.body._id
			},
			{$set: { 
				cart: req.body 
				// cart: { _id : req.body._id }
			}},
			callback_update 
		);
		function callback_update(err, doc) {
			if( err ){
				res.json(err);
				console.log("Record NOT updated");
			}else{
	  			console.log("Record UPDATED (CART UPDATE)");
				res.json(doc);
	  		} 
		}

	}

	function pop_from_user_cart(req, res){
		db.collection_user.update(
			{_id: db.ObjectId(req.params.user_id)},
			{$pull: { 
				// cart: req.body 				//Mathches whole Object
				cart: { _id : req.body._id }	//Mathches only _id
			}},
			callback_update 
		);
		function callback_update(err, doc) {
			if( err ){
				res.json(err);
				console.log("Record NOT deleted");
			}else{
	  			console.log("Record DELETED (CART POP)");
				res.json(doc);
	  		} 
		}

	}

};

})();