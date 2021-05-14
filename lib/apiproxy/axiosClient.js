import axios from 'axios';

const baseGraphEndpoint = process.env.graphApiPath;

class axiosClient{
    static async PostQuery(query, variables)
    {
        let response = await axios.post(baseGraphEndpoint, 
        {
            query: query,
            variables: variables
        },{
            headers: {
                'Content-Type':'application/json'
            }
        });

        return response.data;
    }
}

export default axiosClient;