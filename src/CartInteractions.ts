import { AlreadyCheckedOut, Cart, CartItem, CartSnapshot, CartStatus, ProductId } from "./Cart";
import { CartRepository } from "./CartRepository";
import { EventBus } from "./EventBus";
import { Result } from "./Result";
import { UUID } from "./UUID";

function saveAndPublishEvents(cart: Cart, repository: CartRepository, eventBus: EventBus) {
    repository.save(cart.snapshot.id, cart.snapshot)
    eventBus.publishEvents(cart.events);
}

class CartInteractions {
    constructor(
        private readonly eventBus: EventBus,
        private readonly repository: CartRepository
    ) {}

    public newCart(): UUID {
        const cartId = UUID.random();
        const cart = new Cart(new CartSnapshot(cartId, {}, CartStatus.SHOPPING))
        console.log(this.repository);
        saveAndPublishEvents(cart, this.repository, this.eventBus);
        return cartId;
    }

    public addToCart(id: UUID, item: CartItem): Result<void, AlreadyCheckedOut> {
        return new Cart(this.repository.getById(id))
            .addToCart(item)
            .map(cart => saveAndPublishEvents(cart, this.repository, this.eventBus))
    }

    public removeFromCart(id: UUID, productId: ProductId): void {
        new Cart(this.repository.getById(id))
            .removeFromCart(productId)
            .map(cart => saveAndPublishEvents(cart, this.repository, this.eventBus))
    }

    public checkout(id: UUID): Result<void, AlreadyCheckedOut> {
        return new Cart(this.repository.getById(id))
            .checkout()
            .map(cart => saveAndPublishEvents(cart, this.repository, this.eventBus))
    }

}

export { CartInteractions }