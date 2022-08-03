var axios = require('axios');
var qs = require('qs');

exports.handler = function(context, event, callback) {
  if("OptOutType" in event){
    var eventName = ''
    var mode = event.From.startsWith("whatsapp:") ? 'whatsapp' : 'SMS'
    
    if(event.OptOutType === 'START'){
      eventName = `Subscribe to ${mode}`
    }
    else if (event.OptOutType === 'STOP') {
      eventName = `Unsubscribed from ${mode}`
    }
    else if(event.OptOutType === 'HELP') {
      eventName = `Help for ${mode}`
    }

    var data = qs.stringify({
      'data': `{"token": "${context.KLAVIYO_PUBLIC_API_KEY}", "event": "${eventName}", "customer_properties": {"$phone_number": "${event.From.replace('whatsapp:','')}"}, "properties": {"mode":"${mode}"}}`
    });
    var config = {
      method: 'post',
      url: 'https://a.klaviyo.com/api/track',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Accept': 'text/html'
      },
      data : data
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        callback(null, "")
      })
      .catch(function (error) {
        console.log(error);
        callback(null, "")
      });
  }
};
