class Fibonacci {
    constructor(amount) {
        if(typeof amount !== 'number') {
            const passedValueType = amount === null ? null : amount?.constructor.name
            throw new Error(`Class Fibonacci must receive number, you passed ${passedValueType}`)
        }
        if(amount === 0) throw new Error('Class Fibonacci can receive only number greater 0');

        this.sequence = this._create(Math.round(amount));
        this._amount = Math.round(amount);
    }
    
    getRandomRangeSum() {
        const fibonacciSequence = this._create(this._amount);
        const rangeEdges =  this._generateRangeEdges(this._amount);
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
    
    _generateRangeEdges(upperEdge) {
        const firstRandomNumber = Math.round(Math.random() * ((upperEdge - 0) - 0) + 0);
        const secondRandomNumber = Math.round(Math.random() * ((upperEdge - 0) - 0) + 0);
        return [firstRandomNumber, secondRandomNumber].sort((a, b) => a - b)
    }
    
    _createNumberRange(arr, rangeEdges) {
        const arrCopy = [...arr]
        const [rangeStart, rangeEnd] = rangeEdges;
        if(rangeStart === rangeEnd + 1) {
            return [arrCopy[rangeStart]]
        }
        const result = arrCopy.slice(rangeStart, rangeEnd + 1);
        return result
    }
    
    _addRangeNumbers(rangeNumbers) {
        return rangeNumbers.reduce((acc, number) => {
            return acc += number
        }, 0)
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

const randomRangeSum = new Fibonacci(5).getRandomRangeSum().sum //! this field is solution of my task
const randomRangeSumFullInfo = new Fibonacci(7).getRandomRangeSum() // return object with extra fields for more informativeness  
const fibonacciSequenceSum = new Fibonacci(3).sum() // method for getting sum of Fibonacci sequence
const fibonacciSequence = Fibonacci.create(5) // this static method return just array with Fibonacci sequence
const fibonacciInstance = new Fibonacci(10) // instance of Fibonacci class

console.log('randomRangeSum', randomRangeSum)
console.log('randomRangeSumFullInfo', randomRangeSumFullInfo)
console.log('fibonacciSequenceSum', fibonacciSequenceSum)
console.log('fibonacciSequence', fibonacciSequence)


//! exceptions
const invalidTypes = [true, '', {}, [], null, undefined, () => {}, 123456789n, Symbol()];
const getRandomInvalidArgument = () => invalidTypes[Math.round(Math.random() * ((invalidTypes.length - 1) - 0) + 0)];

try {
    new Fibonacci(getRandomInvalidArgument())
} catch (error) {
    console.error(error)
}

try {
    Fibonacci.create(getRandomInvalidArgument())
} catch (error) {
    console.error(error)
}