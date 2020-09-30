import axios from 'axios';

const baseRestUrl = process.env.restApiUrl;

class PracticeTestService {
    static async postUserTestTextRecord(userTestRecord) {
        return await axios.post(`${baseRestUrl}/practicetest`, userTestRecord);
    }

}

export default PracticeTestService;