import Arena from 'bull-arena';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import logger from '../middleware/logger';
import dotenv from 'dotenv';
import { exportBullQueueNames, exportBullQueueNamesArr } from '../../utils/constant'; // Assuming this is an array of queue names

dotenv.config();

// Create a Redis connection
export const monitorQueue = async () => {
  try {
    const connection = new IORedis();

    // Create queues dynamically
    const queues = exportBullQueueNamesArr.map((queueName: string) => {
      return new Queue(queueName, { connection });
    });

    // Create Arena queue configurations dynamically
    const arenaQueues = exportBullQueueNamesArr.map((queueName: any, index: number) => {
      return {
        type: 'bullmq',
        name: queueName,
        hostId: 'BullMQ Queue',
        queue: queues[index], // Provide the actual Queue instance
      };
    });

    // Initialize Arena with the dynamic queue configurations
    const arena = Arena(
      {
        BullMQ: Queue, // Queue constructor
        queues: arenaQueues,
      },
      {
        disableListen: true,
      }
    );

    // Start the Arena server on port 5000
    arena.listen(5000, () => {
      console.log('Arena dashboard is running at http://localhost:5000');
    });
  } catch (error: any) {
    logger.info('Error while monitoring BullMQ queues: ' + error.message);
  }
};
