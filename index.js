class Fibonacci {
    constructor(amount) {
        if(typeof amount !== 'number') {
            const passedValueType = amount === null ? null : amount?.constructor.name
            throw new Error(`Class Fibonacci must receive number, you passed ${passedValueType}`)
        }
        if(amount === 0) throw new Error('Class Fibonacci can receive only number greater 0');

        this.sequence = this._create(amount);
        this.amount = amount
    }
    
    getRandomRangeSum() {
        const fibonacciSequence = this._create(this.amount);
        const rangeEdges =  this._generateRangeEdges(this.amount);
        const rangeNumbers = this._createNumberRange(fibonacciSequence, rangeEdges);

        return {
            fibonacciSequence,
            rangeEdges,
            rangeNumbers,
            sum: this._addRangeNumbers(rangeNumbers)
        }
    } 

    sum() {
        return this._addRangeNumbers(this.sequence)
    }

    _create(amount) {
        return Fibonacci.getFibonacciSequence(amount)
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

    static getFibonacciSequence(amount) {
        const fibSequence = [0, 1];
        for(let i = 0; i <= amount; i++) {
            if(fibSequence.length === amount) break;
            const lastAddedNumber = fibSequence[fibSequence.length - 1]
            const beforeLastAddedNumber = fibSequence[fibSequence.length - 2]
            fibSequence.push(lastAddedNumber + beforeLastAddedNumber);
        }
        return fibSequence
    }

    static create(amount) {
        if(typeof amount !== 'number') {
            const passedValueType = amount === null ? null : amount?.constructor.name
            throw new Error(`Static method Fibonacci.create() can receive only number, you passed ${passedValueType}`)
        }
        return Fibonacci.getFibonacciSequence(amount)
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
console.log(new Fibonacci(9))