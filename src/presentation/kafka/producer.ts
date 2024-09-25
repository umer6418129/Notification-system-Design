import { kafka } from "./index"

export const initProducer = async (body: any, type: string) => {
    try {
        const producer = kafka.producer();
        await producer.connect();
        console.log('Connected to Kafka');
        body.type = type 
        let sendFrProdu = await producer.send({
            topic: type,
            messages: [
                {
                    partition: 0, // Make sure this partition exists
                    key: body?.name || type,
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
