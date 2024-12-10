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

    publishEvents(events: any[]) {
        for (const handler of this.handlers) {
            for (const event of events) {
                handler.handle(event);
            }
        }
    }
}

export { EventBus }
