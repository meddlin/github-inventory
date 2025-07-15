const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

function callApi() {
    // call api
}

Given('I have started the application', function() {
    return true;
})
Then('data should automatically load', function() {
    return 'data should load from the backend API';
})
Then('I should see the table populate with data', function() {
    return 'data should populate in the table';
})