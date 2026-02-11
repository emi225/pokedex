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
        const batchSize = 20;  
        const delay = 100;//ms   
        const allResults = [];

        for (let i = start; i <= end; i += batchSize) {
            const batchEnd = Math.min(i + batchSize - 1, end);
            const batchPromises = [];

            for (let j = i; j <= batchEnd; j++) {
                batchPromises.push(this.fetchById(j));
            }

            const batchResults = await Promise.allSettled(batchPromises);
            allResults.push(...batchResults);

            
            if (batchEnd < end) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        return allResults;
    }
}