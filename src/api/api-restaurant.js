import data from './DATA.json'
class ApiRestaurant {
    static async getAll() {
        const response = await data;
        return response;
    }
}
export default ApiRestaurant