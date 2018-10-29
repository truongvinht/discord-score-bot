// modelController.js
// controller to handle fetch database content and parse into model objects
// ================

//import
const dbConnector = require("../server/dbHandlerMySQL");
const c = require("../helper/constLoader");
const Guild = require("../model/Guild");
const Player = require("../model/Player");

const ModelController = (function () {
    var instance;
    
    const host = c.storageHost(), login = c.storageLogin(), password = c.storagePwd() ,database = c.storageDb();

    function initInstance() {

        return {
            getGuilds: function(completion) {
                const request = (error, result , fields) => {
                    
                    if (error==null) {
                        var guildList = [];

                        for (let rawData of result) {
                            let guild = new Guild.Guild(rawData.id, rawData.name, rawData.tag);
                            guildList.push(guild);
                        }

                        completion(guildList);
                    } else {
                        completion(null);
                    }
                }
                //init db connection
                dbConnector.connectTo(host, login, password, database);
                dbConnector.executeQuery('SELECT * FROM GUILD', request);
                return;
            },
            getPlayers: function(completion) {
                const request = (error, result , fields) => {
                    
                    if (error==null) {
                        var playerList = [];

                        for (let rawData of result) {
                            let player = new Player.Player(rawData.id, rawData.name, rawData.game_id,  rawData.main);
                            playerList.push(player);
                        }

                        completion(playerList);
                    } else {
                        completion(null);
                    }
                }
                //init db connection
                dbConnector.connectTo(host, login, password, database);
                dbConnector.executeQuery('SELECT * FROM PLAYER', request);
                return;
            }
        }
    }
    return {
        getInstance: function() {
            if (!instance) {
                instance = initInstance();
                
            }
            return instance;
        } 
    };
})();


// list of all guilds
const listGuilds = (completion) => {
    ModelController.getInstance().getGuilds(completion);
}
// list of all players
const listPlayers = (completion) => {
    ModelController.getInstance().getPlayers(completion);
}

// export
module.exports = {
    guilds: listGuilds,
    players: listPlayers
};