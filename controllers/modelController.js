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
            },
            addGuildlist: function(guild_id, player_id, completion) {
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
                dbConnector.executeParamQuery(`INSERT INTO GUILDLIST(guild_id,player_id) VALUES(?,?)`,[guild_id,player_id], request);
                return;
            },
            find: function(table, key, value, completion) {
                 const request = (error, result , fields) => {
                    
                     if (error==null) {
                        completion(result);
                    } else {
                        completion(null);
                     }
                }
                //init db connection
                dbConnector.connectTo(host, login, password, database);
                dbConnector.executeQuery(`SELECT * FROM ${table} WHERE ${key} LIKE '%${value}%'`, request);
                return;
            },
            findMultiple: function(tables, keys, values, completion) {
            //     const request = (error, result , fields) => {
                   
            //         if (error==null) {
            //            completion(result);
            //        } else {
            //            completion(null);
            //         }
            //    }
            //    //init db connection
            //    dbConnector.connectTo(host, login, password, database);
            //    dbConnector.executeQuery(`SELECT * FROM ${table} WHERE ${key} LIKE '%${value}%'`, request);
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

// add a new guildlist object
const addGuildlist = (guild, player, completion) => {

    const requestGuildAndPlayer = (result) => {

        if (result==null) {
            completion(null,null);
        } else {
            if (result.length > 1) {
                // too many results
                completion(null, "Too many results");
            } else {
                //ModelController.getInstance().addGuildlist(guild_id, player_id,completion);
            }
        }

    };

    //findGuildByName(guild, requestGuild);

}

// find guild by name
const findGuildByName = (name, completion) => {

    const requestHandler = (result) => {
        // convert details to data model list
        var guildList = [];

        for (let rawData of result) {
            let guild = new Guild.Guild(rawData.id, rawData.name, rawData.tag);
            guildList.push(guild);
        }

        completion(guildList)
    };

    ModelController.getInstance().find("GUILD", "name", name, requestHandler);
}

// find guild by name
const findPlayerByName = (name, completion) => {

    const requestHandler = (result) => {
        // convert details to data model list
        var list = [];

        for (let rawData of result) {
            let player = new Player.Player(rawData.id, rawData.name, rawData.game_id,  rawData.main);
            list.push(player);
        }

        completion(list)
    };

    ModelController.getInstance().find("PLAYER", "name", name, requestHandler);
}

// export
module.exports = {
    guilds: listGuilds,
    players: listPlayers,
    addGuildlist: addGuildlist,
    findGuildByName: findGuildByName,
    findPlayerByName: findPlayerByName
};