import axios from 'axios';

const baseRestUrl = process.env.restApiUrl;

class AnswerService {
    static async getAnswerImages(answerIds) {
        return await axios.get( `${baseRestUrl}/answer/images?answerIds=${answerIds}`);
    }

    static async getAnswerAudioFiles(answerIds) {
        return await axios.get(`${baseRestUrl}/answer/audio?answerIds=${answerIds}`);
    }
}

export default AnswerService;
