// app.js
// main class
// ================

//import
const c = require("./helper/constLoader");

// const player = require("./model/player");

// let p = new player.Player(1,'demo', '123456789',true);

// console.log(p.name);

const { AkairoClient } = require('discord-akairo');

const client = new AkairoClient({
    ownerID: '9876543210',
    prefix: c.prefix(),
    commandDirectory: './commands/'
});

client.login(c.botToken()).then(() => {
    console.log('Started up!');
});
