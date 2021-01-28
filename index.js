class Fibonacci {
    constructor(amount) {
        if(typeof amount !== 'number') {
            const passedValueType = amount === null ? null : amount?.constructor.name
            throw new Error(`Class Fibonacci must receive number, you passed ${passedValueType}`)
        }
        if(amount === 0) throw new Error('Class Fibonacci can receive only number greater 0');

        this.sequence = this._create(amount);

        this._savedDataFromConstructor.amount = amount;
        this._savedDataFromConstructor.sequence = this.sequence;
    }
    
    getRandomRangeSum(inputNumber = this._savedDataFromConstructor.amount) {
        const fibonacciSequence = this._create(inputNumber);
        const rangeEdges =  this._generateRangeEdges(inputNumber);
        const rangeNumbers = this._createNumberRange(fibonacciSequence, rangeEdges);
        return {
            fibonacciSequence,
            rangeEdges,
            rangeNumbers,
            sum: this._addRangeNumbers(rangeNumbers)
        }
    } 

    sum(range = this._savedDataFromConstructor.sequence) {
        return this._addRangeNumbers(range)
    }

    _savedDataFromConstructor() {}

    _create(inputNumber) {
        const fibSequence = [0, 1];

        for(let i = 0; i <= inputNumber; i++) {
            if(fibSequence.length === inputNumber || inputNumber === 1) break;
            const lastAddedNumber = fibSequence[fibSequence.length - 1]
            const beforeLastAddedNumber = fibSequence[fibSequence.length - 2]
            fibSequence.push(lastAddedNumber + beforeLastAddedNumber);
        }
        return fibSequence
    }
    
    _generateRangeEdges(edges) {
        const firstRandomNumber = Math.round(Math.random() * ((edges - 1) - 0) + 0);
        const secondRandomNumber = Math.round(Math.random() * ((edges - 1) - 0) + 0);
        return [firstRandomNumber, secondRandomNumber].sort((a, b) => a - b)
    }
    
    _createNumberRange(arr, rangeEdges) {
        const arrCopy = [...arr]
        const [rangeStart, rangeEnd] = rangeEdges;
        if(rangeStart === rangeEnd) {
            return [arrCopy[rangeStart]]
        }
        return arrCopy.splice(rangeStart, rangeEnd);
    }
    
    _addRangeNumbers(rangeNumbers) {
        return rangeNumbers.reduce((acc, number) => acc += number)
    }
    static create(inputNumber) {
        if(typeof inputNumber !== 'number') {
            const passedValueType = inputNumber === null ? null : inputNumber?.constructor.name
            throw new Error(`Static method Fibonacci.create() can receive only number, you passed ${passedValueType}`)
        }

        const fibSequence = [0, 1];
        for(let i = 0; i <= inputNumber; i++) {
            if(fibSequence.length === inputNumber) break;
            const lastAddedNumber = fibSequence[fibSequence.length - 1]
            const beforeLastAddedNumber = fibSequence[fibSequence.length - 2]
            fibSequence.push(lastAddedNumber + beforeLastAddedNumber);
        }
        return fibSequence
    }
}

const randomRangeSum = new Fibonacci(6).getRandomRangeSum().sum
const randomRangeSumFullInfo = new Fibonacci(10).getRandomRangeSum()
const fibonacciSequenceSum = new Fibonacci(3).sum()
const fibonacciSequence = Fibonacci.create(5)

console.log('randomRangeSum', randomRangeSum)
console.log('randomRangeSumFullInfo', randomRangeSumFullInfo)
console.log('fibonacciSequenceSum', fibonacciSequenceSum)
console.log('fibonacciSequence', fibonacciSequence)
