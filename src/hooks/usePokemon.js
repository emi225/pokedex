import { useQuery } from '@tanstack/react-query';
import { PokemonService } from '../services/pokemonService';
import { PokemonModel } from '../models/PokemonModel';
import { API_CONFIG } from '../config/api.config';

const pokemonService = new PokemonService();

export function usePokemon(generation = 'KANTO') {
    const query = useQuery({
        queryKey: ['pokemon', generation],
        queryFn: async () => {
            
            if (generation === 'ALL') {
                const allGenerations = Object.keys(API_CONFIG.GENERATIONS);
                const allPokemon = [];
                
                for (const gen of allGenerations) {
                    const genData = await pokemonService.getPokemonByGeneration(gen);
                    allPokemon.push(...genData);
                }
                
                return allPokemon.sort((a, b) => a.id - b.id);
            }
            
            return pokemonService.getPokemonByGeneration(generation);
        },
        staleTime: Infinity,
        gcTime: Infinity,
    });
    
    return {
        ...query,
        data: query.data?.map(pokemon => new PokemonModel(pokemon))
    };
}