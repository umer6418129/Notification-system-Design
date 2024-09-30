import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import logger from '../middleware/logger';
import dotenv from "dotenv";
import { queueTypes } from '../../utils/constant';
import { JobQueueRequest } from '../interfaces/request/JobQueueRequest';
dotenv.config();

const connection = new IORedis();

// Initialize a BullMQ queue
const myQueue = new Queue(process.env.APPNAME as string, { connection });

export async function addJobs(job: JobQueueRequest) {
    try {
        let addJob = await myQueue.add(job.name || "any", job.payload, { priority: queueTypes.find(x => x.id == job?.type)?.priority || 1 });
        console.log(addJob);
        return true
    } catch (error: any) {
        logger.info("error while add the job " + error.message)
        return false
    }
}

// addJobs();
