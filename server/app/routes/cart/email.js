var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('vDMsj0tlxEj5ONebunR34g');

var subtotal = 0;
function itemsGenerator (items) {
  var cartInfo = "";
  items.forEach(function(item){
    subtotal+=(item.price*item.quantity);
    return cartInfo +=
    "<p> Product: " + item.productId.title + "</p>" +
    "<p> Price: $" + item.price + "</p>" +
    "<p> Quantity: " + item.quantity + "</p>" +
    "<p><img src=\' " + item.productId.img + "\' width='50' height='50'></p>";
  })
  return cartInfo;
}

var emailSender = function (info) {
  // var template_name = "example template_name";
  // var template_content = [{
  //       "name": "example name",
  //       "content": "example content"
  //   }];

  console.log('email info',info)
  console.log('email items',info.items[0].productId)

  // itemsGenerator(info.orders)

  var template_name = "hero-ticket";
  var template_content = [
    {
      "name": "orderid",
      "content": "<p>Order ID: " + info._id + "</p>"
    },
    {
      "name":"date",
      "content": "<p>Date Created: " + info.dateCreated + "</p>"
    },
    {
      "name":"address",
      "content": "<p>Shipping Address: 5 Hanover Square, New York, NY, 10004</p>"
    },
    {
      "name":"item",
      "content": itemsGenerator(info.items)
    },
    {
      "name":"subtotal",
      "content": "<p> Subtotal: $" + subtotal + "</p>"
    }

    ];

  var message = {
    "subject": "Your order is received",
    "from_email": "order@meetyourhero.com",
    "from_name": "MeetYourHero",
    "to": [{
            "email": "eueu.lee@gmail.com",
            "name": "Eunice",
            "type": "to"
        },
        {
        "email": "robbieferguson139@gmail.com",
        "name": "Robbie",
        "type": "to"
      },
      {
      "email": "kylelussier3@gmail.com",
      "name": "Kyle",
      "type": "to"
      }

        ],
    "headers": {
        "Reply-To": "message.reply@example.com"
    }

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