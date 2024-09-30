import { Partitioners } from "kafkajs";
import { kafka } from "./index"

export const initProducer = async (body: any, topic: string , partition? : number) => {
    try {
        const producer = kafka.producer(
            {
                createPartitioner : Partitioners.LegacyPartitioner,
            }
        );
        await producer.connect();
        console.log('Connected to Kafka');
        body.topic = topic 
        let sendFrProdu = await producer.send({
            topic: topic,
            messages: [
                {
                    partition: partition,
                    key: body?.name || topic,
                    value: JSON.stringify(body)
                }
            ]
        });

        console.log('Message sent successfully:', sendFrProdu);
        await producer.disconnect();
        return sendFrProdu;
    } catch (error) {
        console.log("Error on producer", error);
        return false;
    }
}
