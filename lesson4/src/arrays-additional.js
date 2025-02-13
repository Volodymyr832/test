const numbers = [1, 2, 3, 4, 5];

const filteredNumbers = numbers.filter((num) => num > 3);
console.log("Filtered (bigger than 3):", filteredNumbers);

const firstLargeNumber = numbers.find((num) => num > 2);
console.log("First number bigger than 2:", firstLargeNumber);

const sortedNumbers = [...numbers].sort((a, b) => b - a); // Create a copy to avoid mutation
console.log("Sorted in descending order:", sortedNumbers);

const extraNumbers = [6, 7, 8];
const combinedArray = numbers.concat(extraNumbers);
console.log("Combined array:", combinedArray);

const includesFour = numbers.includes(4);
console.log("Includes 4:", includesFour);

const joinedNumbers = numbers.join(", ");
console.log("Joined numbers:", joinedNumbers);

numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

const squaredNumbers = numbers.map((num) => num ** 2);
console.log("Squared numbers:", squaredNumbers);

const spreadCombined = [...numbers, ...extraNumbers];
console.log("Spread combined array:", spreadCombined);

//
