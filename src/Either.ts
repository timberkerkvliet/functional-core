interface Either<T, X> {
    map<U>(fn: (value: T) => U): Either<U, X>;
    mapRight<Y>(fn: (value: X) => Y): Either<T, Y>;
    flatMap<U, Y>(fn: (value: T) => Either<U, Y>): Either<U, X | Y>;
    permutate(): Either<X, T>
    get(): T | X;
}

class Left<T> implements Either<T, null> {
    constructor(readonly value: T) {}

    static unit<T>(value: T): Left<T> {
        return new Left(value);
    };

    map<U>(fn: (value: T) => U): Left<U> {
        return new Left(fn(this.value));
    }

    mapRight(fn: any): Left<T> {
        return this;
    }

    flatMap<U, F>(fn: (value: T) => Either<U, F>): Either<U, F> {
        return fn(this.value);
    }

    permutate(): Right<T> {
        return Right.unit(this.value);
    }

    get(): T {
        return this.value;
    }
}

class Right<T> implements Either<null, T> {
    constructor (readonly value: T) {}

    static unit<T>(value: T): Right<T> {
        return new Right(value);
    };
    
    map(fn: any): Right<T> {
        return this;
    }

    mapRight<U>(fn: (value: T) => U): Right<U> {
        return new Right(fn(this.value));
    }

    flatMap(fn: any): Right<T> {
        return this;
    }

    permutate(): Left<T> {
        return Left.unit(this.value);
    }

    get(): T {
        return this.value;
    }

}

export {Either, Left, Right}