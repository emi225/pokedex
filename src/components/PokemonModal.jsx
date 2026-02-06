import { useEffect, useRef } from 'react';
import '../styles/PokemonModal.css';

export function PokemonModal({ pokemon, onClose }) {
    const audioRef = useRef(null);

    useEffect(() => {
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

const playCry = () => {
    if (pokemon.cry && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => {
            console.error('Audio play failed:', err);
        });
    }
};

const getStatColor = (statValue) => {
    if (statValue <= 60) return '#FF5959';
    if (statValue <= 90) return '#FAE078'; 
    return '#A7DB8D';          
};

    return (
        <>
            <div className="modal-backdrop" onClick={onClose} />
            
            <div className="pokemon-modal">
                <button className="modal-close" onClick={onClose}>✕</button>
                
                <div className="modal-content">
                    {/* Left side - Stats */}
                    <div className="modal-stats">
                        <div className="modal-header">
                            <h2>{pokemon.name}</h2>
                            <span className="modal-id">{pokemon.getFormattedId()}</span>
                        </div>

                        <div className="modal-types">
                            {pokemon.types.map(type => (
                                <span key={type} className={`type type-${type}`}>
                                    {type}
                                </span>
                            ))}
                        </div>

                        <div className="stats-list">
                            <h3>Base Stats</h3>
                            {pokemon.stats.map(stat => (
                                <div key={stat.stat.name} className="stat-row">
                                    <span className="stat-name">
                                        {stat.stat.name.replace('-', ' ')}
                                    </span>
                                    <div className="stat-bar-container">
                                        <div 
                                            className="stat-bar"
                                            style={{
                                                width: `${(stat.base_stat / 255) * 100}%`,
                                                backgroundColor: getStatColor(stat.base_stat)
                                            }}
                                        />
                                    </div>
                                    <span className="stat-value">{stat.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - HD Sprite */}
                    <div className="modal-sprite">
                        <div className="sprite-container" onClick={playCry}>
                            <img 
                                src={pokemon.hdSprite} 
                                alt={pokemon.name}
                                className="hd-sprite"
                            />
                            {pokemon.cry && (
                                <div className="cry-hint">🔊 Click to hear cry</div>
                            )}
                        </div>
                        {pokemon.cry && (
                            <audio ref={audioRef} src={pokemon.cry} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}