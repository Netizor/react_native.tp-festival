import { BASE_URL } from "../constants/config";
import type ArtistCountry from "../models/artist_country";

class ArtistCountryApiService {
	// récupérer les pays d'un artiste par son id
	public getCountriesByArtistId = async (
		id: number,
	): Promise<ArtistCountry[]> => {
		try {
			const request = new Request(
				`${BASE_URL}/artists_countries?artistId=${id}&_expand=country&_expand=artist`,
			);
			const response = await fetch(request);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching countries for artist ${id}:`, error);
			throw error;
		}
	};
}

export default ArtistCountryApiService;
