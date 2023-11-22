const axios = require("axios");
const UserSchema = require("../models/userModel.js");
const _ = require("lodash");
const RoomSchema = require("../models/roomModel.js");

exports.webhook = async (req, res, next) => {
  const intent = req.body.intent;
  const parameters = req.body.parameters;
  console.log("====== chat bot ai web hook ====", intent, parameters);

  // Handle different intents
  // if (intent.name === 'your-intent-name') {
    // Perform actions based on the intent
    // You can access parameters using parameters.parameter-name

    const richContent = [
      [
        {
          type: 'chips',
          options: [
            { text: 'Shirts' },
            { text: 'Music' },
            { text: 'Tour movie' }
          ]
        }
      ]
    ];

    const response = {
      fulfillment_response: {
        messages: [
          {
            payload: {
              richContent: richContent
            }
          }
        ]
      }
    };

    res.json(response);
};
