import { BASE_URL } from "../constants/config";
import type ArtistSocial from "../models/artist_social";

class ArtistSocialApiService {
	// récupérer les réseaux sociaux d'un artiste par son id
	public getSocialsByArtistId = async (id: number): Promise<ArtistSocial[]> => {
		try {
			const request = new Request(
				`${BASE_URL}/artists_socials?artistId=${id}&_expand=artist&_expand=social`,
			);
			const response = await fetch(request);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Error fetching socials for artist ${id}:`, error);
			throw error;
		}
	};
}

export default ArtistSocialApiService;
