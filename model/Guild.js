// Guild.js
// Guild model
// Generated template
// ================

class Guild {
    constructor(id, name, tag) {
        this.id = id;
	this.name = name;
	this.tag = tag;
    }
    toString() {
        return `[${this.id}, ${this.name}, ${this.tag}]`;
    }
};

// export
module.exports = {
    Guild:Guild
};