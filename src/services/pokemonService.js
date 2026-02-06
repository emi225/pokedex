import { API_CONFIG } from '../config/api.config';
import { PokemonRepository } from '../repositories/pokemonRepository';

export class PokemonService {
    constructor() {
        this.repository = new PokemonRepository();
    }

    async getPokemon(id) {
        try {
            const rawData = await this.repository.fetchById(id);
            return this.transformPokemonData(rawData);
        } catch (error) {
            console.error(`Service error: Failed to get Pokemon ${id}`, error);
            return null;
        }
    }

    async getPokemonByGeneration(generationKey) {
        const generation = API_CONFIG.GENERATIONS[generationKey];
        
        if (!generation) {
            throw new Error(`Invalid generation: ${generationKey}`);
        }
        
        const results = await this.repository.fetchRange(generation.start, generation.end);
        
        return results
            .filter(result => result.status === 'fulfilled')
            .map(result => this.transformPokemonData(result.value))
            .filter(pokemon => pokemon !== null)
            .sort((a, b) => a.id - b.id);
    }

    transformPokemonData(rawData) {
        return {
            id: rawData.id,
            name: rawData.name,
            sprites: {
                front_default: rawData.sprites.front_default,
                other: {
                    home: {
                        front_default: rawData.sprites.other?.home?.front_default
                    }
                }
            },
            types: rawData.types,
            stats: rawData.stats,
            cries: rawData.cries
        };
    }
}