import { API_CONFIG } from '../config/api.config';
import '../styles/Sidebar.css';

export function Sidebar({ 
    isOpen,
    onClose,
    selectedGeneration, 
    onGenerationChange,
    selectedTypes,
    onTypeToggle,
    searchQuery,
    onSearchChange,
    selectedRegionRange,
    onRegionRangeChange
}) {
    const pokemonTypes = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice',
        'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
        'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    const regionList = [
        { key: 'ALL', name: 'All Regions', range: '#1-#493' },
        ...Object.entries(API_CONFIG.GENERATIONS).map(([key, gen]) => ({
            key,
            name: gen.name,
            range: `#${gen.start}-#${gen.end}`
        }))
    ];

    return (
        <>
            <div 
                className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />

            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Filters</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="sidebar-content">
                    <div className="filter-group">
                        <label>Region</label>
                        <div className="region-list">
                            {regionList.map(region => (
                                <button
                                    key={region.key}
                                    className={`region-btn ${selectedGeneration === region.key ? 'active' : ''}`}
                                    onClick={() => {
                                        onGenerationChange(region.key);
                                        onClose();
                                    }}
                                >
                                    {region.name}
                                    <span className="region-range">{region.range}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedGeneration === 'ALL' && (
                        <div className="filter-group">
                            <label>Filter by Region</label>
                            <div className="region-checkboxes">
                                {Object.entries(API_CONFIG.GENERATIONS).map(([key, gen]) => (
                                    <label key={key} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedRegionRange.includes(key)}
                                            onChange={() => onRegionRangeChange(key)}
                                        />
                                        <span>{gen.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="filter-group">
                        <label>Search</label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Name or #"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}</label>
                        <div className="type-grid">
                            {pokemonTypes.map(type => (
                                <button
                                    key={type}
                                    className={`type-btn type-${type} ${selectedTypes.includes(type) ? 'active' : ''}`}
                                    onClick={() => onTypeToggle(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {(selectedTypes.length > 0 || searchQuery) && (
                        <button 
                            className="clear-filters-btn"
                            onClick={() => {
                                selectedTypes.forEach(type => onTypeToggle(type));
                                onSearchChange('');
                            }}
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}