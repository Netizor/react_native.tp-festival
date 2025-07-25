import { BASE_URL } from "../constants/config";
import type Programme from "../models/programme";

class ProgrammationApiService {
	// récupérer toute la programmation
	public getProgrammation = async (): Promise<Programme[]> => {
		// configurer la requête HTTP; par défaut requête en GET
		// sur android, le localhost est accessible à partir l'IP 10.0.2.2
		// sur ios, le localhost est accessible à partir l'IP 127.0.1.1
		try {
			const request = new Request(
				`${BASE_URL}/programme?_expand=artist&_expand=stage&_expand=day`,
			);
			const response = await fetch(request);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error fetching programmation:", error);
			throw error;
		}
	};

	// récupérer la programmation d'un artiste par son id
	public getProgrammationByArtistId = async (
		id: number,
	): Promise<Programme[]> => {
		try {
			const request = new Request(
				`${BASE_URL}/programme?artistId=${id}&_expand=artist&_expand=stage&_expand=day`,
			);
			const response = await fetch(request);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching programmation for artist ${id}:`, error);
			throw error;
		}
	};
}

export default ProgrammationApiService;
