interface EventHandler {
    handle(event: any): void;
}

class EventBus {
    private handlers: EventHandler[];
    constructor() {
        this.handlers = [];
    }

    addHandler(handler: EventHandler) {
        this.handlers.push(handler);

    }

    publishEvents(event: any[]) {
        for (const handler of this.handlers) {
            handler.handle(event);
        }
    }
}

export { EventBus }
