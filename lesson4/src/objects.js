const complexObject = {
    name: "Example Object",
    properties: {
        type: "complex",
        version: 1.0
    },
    items: [1, 2, 3, 4, 5],
    printDetails() {
        console.log("Name:", this.name);
        console.log("Type:", this.properties.type);
        console.log("Version:", this.properties.version);
        console.log("Items:", this.items);
    }
};

complexObject.printDetails();
