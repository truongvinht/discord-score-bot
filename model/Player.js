// Player.js
// Player model
// Generated template
// ================

class Player {
    constructor(id, name, game_id, main) {
        this.id = id;
	this.name = name;
	this.game_id = game_id;
	this.main = main;
    }
    toString() {
        return `[${this.id}, ${this.name}, ${this.game_id}, ${this.main}]`;
    }
};

// export
module.exports = {
    Player:Player
};