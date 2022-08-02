# Klaviyo <> Twilio

## What is this repo:
This repo helps you in connecting your Klaviyo account to Twilio. 

## Supported features:
1. Sending SMS from Twilio 
2. Triggering an event in Klaviyo when user unsubscribes.


## Workflow:
### 1. Sending an SMS:
1. User performs an action. 
2. Action triggers a Klaviyo flow.
3. The Klaviyo Flow calls a webhook that is hosted in this Twilio Function which sends out an SMS. 

#### How to send an SMS:

`https://<Your-Twilio-Serverless-Endpoint>/sendMsg?From=<Your-Twilio-Phone-Number>&To=<Customer-Phone-Number>&message=<Message-You-want-to-send>`

#### Things to consider: 
- Make sure you convert this function to a protected function if you don't want others to misuse this endpoint, as this would be a public endpoint.
- Take into consideration the [Serverless limits](https://www.twilio.com/docs/runtime/serverless-api#limitations-and-limits) and the [SMS limits](https://www.twilio.com/blog/programmable-sms-api-basics-best-practices)


### 2. Handling (un)subscribing from SMS:
1. The user responds to the message with `START`/`STOP`/`HELP` keywords. 
2. As the Twilio phone number already belongs to a Messaging service, advanced opt out feature automatically takes care of managing the consent of the user. 
3. This request is forwareded to the hosted Twilio Serverless service's handleSubscription function. 
4. This function looks for the `OptOutType` parameter in the request. 
5. Based on the `OptOutType` a corresponding event is triggered to your Klaviyo endpoint. 



