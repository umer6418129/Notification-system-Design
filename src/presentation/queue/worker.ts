import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';
import logger from '../middleware/logger';

dotenv.config();

// Create a Redis connection with maxRetriesPerRequest set to null
export const runningQueue = async () => {
  try {
    const connection = new IORedis({
      maxRetriesPerRequest: null, // Required by BullMQ to avoid retrying failed requests
    });

    // Create a worker to process jobs from the queue
    const worker = new Worker(
      process.env.APPNAME as string,
      async (job) => {
        console.log(`Processing job: ${job.id}, data: ${JSON.stringify(job)}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      {
        connection,
        concurrency: 5, // Max 5 jobs processed at the same time
        limiter: {
          max: 1,        // Maximum number of jobs per interval
          duration: 1000 // Interval duration in milliseconds (1 second)
        },
      }
    );

    worker.on('completed', (job) => {
      console.log(`Job ${job.id} completed successfully.`);
      logger.info(`Job ${job.id} completed successfully.`);
    });

    worker.on('failed', (job, error) => {
      console.log(`Job ${job?.id || ''} failed with error: ${error.message}`);
      logger.info(`Job ${job?.id || ''} failed with error: ${error.message}`)
    });
  } catch (error: any) {
    logger.info('Error while processing the queue: ' + error.message);
  }
};
