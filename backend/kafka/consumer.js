const { Kafka } = require("kafkajs");

class Consumer {
  constructor() {
    this.groupId = "test-group"; 
    this.kafka = new Kafka({
      clientId: "test-streaming",
      brokers: ["localhost:9092"],
    });
  }
  async consume() {
    const consumer = this.kafka.consumer({ groupId: this.groupId });

    try {
      await consumer.connect();
      await consumer.subscribe({
        topic: "test-streaming",
        fromBeginning: true,
      });
      return consumer;
    } catch (error) {
      console.error("Error connecting to Kafka:", error);
      throw error; 
    }
  }
}

module.exports = Consumer;
