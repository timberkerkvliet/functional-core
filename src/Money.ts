import { Failure, Result, Success } from "./Result";

class Money {
    private constructor(
        private readonly amount: number,
        private readonly currency: string
    ) {}

    public static create(amount: number, currency: string): Result<Money, ParseError> {
        if (amount < 0) {
            return new Failure(new Error("Amount must be a non-negative value."));
        }
        if (!currency || typeof currency !== "string" || currency.length !== 3) {
            return new Failure(new Error("Currency must be a valid 3-character ISO code."));
        }
        return new Success(new Money(amount, currency.toUpperCase()));
    }
}

export { Money }