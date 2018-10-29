// getGuilds.js
// get list of all recorded guilds
// ================

const mc = require("../controllers/modelController");
const { Command } = require('discord-akairo');


function exec(message) {

    let completion = (list) => {

        if (list == null) {
            message.reply('No guilds found');
        } else {
            var output = "";

            for (let g of list) {
                output = output + "\n" + g.toString();
            }

            message.channel.send(output);
        }
    };

    mc.guilds(completion);
}

module.exports = new Command('guilds', exec, {
    aliases: ['guilds']
});