// Guildlist.js
// Guildlist model
// Generated template
// ================

class Guildlist {
    constructor(id, guild_id, player_id, status) {
        this.id = id;
	this.guild_id = guild_id;
	this.player_id = player_id;
	this.status = status;
    }
    toString() {
        return `[${this.id}, ${this.guild_id}, ${this.player_id}, ${this.status}]`;
    }
};

// export
module.exports = {
    Guildlist:Guildlist
};