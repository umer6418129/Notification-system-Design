import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import dotenv from 'dotenv';
import logger from '../middleware/logger';
import { exportBullQueueNames, kafkaMaintopicsNames, queueStatus } from '../../utils/constant';
import { processJob } from '../../helpers/jobProcess';
import { initProducer } from '../kafka/producer';
import { update } from '../../data-access/repositories/jobQueueRepository';

dotenv.config();

export const runningQueue = async () => {
  try {
    const connection = new IORedis({
      maxRetriesPerRequest: null,
    });
    const worker = new Worker(
      exportBullQueueNames.Email,
      async (job) => {
        // const updateLog = await initProducer(
        //   {
        //     GUID: job.data.GUID,
        //     name: job.data.name,
        //     payload: job.data.payload,
        //     type: job.data.type,
        //     status: queueStatus.InProcess
        //   },
        //   kafkaMaintopicsNames.logPrecessedJobQueue
        // )
        const logObj: any = {
          status: queueStatus.InProcess,
        };
        const insertLog = await update({GUID : job.data.GUID}, logObj);
        console.log(`Processing job: ${job.id}, data: ${JSON.stringify(job.data)}`);
        let process = await processJob(job.data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      {
        connection,
        concurrency: 5,
        limiter: {
          max: 1,
          duration: 1000
        },
      }
    );

    worker.on('completed', async (job) => {
      try {
        // const updateLog = await initProducer(
        //   {
        //     GUID: job.data.GUID,
        //     name: job.data.name,
        //     payload: job.data.payload,
        //     type: job.data.type,
        //     status: queueStatus.Completed
        //   },
        //   kafkaMaintopicsNames.logPrecessedJobQueue
        // );
        const logObj: any = {
          status: queueStatus.Completed,
        };
        const insertLog = await update({GUID : job.data.GUID}, logObj);
        logger.info(`Job ${job.data.GUID} completed successfully.`);
      } catch (error : any) {
        logger.error(`Error sending completion log for job ${job.data.GUID}: ${error.message}`);
      }
    });
    
    worker.on('failed', async (job, error) => {
      try {
        // const updateLog = await initProducer(
        //   {
        //     GUID: job?.data.GUID,
        //     name: job?.data.GUID,
        //     payload: job?.data.GUID,
        //     type: job?.data.type,
        //     status: queueStatus.Failed
        //   },
        //   kafkaMaintopicsNames.logPrecessedJobQueue
        // );
        const logObj: any = {
          status: queueStatus.Failed,
        };
        const insertLog = await update({GUID : job?.data.GUID}, logObj);
        logger.info(`Job ${job?.id || job?.data.GUID} failed with error: ${error.message}`);
      } catch (err : any) {
        logger.error(`Error sending failure log for job ${job?.id || job?.data.GUID}: ${err.message}`);
      }
    });
    
  } catch (error: any) {
    logger.info('Error while processing the queue: ' + error.message);
  }
};
