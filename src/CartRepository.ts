import { CartSnapshot } from "./Cart";
import { UUID } from "./UUID";

class CartRepository {
    private readonly snapshots: Record<string, CartSnapshot>;

    constructor() {
        this.snapshots = {};
    }

    getById(id: UUID): CartSnapshot {
        return this.snapshots[id.toString()];
    }

    save(id: UUID, snapshot: CartSnapshot) {
        this.snapshots[id.toString()] = snapshot;
    }
}

export { CartRepository }