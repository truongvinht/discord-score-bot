// getPlayers.js
// get list of all recorded players
// ================

const mc = require("../controllers/modelController");
const { Command } = require('discord-akairo');
const Player = require("../model/Player");


function exec(message) {

    let completion = (list) => {

        if (list == null) {

            message.reply('No players found');
        } else {
            var output = "";

            for (let g of list) {
                output = output + "\n" + g.toString();
            }
            
            if (output.length >= 1000) {
                output = output.substr(0, 1000);
            }
            message.send(output);
        }
    };

    mc.players(completion);
}

module.exports = new Command('players', exec, {
    aliases: ['players']
});