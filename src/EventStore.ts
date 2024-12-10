interface EventHandler {
    handle(event: any): void;
}

class EventStore {
    private events: any[];
    private handlers: EventHandler[];
    constructor() {
        this.events = [];
        this.handlers = [];
    }

    addHandler(handler: EventHandler) {
        this.handlers.push(handler);
        for (const event of this.events) {
            handler.handle(event);
        }
    }

    getEvents(): any[] {
        return this.events;
    }

    storeEvents(events: any[]) {
        this.events = [...this.events, ...events];
        for (const handler of this.handlers) {
            for (const event of events) {
                handler.handle(event);
            }
        }
    }
}
