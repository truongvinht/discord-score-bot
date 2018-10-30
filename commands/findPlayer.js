// findPlayer.js
// get player with target name
// ================

const mc = require("../controllers/modelController");
const { Command } = require('discord-akairo');


function exec(message) {

    let messageArray = message.content.split(" ");

    if (messageArray.length == 2) {
        
        let completion = (result) => {
            if (result==null) {
                message.channel.send("No player found for " + messageArray[1]);
            } else {
                var output = "";

                for (let g of result) {
                    output = output + "\n" + g.toString();
                }

                message.channel.send(output);
            }
        };

        mc.findPlayerByName(messageArray[1],completion);
    } else {
        message.channel.send("Command invalid [/player PLAYERNAME]");
    }
}

module.exports = new Command('player', exec, {
    aliases: ['player']
});