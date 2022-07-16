import axios from "axios"
import jobService from "../service/jobOffer.service"

const validatejob = async (jobId) => {
    const job = await jobService.findbyId(jobId)

    if (job) {
        return {
            isValid: true,
            job: job
        }
    } else {
        return {
            isValid: false,
            job: null
        }
    }
}
exports.validatejob = validatejob
