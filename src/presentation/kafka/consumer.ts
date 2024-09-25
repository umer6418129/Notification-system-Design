import { processJob } from "../../helpers/jobProcess";
import { queueTypes, queueTypesNames } from "../../utils/constant";
import { kafka } from "./index"

const consumer = kafka.consumer({ groupId: 'general-group' })

export const initConsumer = async () => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topics: [queueTypesNames.notifyOtpEmail], fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
              try {
                if (message.value) {
                  const job = JSON.parse(message.value.toString());
                  console.log(job);
          
                  let success = await processJob(job);
                  if (success) {
                    await consumer.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
                  } else {
                    console.log(`Job failed: ${job.username}`);
                  }
          
                  // Send a heartbeat after processing each message
                  await heartbeat();
                } else {
                  console.error(`Received a message with null value in topic: ${topic}`);
                }
              } catch (error) {
                console.error("Error while processing message", error);
              }
            },
          });          
    } catch (error) {
        console.log("error on consumer" + error);

    }
}