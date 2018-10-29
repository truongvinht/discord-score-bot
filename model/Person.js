// Person.js
// Person model
// Generated template
// ================

class Person {
    constructor(id, birth_date, first_name, last_name, location) {
        this.id = id;
	this.birth_date = birth_date;
	this.first_name = first_name;
	this.last_name = last_name;
	this.location = location;
    }
    toString() {
        return `[${this.id}, ${this.birth_date}, ${this.first_name}, ${this.last_name}, ${this.location}]`;
    }
};

// export
module.exports = {
    Person:Person
};