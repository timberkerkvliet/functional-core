import { Money } from "./Money";
import { PositiveInteger } from "./PositiveInteger";
import { Failure, Result, Success } from "./Result";
import { UUID } from "./UUID";

class CartItem {
    constructor(
        public readonly productId: ProductId,
        public readonly quantity: PositiveInteger,
        public readonly price: Money
    ) {}

    public withQuantity(quantity: PositiveInteger): CartItem {
        return new CartItem(this.productId, quantity, this.price);
    }

    public withPrice(price: Money): CartItem {
        return new CartItem(this.productId, this.quantity, price);
    }
    
}

enum CartStatus {
    SHOPPING = 'shopping',
    CHECKED_OUT = 'checked-out'
}

type ProductId = string;

class CartSnapshot {
    constructor(
        public readonly id: UUID,
        public readonly items: Record<ProductId, CartItem>,
        public readonly status: CartStatus
    ) {}

    addItem(item: CartItem): CartSnapshot {
        if (item.productId in this.items) {
            const existingItem = this.items[item.productId];
            
            const newItem = existingItem.withQuantity(existingItem.quantity.add(item.quantity))
            return new CartSnapshot(
                this.id,
                {...this.items, [item.productId]: newItem},
                this.status
            );
        }
        return new CartSnapshot(
            this.id,
            {...this.items, [item.productId]: item},
            this.status
        );
    }

    removeItem(productId: ProductId): CartSnapshot {
        const { [productId]: removedItem, ...remainingItems } = this.items;
        return new CartSnapshot(this.id, remainingItems, this.status);
    }

    withStatus(status: CartStatus): CartSnapshot {
        return new CartSnapshot(this.id, this.items, status);
    }
}


class AlreadyCheckedOut extends Error {}

class Cart {
    public readonly events: any[]

    constructor(public readonly snapshot: CartSnapshot) {
        this.events = [];
    }

    addToCart(item: CartItem): Result<Cart, AlreadyCheckedOut> {
        if (this.snapshot.status == CartStatus.CHECKED_OUT) {
            return new Failure(new AlreadyCheckedOut())
        }
        return new Success(
            new Cart(this.snapshot.addItem(item))
        );
    }

    removeFromCart(productId: ProductId): Result<Cart, void> {
        return new Success(new Cart(this.snapshot.removeItem(productId)));
    }

    checkout(): Result<Cart, AlreadyCheckedOut> {
        if (this.snapshot.status == CartStatus.CHECKED_OUT) {
            return new Failure(new AlreadyCheckedOut())
        }
        return Success.unit(
            new Cart(this.snapshot.withStatus(CartStatus.CHECKED_OUT))
        );
    }
}

export { Cart, CartSnapshot, ProductId, CartItem, CartStatus, AlreadyCheckedOut }