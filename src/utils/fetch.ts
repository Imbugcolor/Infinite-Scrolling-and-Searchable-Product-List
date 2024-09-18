import axios from 'axios'

export const API_URL = 'https://dummyjson.com'

export async function getAPI<T>(endpoint: string) : Promise<T> {
    const res = await axios.get(`${API_URL}/${endpoint}`)
    return res.data;
}