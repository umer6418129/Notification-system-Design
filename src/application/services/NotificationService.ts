import { catchResponseHelper, responseHelper } from "../../helpers/response"
import { initProducer } from "../../presentation/kafka/producer"
import { kafkaMaintopicsNames, queueTypesNames } from "../../utils/constant"

export const createNotification = async (req:any) => {
    try {
        let createTransOne = await initProducer({type : 2},kafkaMaintopicsNames.transaction,0);
        let createTransTwo = await initProducer({type : 2},kafkaMaintopicsNames.transaction,1);
        let createTransThree = await initProducer({type : 2},kafkaMaintopicsNames.transaction,2);
        let createTransFour = await initProducer({type : 2},kafkaMaintopicsNames.transaction,3);
        return responseHelper(1,{message : "JOb Created"});
    } catch (error) {
        return catchResponseHelper(error)
    }
} 