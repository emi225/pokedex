import { useState, useMemo } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { PokemonCard } from './components/PokemonCard';
import { PokemonModal } from './components/PokemonModal';
import { Sidebar } from './components/Sidebar';
import { API_CONFIG } from './config/api.config';
import './styles/App.css';

function App() {
    const [selectedGeneration, setSelectedGeneration] = useState('KANTO');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedRegionRange, setSelectedRegionRange] = useState(['KANTO', 'JOHTO', 'HOENN', 'SINNOH']);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    
    const { data: pokemon, isLoading, error } = usePokemon(selectedGeneration);

    const filteredPokemon = useMemo(() => {
        if (!pokemon) return [];
        
        return pokemon.filter(poke => {
            if (selectedGeneration === 'ALL' && selectedRegionRange.length > 0) {
                const inSelectedRegion = selectedRegionRange.some(regionKey => {
                    const region = API_CONFIG.GENERATIONS[regionKey];
                    return poke.id >= region.start && poke.id <= region.end;
                });
                if (!inSelectedRegion) return false;
            }

            if (selectedTypes.length > 0) {
                const hasAllTypes = selectedTypes.every(type => poke.types.includes(type));
                if (!hasAllTypes) return false;
            }
            
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchesName = poke.name.toLowerCase().includes(query);
                const matchesId = poke.id.toString().includes(query);
                
                if (!matchesName && !matchesId) {
                    return false;
                }
            }
            
            return true;
        });
    }, [pokemon, selectedGeneration, selectedRegionRange, selectedTypes, searchQuery]);

    const handleTypeToggle = (type) => {
        setSelectedTypes(prev => 
            prev.includes(type) 
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleRegionRangeToggle = (regionKey) => {
        setSelectedRegionRange(prev =>
            prev.includes(regionKey)
                ? prev.filter(k => k !== regionKey)
                : [...prev, regionKey]
        );
    };

    if (isLoading || !pokemon) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                <p>Loading Pokédex...</p>
                {selectedGeneration === 'ALL' && (
                    <p className="loading-subtitle">Loading 493 Pokémon, this may take a moment...</p>
                )}
            </div>
        );
    }

    if (error) {
        return <div className="error">Error loading Pokédex: {error.message}</div>;
    }

    const getRegionDisplayName = () => {
        if (selectedGeneration === 'ALL') {
            if (selectedRegionRange.length === 4) {
                return 'All Regions';
            }
            return selectedRegionRange.map(key => API_CONFIG.GENERATIONS[key].name).join(', ');
        }
        return API_CONFIG.GENERATIONS[selectedGeneration].name;
    };

    return (
        <div className="app">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                selectedGeneration={selectedGeneration}
                onGenerationChange={setSelectedGeneration}
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedRegionRange={selectedRegionRange}
                onRegionRangeChange={handleRegionRangeToggle}
            />

            {selectedPokemon && (
                <PokemonModal 
                    pokemon={selectedPokemon} 
                    onClose={() => setSelectedPokemon(null)} 
                />
            )}

            <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
                ☰
            </button>

            <h1>Pokédex</h1>

            <div className="region-info">
                <h2>{getRegionDisplayName()}</h2>
                <p>
                    Showing {filteredPokemon.length} of {pokemon.length} Pokémon
                </p>
            </div>

            <div className="pokemon-grid">
                {filteredPokemon.map(poke => (
                    <PokemonCard 
                        key={poke.id} 
                        pokemon={poke}
                        onClick={setSelectedPokemon}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;