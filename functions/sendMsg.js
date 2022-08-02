exports.handler = function(context, event, callback) {
  const client = context.getTwilioClient();

  // Query parameters or values sent in a POST body can be accessed from `event`
  const from = event.From;
  const to = event.To;
  const body = event.message;
  console.log(from, to, body, client)

  // Use `messages.create` to generate a message. Be sure to chain with `then`
  // and `catch` to properly handle the promise and call `callback` _after_ the
  // message is sent successfully!
  client.messages
    .create({ body, to, from })
    .then((message) => {
      console.log(message.sid);
      return callback(null, `Success! Message SID: ${message.sid}`);
    })
    .catch((error) => {
      console.log(error);
      return callback(error);
    });
};

