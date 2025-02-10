function sumArray(array) {
    if (!Array.isArray(array)) {
        console.error("Error: Provided argument is not an array.");
        return;
    }

    return array.reduce((acc, curr) => {
        return acc + (typeof curr === "number" ? curr : 0);
    }, 0);
}


const stringArray = ["hello", "world", "test"];
const numberArray = [1, 2, 3, 4, 5];


console.log("Sum of numbers in numberArray:", sumArray(numberArray));
console.log("Sum of elements in stringArray:", sumArray(stringArray));
