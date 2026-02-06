import '../styles/PokemonCard.css';

export function PokemonCard({ pokemon, onClick }) {
    return (
        <div className="pokemon-card" data-id={pokemon.id} onClick={() => onClick(pokemon)}>
            <div className="card-image">
                <img src={pokemon.sprite} alt={pokemon.name} loading="lazy" />
            </div>
            <div className="card-header">
                <h3 className="card-name">{pokemon.name}</h3>
                <span className="card-id">{pokemon.getFormattedId()}</span>
            </div>
            <div className="card-types">
                {pokemon.types.map(type => (
                    <span key={type} className={`type type-${type}`}>
                        {type}
                    </span>
                ))}
            </div>
        </div>
    );
}