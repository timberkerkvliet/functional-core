interface Result<T, X> {
    map<U>(fn: (value: T) => U): Result<U, X>;
    mapRight<Y>(fn: (value: X) => Y): Result<T, Y>;
    flatMap<U, Y>(fn: (value: T) => Result<U, Y>): Result<U, X | Y>;
    permutate(): Result<X, T>;
    get(): T | X;
}

class Success<T> implements Result<T, null> {
    constructor(readonly value: T) {}

    static unit<T>(value: T): Success<T> {
        return new Success(value);
    };

    map<U>(fn: (value: T) => U): Success<U> {
        return new Success(fn(this.value));
    }

    mapRight(fn: any): Success<T> {
        return this;
    }

    flatMap<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
        return fn(this.value);
    }

    permutate(): Failure<T> {
        return Failure.unit(this.value);
    }

    get(): T {
        return this.value;
    }

    getOrThrow(): T {
        return this.value;
    }

}

class Failure<E> implements Result<null, E> {
    constructor (readonly value: E) {}

    static unit<E>(value: E): Failure<E> {
        return new Failure(value);
    };
    
    map(fn: any): Failure<E> {
        return this;
    }

    mapRight<U>(fn: (value: E) => U): Failure<U> {
        return new Failure(fn(this.value));
    }

    flatMap(fn: any): Failure<E> {
        return this;
    }

    permutate(): Success<E> {
        return Success.unit(this.value);
    }

    get(): E {
        return this.value;
    }

    getOrThrow(): null {
        // throw new Error();
        return null;
    }


}

export {Result, Success, Failure}