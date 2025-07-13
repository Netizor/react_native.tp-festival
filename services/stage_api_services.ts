import { BASE_URL } from "../constants/config";
import type Stage from "../models/stage";
import type StageType from "../models/stage_type";

class StageApiService {
	public async getTypeStage(): Promise<StageType[]> {
		try {
			const request = new Request(`${BASE_URL}/stage_types`);
			const response = await fetch(request);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching stage types:", error);
			throw error;
		}
	}

	public async getStageByType(idType: number): Promise<Stage[]> {
		try {
			const request = new Request(`${BASE_URL}/stages?stage_typeId=${idType}`);
			const response = await fetch(request);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching stages for type ${idType}:`, error);
			throw error;
		}
	}
}

export default StageApiService;
