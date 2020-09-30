import axios from 'axios';

const baseRestUrl = process.env.restApiUrl;

class UserTestService {
    static async getTestProgressPercentage(userTestId) {
        return await axios.get(`${baseRestUrl}/usertest/progress/${userTestId}`);
    }
}

export default UserTestService;