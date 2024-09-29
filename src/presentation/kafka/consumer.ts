import { processJob } from "../../helpers/jobProcess";
import { kafkaMaintopicsNames, queueTypes, queueTypesNames } from "../../utils/constant";
import logger from "../middleware/logger";
import { kafka } from "./index"

const consumer = kafka.consumer({ groupId: 'general-group' })
const consumerPrmotional = kafka.consumer({ groupId: 'promotional-messages-group' })

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
export const initPrmotionalMeaageConsumer = async () => {
    try {
        await consumerPrmotional.connect();
        await consumerPrmotional.subscribe({ topics: [kafkaMaintopicsNames.promotional], fromBeginning: true });
        await consumerPrmotional.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
              try {
                if (message.value) {
                  const job = JSON.parse(message.value.toString());
                  logger.info(`Consuming job ${JSON.stringify(job)} of partition ${partition}, topic: ${topic}`);
                  let success = await processJob(job);
                  if (success) {
                    await consumerPrmotional.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
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
export const initTransactionalMesaageConsumerOne = async () => {
    try {
      const consumerTransactionalOne = kafka.consumer({ groupId: 'Transactional-messages-group', })
        await consumerTransactionalOne.connect();
        await consumerTransactionalOne.subscribe({ topics: [kafkaMaintopicsNames.transaction], fromBeginning: true });
        await consumerTransactionalOne.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
              try {
                if (message.value) {
                  const job = JSON.parse(message.value.toString());
                  console.log(job);
                  logger.info(`Consuming job ${JSON.stringify(job)} of partition ${partition}, topic: ${topic}`);
                  let success = await processJob(job);
                  if (success) {
                    await consumerTransactionalOne.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
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
export const initTransactionalMesaageConsumerTwo = async () => {
    try {
      const consumerTransactionalTwo = kafka.consumer({ groupId: 'Transactional-messages-group', })
        await consumerTransactionalTwo.connect();
        await consumerTransactionalTwo.subscribe({ topics: [kafkaMaintopicsNames.transaction], fromBeginning: true });
        await consumerTransactionalTwo.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
              try {
                if (message.value) {
                  const job = JSON.parse(message.value.toString());
                  console.log(job);
                  logger.info(`Consuming job ${JSON.stringify(job)} of partition ${partition}, topic: ${topic}`);
                  let success = await processJob(job);
                  if (success) {
                    await consumerTransactionalTwo.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
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
export const initTransactionalMesaageConsumerThree = async () => {
    try {
      const consumerTransactionalThree = kafka.consumer({ groupId: 'Transactional-messages-group', })
        await consumerTransactionalThree.connect();
        await consumerTransactionalThree.subscribe({ topics: [kafkaMaintopicsNames.transaction], fromBeginning: true });
        await consumerTransactionalThree.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
              try {
                if (message.value) {
                  const job = JSON.parse(message.value.toString());
                  console.log(job);
                  logger.info(`Consuming job ${JSON.stringify(job)} of partition ${partition}, topic: ${topic}`);
                  let success = await processJob(job);
                  if (success) {
                    await consumerTransactionalThree.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
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
export const initTransactionalMesaageConsumerFour = async () => {
    try {
      const consumerTransactionalFour = kafka.consumer({ groupId: 'Transactional-messages-group', })
        await consumerTransactionalFour.connect();
        await consumerTransactionalFour.subscribe({ topics: [kafkaMaintopicsNames.transaction], fromBeginning: true });
        await consumerTransactionalFour.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
              try {
                if (message.value) {
                  const job = JSON.parse(message.value.toString());
                  console.log(job);
                  logger.info(`Consuming job ${JSON.stringify(job)} of partition ${partition}, topic: ${topic}`);
                  let success = await processJob(job);
                  if (success) {
                    await consumerTransactionalFour.commitOffsets([{ topic, partition, offset: (parseInt(message.offset) + 1).toString() }]);
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
