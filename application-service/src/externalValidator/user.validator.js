import axios from "axios"
import userService from '../service/user.service';

const validateUser = async (userId) => {
    const user = await userService.findbyId(userId)
    if (user.status === "success") {
        return {
            isValid: true,
            user: user
        }
    } else {
        return {
            isValid: false,
            user: null
        }
    }
}
exports.validateUser = validateUser
