// constLoader.js
// handle environment variable
// ==================

//load settings => auto fallback to example for heroku
var botSettings = {};
const exampleSettings = require("../template/example_settings.json");

try {
    botSettings = require("../config/settings.json");
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
    console.log('settings.json not found. Loading default example_settings.json...');
    botSettings = exampleSettings;
}

//Bot Token
var botToken = botSettings.token;
if (botToken == "") {
    // Heroku ENV token
    botToken = process.env.BOT_TOKEN;
}

// default language
var language = botSettings.lang;
if (language == "") {
    if (process.env.LANG != null && process.env.LANG != "") {
        // Heroku ENV token
        language = process.env.LANG;
    } else {
        //default language EN
        language = 'en';
    }
}

var storageHost = botSettings.storage.host;
if (storageHost == "") {
    storageHost = process.env.STORAGE_HOST;
}

var storageLogin = botSettings.storage.login;
if (storageLogin == "") {
    storageLogin = process.env.STORAGE_LOGIN;
}

var storagePwd = botSettings.storage.pwd;
if (storagePwd == "") {
    storagePwd = process.env.STORAGE_PWD;
}

var storageDb = botSettings.storage.db;
if (storageDb == "") {
    storageDb = process.env.STORAGE_DB;
}

const getBotToken = () => {
    return botToken;
}

//load prefix
const getPrefix = () => {
    return botSettings.prefix;
}

// roles for accessing special features
const getRestrictedRoles = () => {
    return botSettings.restricted;
}

const lang = () => {
    return language;
}

const getStorageHost = () => {
    return storageHost;
}

const getStorageLogin = () => {
    return storageLogin;
}

const getStoragePwd = () => {
    return storagePwd;
}

const getStorageDb = () => {
    return storageDb;
}

// author information
const author = () => {
    return exampleSettings.author;
}

const getVersion = () => {
    return exampleSettings.version;
}

// export
module.exports = {
    botToken: getBotToken,
    prefix: getPrefix,
    restriction: getRestrictedRoles,
    language: lang,
    storageHost: getStorageHost,
    storageLogin: getStorageLogin,
    storagePwd: getStoragePwd,
    storageDb: getStorageDb,
    author: author,
    version: getVersion
};