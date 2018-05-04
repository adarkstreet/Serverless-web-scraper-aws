const request = require('axios');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const { differenceWith, isEqual } = require('lodash');
const {extractListingsFromHTML} = require('./helpers');

module.exports.getDonkeyJobs = (event, context, callback) => {
  request('https://www.thedonkeysanctuary.org.uk/vacancies')
    .then(({data}) => {
      const jobs = extractListingsFromHTML(data);
      callback(null, {jobs});
    })
    .catch(callback);
};