function sumArray(array: (number | string)[]): number {
    return array.reduce((acc: number, curr: number | string) => 
        acc + (typeof curr === 'number' ? curr : 0), 0);
}

const mixedArray = [1, 'hello', 2, 'world', 3, 4, 5];

console.log('Sum of numbers in mixedArray:', sumArray(mixedArray));
