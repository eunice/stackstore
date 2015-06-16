var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('bAsksHHTJMqLdXFQjCLM7Q');

// var template_name = "example template_name";
// var template_content = [{
//         "name": "example name",
//         "content": "example content"
//     }];

var async = false;
var ip_pool = "Main Pool";
var send_at = "example send_at";

var emailSender = function(userInfo){
    var to_name, to_email, from_email, subject, message_html;
    console.log("hit emailSender", userInfo)

    var message = {
        "html": "hihi" + userInfo.displayName + "hihi" + userInfo.orders,
        "text": "hihi" + userInfo + "hihi" + userInfo,
        "subject": "detail of your order",
        "from_email": "order@meetyourhero.com",
        "from_name": "Hero",
        "to": [{
            "email": "angi3yang@gmail.com",
            "name": "angie",
            "type":"to"
        }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
          "Order Detail"
        ],
        "template_content": [
            {
                "name": "header",
                "content": "<h2>Your Order is Complete</h2>"
            },
            {
                "name": "main",
                "content": "We appreciate your business. Your order information is below."
            }
        ]
    }

    var async = false;
    var ip_pool = "Main Pool";

    // mandrill_client.messages.sendTemplate({"template_name": template_name, "template_content": template_content, "message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {    
        console.log(result);
        /*
        [{
                "email": "recipient.email@example.com",
                "status": "sent",
                "reject_reason": "hard-bounce",
                "_id": "abc123abc123abc123abc123abc123"
            }]
        */
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });
}

module.exports = emailSender;

// var message = {
//     "html": "<p>Example HTML content</p>",
//     "text": "Example text content",
//     "subject": "example subject",
//     "from_email": "message.from_email@example.com",
//     "from_name": "Example Name",
//     "to": [{
//             "email": "recipient.email@example.com",
//             "name": "Recipient Name",
//             "type": "to"
//         }],
//     "headers": {
//         "Reply-To": "message.reply@example.com"
//     },
//     "important": false,
//     "track_opens": null,
//     "track_clicks": null,
//     "auto_text": null,
//     "auto_html": null,
//     "inline_css": null,
//     "url_strip_qs": null,
//     "preserve_recipients": null,
//     "view_content_link": null,
//     "bcc_address": "message.bcc_address@example.com",
//     "tracking_domain": null,
//     "signing_domain": null,
//     "return_path_domain": null,
//     "merge": true,
//     "merge_language": "mailchimp",
//     "global_merge_vars": [{
//             "name": "merge1",
//             "content": "merge1 content"
//         }],
//     "merge_vars": [{
//             "rcpt": "recipient.email@example.com",
//             "vars": [{
//                     "name": "merge2",
//                     "content": "merge2 content"
//                 }]
//         }],
//     "tags": [
//         "password-resets"
//     ],
//     "subaccount": "customer-123",
//     "google_analytics_domains": [
//         "example.com"
//     ],
//     "google_analytics_campaign": "message.from_email@example.com",
//     "metadata": {
//         "website": "www.example.com"
//     },
//     "recipient_metadata": [{
//             "rcpt": "recipient.email@example.com",
//             "values": {
//                 "user_id": 123456
//             }
//         }],
//     "attachments": [{
//             "type": "text/plain",
//             "name": "myfile.txt",
//             "content": "ZXhhbXBsZSBmaWxl"
//         }],
//     "images": [{
//             "type": "image/png",
//             "name": "IMAGECID",
//             "content": "ZXhhbXBsZSBmaWxl"
//         }]
// };