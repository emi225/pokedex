import { API_CONFIG } from '../config/api.config';

export class PokemonRepository {
    async fetchById(id) {
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POKEMON}/${id}`;
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: Failed to fetch Pokemon ${id}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Repository error fetching Pokemon ${id}:`, error);
            throw error;
        }
    }

    async fetchRange(start, end) {
        const requests = [];
        
        for (let i = start; i <= end; i++) {
            requests.push(this.fetchById(i));
        }
        
        return await Promise.allSettled(requests);
    }
}