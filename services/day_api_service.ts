import { BASE_URL } from "../constants/config";
import Day from "../models/day";

class DayApiService {


    public async getDayById(dayId: number) : Promise<Day | undefined> {
        try {
            const request = new Request(
                `${BASE_URL}/days?id=${dayId}`
            );

            const response = await fetch(request);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            return (data as Day[]).shift();
        } catch (error) {
            console.error(`Error fetching day with id ${dayId}:`, error);
            throw error;
        }
    }
}


export default DayApiService;
