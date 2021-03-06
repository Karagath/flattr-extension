"use strict";

const account = require("../account");
const {dailyProcessing} = require("../../background/history/task");
const {startDomainsUpdate} = require("../../background/domains/update");

exports.dailyProcessing = dailyProcessing;
exports.startDomainsUpdate = startDomainsUpdate;
exports.setSubscription = account.setSubscription;
exports.setToken = account.setToken;
