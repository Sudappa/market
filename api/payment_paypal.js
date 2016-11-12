(function () {	'use strict';

module.exports = function(app, db){
	
	var paypal = require('paypal-rest-sdk');

	var config = 
	{
		"port" : 5000,
		"api" : {
			"host" : "api.sandbox.paypal.com",
			"port" : "",            
			"client_id" : "AZ3a4u_EgQ1Q1y9RFUanx7MYXYIShy8UlEOS-df9kOyZBNxvDo2iB5WCuAKtWvrOW3onbJhr-SM7l-tW",  // your paypal application client id
			"client_secret" : "EL61OFsOTlDRHW-QAlttFQVSjZms1QMg352u0hX8qRGutHRcpnu9_ZTrMUgYL89Js3obgslOqSe4K3P4" // your paypal application secret id
		}
	};
	 
	paypal.configure(config.api);

	app
	.get('/success',callback_success)
	.get('/cancel',cancel)
	.get('/',callback_root)
	.post('/paynow',paynow)
	;
	function callback_success(req, res) {
		res.send("Payment transfered successfully.");
		console.log("Payment transfered successfully.");
	}

	// Page will display when you canceled the transaction 
	function cancel(req, res) {
		res.send("Payment canceled.");
		console.log("Payment canceled."); 
	}
	 
	function callback_root(req, res) {
		res.sendFile(__dirname+'/index.html');
	}
 
	function paynow(req, res) {
		console.log("Inside Server Payment Now");
		console.log(req.body);
		var total_price = 0;
		var item_array = [];

		req.body.forEach(function(each_cart_item, key) {
			total_price = total_price + parseInt(each_cart_item.selected_report_price);
		});

		req.body.forEach(function(each_cart_item, key) {
			var this_item = {
				"name" : each_cart_item.report_title,
				"sku" : each_cart_item.report_title,
				"price" : each_cart_item.selected_report_price,
				"currency" : "USD",
				"quantity" : 1
			};
			item_array.push(this_item);
		});
		console.log("TOTAL PRICE : " + total_price);
		console.log("ITEM ARRAY : " + JSON.stringify(item_array));

		var create_payment_json = {
			"intent": "sale",
			"payer": {
				"payment_method": "paypal"
			},
			"redirect_urls": {
				"return_url": 'http://marketresearchandreports.com/#/payment_success',
				"cancel_url": 'http://marketresearchandreports.com/#/payment_cancel',
			},
			"transactions": [{
				"item_list": {
		            // "items": [
		            // 	{
			           //      "name": "item",
			           //      "sku": "item",
			           //      "price": "1.00",
			           //      "currency": "USD",
			           //      "quantity": 1
			           //  },
			           //  {
			           //      "name": "item",
			           //      "sku": "item",
			           //      "price": "1.00",
			           //      "currency": "USD",
			           //      "quantity": 1
			           //  }
		            // ]
		            
		            "items": item_array
		        },
				// "amount": {
				// 	"total":"2",
				// 	"currency": "USD"
				// },
				"amount": {
					"total": total_price,
					"currency": "USD"
				},
				"description": "My awesome payment",

				// "description": JSON.stringify(req.body.description),
			}]
		};

		try {
			paypal.payment.create(create_payment_json, callback_paypal_payment_create);
		}
		catch (e) {
			console.log(e);
		}
 
		
		function callback_paypal_payment_create(error, payment) {
			console.log("Inside callback_paypal_payment_create");
			if (error) {
				console.log(error);
	//			error.alert_error_ocured_during_payment = "Error Ocured During Payment Process";
	//			res.json(error);
			}else {
	//			payment.alert_error_ocured_during_payment = "Error Ocured During Payment Process";
	//			res.json(payment);
			    if(payment.payer.payment_method === 'paypal') {
					req.paymentId = payment.id;
					var redirectUrl;
	//				console.log(payment);
					
					for(var i=0; i < payment.links.length; i++) {
						var link = payment.links[i];
						if (link.method === 'REDIRECT') {
							redirectUrl = link.href;
						}
					}
					res.redirect(redirectUrl);
				}
			}
		}
	  
	}
	
};

})();