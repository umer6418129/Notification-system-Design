import { _getDashboardStats } from "../../application/services/StatsService";
import { catchResponseHelper } from "../../helpers/response";

export const getDashboardStats = async (req: any, res: any) => {
    try {
        res.json(await _getDashboardStats(req));
    } catch (error) {
        res.json(catchResponseHelper(error));
    }
}