import dotenv from "dotenv";
import { Kafka } from "kafkajs";
import { initProducer } from "./producer";
import { kafkaMaintopics, queueTypesNames } from "../../utils/constant";

dotenv.config();

export const kafka = new Kafka({
    clientId: "node-base",
    brokers: [process.env.BASEURL as string]
});

export const init = async () => {
    try {
        const admin = kafka.admin();
        await admin.connect();
        console.log("Kafka admin is connected");
        await admin.createTopics({
            topics: kafkaMaintopics
        })
        console.log("Topics created");
        admin.disconnect();
        // await initProducer();
    } catch (error) {
        console.error("Kafka admin is not connected", error);
    }
};