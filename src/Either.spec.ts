import { Left, Right, Either } from "./Either"

function inversePlusOne(value: number): string {
    return Left.unit(value)
        .flatMap((x) => x > 0 ? Left.unit(1 / x) : Right.unit('DIVISION_BY_ZERO'))
        .map((x) => x + 1)
        .map((x: number) => `Answer: ${x}`)
        .mapRight((x) => 'Error: ' + x)
        .get()
}

describe('Either', () => {
    it('should map left values', () => {
        const result = Left.unit(10).map((x) => x + 1).get()
        expect(result).toBe(11);
    })
    it('should map right values', () => {
        const result = Right.unit(10).mapRight((x) => x + 1).get()
        expect(result).toBe(11);
    })
    it('inversePlusOne of 10 should map to an answer', () => {
        expect(inversePlusOne(10)).toBe('Answer: 1.1');
    })
    it('inversePlusOne of 0 should map to an error', () => {
        expect(inversePlusOne(0)).toBe('Error: DIVISION_BY_ZERO');
    })
    it('should permutate left', () => {
        expect(Left.unit(10).permutate()).toEqual(Right.unit(10));
    })
    it('should permutate right', () => {
        expect(Right.unit(10).permutate()).toEqual(Left.unit(10));
    })
})