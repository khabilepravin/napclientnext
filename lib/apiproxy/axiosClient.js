import axios from 'axios';

const baseGraphEndpoint = process.env.NEXT_PUBLIC_GRAPH_API_ENDPOINT;

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