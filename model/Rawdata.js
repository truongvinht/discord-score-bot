// Rawdata.js
// Rawdata model
// Generated template
// ================

class Rawdata {
    constructor(id, date, guild_id, player_id, value) {
        this.id = id;
	this.date = date;
	this.guild_id = guild_id;
	this.player_id = player_id;
	this.value = value;
    }
    toString() {
        return `[${this.id}, ${this.date}, ${this.guild_id}, ${this.player_id}, ${this.value}]`;
    }
};

// export
module.exports = {
    Rawdata:Rawdata
};