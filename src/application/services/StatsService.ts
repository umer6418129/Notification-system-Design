import { get, getCount } from "../../data-access/repositories/jobQueueRepository";
import { catchResponseHelper, responseHelper } from "../../helpers/response";
import { jobStatsInterface } from "../../presentation/interfaces/general/notificationLogsStats";
import { queueStatus } from "../../utils/constant";

export const _getDashboardStats = async (req: any) => {
    try {
        let inQueueLogs : number = await getCount({ userId: req.session.currentUserId, status: queueStatus.InQueue });
        let failedLogs : number = await getCount({ userId: req.session.currentUserId, status: queueStatus.Failed });
        let inProcessLogs : number = await getCount({ userId: req.session.currentUserId, status: queueStatus.InProcess });
        let completedLogs : number = await getCount({ userId: req.session.currentUserId, status: queueStatus.Completed });
        let jobStats : jobStatsInterface = {
            inQueue : inQueueLogs,
            inProcess : inProcessLogs,
            failed : failedLogs,
            completed : completedLogs
        }
        return responseHelper(1, jobStats);
    } catch (error) {
        let response = catchResponseHelper(error);
        return response;
    }
}