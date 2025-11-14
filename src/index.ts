// src/index.ts

type Message = {
  type: string;
  payload: any;
};

class SimpleESB {
  private handlers: { [type: string]: ((msg: Message) => void)[] } = {};

  subscribe(type: string, handler: (msg: Message) => void) {
    if (!this.handlers[type]) this.handlers[type] = [];
    this.handlers[type].push(handler);
  }

  publish(msg: Message) {
    const subscribers = this.handlers[msg.type] || [];
    subscribers.forEach(handler => handler(msg));
    }
}

const bus = new SimpleESB();

bus.subscribe("orderA", (msg) => {
  console.log("Service A receivedA:", msg.payload);
});

bus.subscribe("orderA", (msg) => {
  console.log("Service B processing orderA:", msg.payload);
});

bus.subscribe("orderB", (msg) => {
    console.log("Service C received orderB:", msg.payload);
})

bus.subscribe("orderB", (msg) => {
    console.log("Service D processing orderB", msg.payload)
})

bus.publish({ type: "orderA", payload: { id: 1, item: "Laptop" } });
bus.publish({ type: "orderA", payload: { id: 2, item: "Phone" } });
bus.publish({ type: "orderB", payload: { id: 3, item: "Agenda" } })
bus.publish({ type: "orderB", payload: { id: 4, item: "Réunion" } })
