var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('vDMsj0tlxEj5ONebunR34g');

var emailSender = function (info) {
  // var template_name = "example template_name";
  // var template_content = [{
  //       "name": "example name",
  //       "content": "example content"
  //   }];

  console.log('email sending',info)

  var template_name = "order-notification";
  var template_content = [
    {
        "name": "orderid",
        "content": "<li>Order ID:" + info._id + "/li>"
    }
    ];

  var message = {
    // "html": "<p>Hello</p>",
    // "text": "This is the text content",
    "subject": "Your order is received",
    "from_email": "order@meetyourhero.com",
    "from_name": "MeetYourHero",
    "to": [{
            "email": "eueu.lee@gmail.com",
            "name": "Eunice",
            "type": "to"
        }],
    "headers": {
        "Reply-To": "message.reply@example.com"
    }
    // ,
    // "images": [{
    //         "type": "image/png",
    //         "name": "IMAGECID",
    //         "content": "ZXhhbXBsZSBmaWxl"
    //     }]
};

var async = false;
var ip_pool = "Main Pool";
// var send_at = "2015-06-15 12:15:30";

// "template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": 2013-01-01 15:00:00
mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool}, function(result) {
    console.log('reseult....',result);
    /*
    [{
            "email": "recipient.email@example.com",
            "status": "sent",
            "reject_reason": "hard-bounce",
            "_id": "abc123abc123abc123abc123abc123"
        }]
    */
}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
});


}

module.exports = emailSender;
