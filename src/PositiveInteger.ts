import { Failure, Result, Success } from "./Result";

class PositiveInteger {
    private constructor(public readonly value: number) {}

    public static create(value: number): Result<PositiveInteger, ParseError> {
        if (!Number.isInteger(value) || value <= 0) {
            return new Failure(new ParseError("Value must be a positive integer"));
        }
        return new Success(new PositiveInteger(value));
    }

    public add(value: PositiveInteger): PositiveInteger {
        return new PositiveInteger(this.value + value.value);
    }

}

export { PositiveInteger }