const stringArray = ["Hello", "New", "Task"];
stringArray.forEach((str) => console.log("String:", str));

const numberArray = [1, 2, 3, 4, 5];
const doubledNumbers = numberArray.map((num) => num * 2);
console.log("Doubled numbers:", doubledNumbers);

const booleanArray = [true, false, true, false];
booleanArray.forEach((bool) => console.log("Boolean value:", bool));

const mixedArray = [42, "Text", true, null];
mixedArray.forEach((item) => console.log("Mixed type:", item));
