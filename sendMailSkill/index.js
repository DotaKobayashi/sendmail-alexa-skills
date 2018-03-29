'use strict';

const Alexa = require('alexa-sdk');
const https = require('https');
const API_URL = 'your api url';

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'SendMails': function () {
        const req = https.request(API_URL, (res) => {
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        })
        
        req.on('error', (e) => {
          console.log(`メール送信に失敗しました。: ${e.message}`);
        });

        req.end();
        this.emit(':tell', 'メールを送信しました。');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = '勤怠メールを出します';
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'ご利用ありがとうございました。');
    },
    'Unhandled': function () {
        const speechOutput = 'すみません。うまく理解できませんでした。';
        const reprompt = 'もう一度おっしゃってください。';
        this.emit(':ask', speechOutput, reprompt);
    }
};

