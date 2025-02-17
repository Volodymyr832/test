const sumArrayArrow = (array: (number | string)[]): number => {
    if (!Array.isArray(array)) {
        console.error('Error: Provided argument is not an array.');
        return 0;
    }

    return array.reduce((acc: number, curr: number | string) => acc + (typeof curr === 'number' ? curr : 0), 0);
};

const stringArray: string[] = ['hello', 'world', 'test'];
const numberArray: number[] = [1, 2, 3, 4, 5];

console.log('Sum of numbers in numberArray:', sumArrayArrow(numberArray));
console.log('Sum of elements in stringArray:', sumArrayArrow(stringArray));
