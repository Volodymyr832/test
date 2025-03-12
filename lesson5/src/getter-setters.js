const user = {
    _firstName: "John",
    _lastName: "Doe",
    _age: 30,

    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    },

    set fullName(name) {
        const [firstName, lastName] = name.split(" ");
        this._firstName = firstName || this._firstName;
        this._lastName = lastName || this._lastName;
    },

    get age() {
        return this._age;
    },

    set age(value) {
        if (typeof value === "number" && value > 0) {
            this._age = value;
        } else {
            console.error("Error: Age must be a positive number.");
        }
    },

    increaseAge(years) {
        this._age += years;
        return this._age;
    }
};


console.log("Full name:", user.fullName);
user.fullName = "Jane Smith";
console.log("Updated full name:", user.fullName);

console.log("Age:", user.age);
user.age = 35;
console.log("Updated age:", user.age);

console.log("Increased age:", user.increaseAge(5));
