(function () {	'use strict';

module.exports = function(app, db){
	
	app
	.post('/email',email)
	.post('/email/email2',email2)
	;

	function email2(req,res){
		res.json({"Sending Email....." : "Sending Email NA Atta"});
	}

	function email(req,res){
		var api_key = 'key-15dd988dc147d77b5900b4a7b0b0ce37';
		var domain = 'sandbox363c3299ae6d48669c305a592b34c32d.mailgun.org';
		var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

		console.log("Email Body : " + JSON.stringify(req.body));

		// {
		// 	"full_name":"omkar",
		// 	"user_email":"ok@ok.com",
		// 	"job_title":"job1",
		// 	"company_name":"comp1",
		// 	"phone_number":7876455,
		// 	"message":"hi this is testing mail"
		// }
		 
		var enquiry_mail_data = {
		  from: req.body.user_email,
		  // from: "abc@gmail.com",
		  to: "omkarsutar37@gmail.com",
		  subject: "Enquiry at Market Reserch Website",
		  // text: "Static text",
		  text: req.body.message,
		  replyTo :"omkarsutar37@gmail.com",
		  headers:"Welcome to guru softwares",
		  // html: req.body.html_text,
		};

		// var enquiry_mail_data = {
		//   from: req.body.email_from,
		//   to: req.body.email_to,
		//   subject: req.body.subject,
		//   text: req.body.text,
		//   replyTo :"pravinjagtap2542@gmail.com",
		//   headers:"Welcome to guru softwares",
		//   html: req.body.html_text,
		// };
		 
		mailgun.messages().send(enquiry_mail_data, function (error, body) {
		  console.log(body);
		  res.json(body);
		});
	}


};

})();
