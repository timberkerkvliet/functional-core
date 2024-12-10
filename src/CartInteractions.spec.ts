import { CartItem, CartStatus } from "./Cart";
import { CartInteractions } from "./CartInteractions"
import { CartRepository } from "./CartRepository";
import { EventBus } from "./EventBus";
import { Money } from "./Money";
import { PositiveInteger } from "./PositiveInteger";
import { Result } from "./Result";


class Thrower<T> {
    throwError(error: Error): T {
        throw error;
    }
}

function throwErrors<T>(value: Result<T, Error>): T {
    return value.mapRight(new Thrower<T>().throwError).get()
}

describe('Test Interactions', () => {
    it('should work', () => {
        const eventBus = new EventBus();
        const repository = new CartRepository();
        const interactions = new CartInteractions(eventBus, repository);

        const cartId = interactions.newCart();
        const quantity = throwErrors(PositiveInteger.create(1))
        interactions.addToCart(
            cartId,
            new CartItem(
                "apples",
                quantity,
                throwErrors(Money.create(1.5, "EUR"))
            )
        )
        interactions.checkout(cartId);
        
        expect(repository.getById(cartId).items['apples'].quantity).toBe(quantity)
        expect(repository.getById(cartId).status).toBe(CartStatus.CHECKED_OUT)
    })
})