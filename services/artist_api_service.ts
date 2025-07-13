import { BASE_URL } from "../constants/config";
import type Artist from "../models/artist";

class ArtistApiService {
	// récupérer un artiste par son slug
	public getArtistBySlug = async (
		slug: string,
	): Promise<Artist | undefined> => {
		try {
			const request = new Request(
				`${BASE_URL}/artists?slug=${slug}&_expand=music_type`,
			);
			const response = await fetch(request);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return (data as Artist[]).shift();
		} catch (error) {
			console.error(`Error fetching artist with slug ${slug}:`, error);
			throw error;
		}
	};

	public async getArtistById(artistId: number) : Promise<Artist | undefined> {
		try {
			const request = new Request(
				`${BASE_URL}/artists?id=${artistId}&_expand=music_type`
			);

			const response = await fetch(request);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			return (data as Artist[]).shift();
		} catch (error) {
			console.error(`Error fetching artist with id ${artistId}:`, error);
			throw error;
		}
	}
}

export default ArtistApiService;
