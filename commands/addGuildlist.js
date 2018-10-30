// addGuildlist.js
// add a new guild list (map for player and guild)
// ================

const mc = require("../controllers/modelController");
const { Command } = require('discord-akairo');
const Guildlist = require("../model/Guildlist");


function exec(message) {

    let messageArray = message.content.split(" ");

    if (messageArray.length == 3) {
        
        let completion = (list,error) => {
            
        };
    
        mc.addGuildlist(messageArray[1],messageArray[2], completion);
    } else {
        message.channel.send("Command invalid [/add GUILD PLAYER]");
    }
}

module.exports = new Command('add', exec, {
    aliases: ['add']
});