import axios from 'axios';

const baseRestUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

class UserTestService {
    static async getTestProgressPercentage(userTestId) {
        return await axios.get(`${baseRestUrl}/usertest/progress/${userTestId}`);
    }
}

export default UserTestService;