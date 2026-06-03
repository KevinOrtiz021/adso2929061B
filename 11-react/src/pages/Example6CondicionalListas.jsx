import { useState } from "react";
import BtnBack from "../components/BtnBack";

// Estilos mejorados
const buttonStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px"
};

const boxPokemons = {
    padding: "20px",
    backgroundColor: "#fff3cd",
    border: "2px solid #ffc107",
    borderRadius: "8px",
    textAlign: "center",
    marginTop: "20px",
    color: "#856404"
};

const boxPK = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#ffffff",
    minWidth: "180px",
    textAlign: "center",
    color: "#333333",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "all 0.3s"
};

const releaseButton = {
    padding: "5px 10px",
    fontSize: "12px",
    cursor: "pointer",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px"
};

const pokemonImage = {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    marginBottom: "10px"
};

function Example6CondicionalListas() {
    // Agregué IDs a los Pokémon para las imágenes
    const [pcBox, setPcBox] = useState([
        { id: 1, name: 'pidgey', level: 3, type: 'normal/Flying', pokemonId: 16 },
        { id: 2, name: 'rattata', level: 2, type: 'normal', pokemonId: 19 },
        { id: 3, name: 'Zubat', level: 4, type: 'poison/Flying', pokemonId: 41 },
        { id: 4, name: 'Geodude', level: 5, type: 'rock/Ground', pokemonId: 74 },
    ]);

    const [typeFilter, setTypeFilter] = useState('all');
    const [showOnlyHighLevel, setShowOnlyHighLevel] = useState(false);

    const releasePokemon = (id) => {
        setPcBox(pcBox.filter(pokemon => pokemon.id !== id));
    };

    const addPokemon = () => {
        const newPokemon = [
            { name: 'Caterpie', level: 2, type: 'Bug', pokemonId: 10 },
            { name: 'Weedle', level: 4, type: 'Bug/Poison', pokemonId: 13 },
            { name: 'Pidgeot', level: 8, type: 'Normal/Flying', pokemonId: 18 },
        ];
        const random = newPokemon[Math.floor(Math.random() * newPokemon.length)];
        setPcBox([...pcBox, { 
            ...random, 
            id: Date.now(),
            pokemonId: random.pokemonId 
        }]);
    };

    const filteredPokemon = pcBox.filter(pokemon => {
        if (typeFilter !== 'all' && !pokemon.type.toLowerCase().includes(typeFilter)) {
            return false;
        }
        return true;
    });

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 6: Conditional Rendering</h2>
            <p>Show or hide UI elements based on state.</p>

            <div>
                <h3>Filters:</h3>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        style={{ padding: '5px'}}
                    >
                        <option value="all">All Types</option>
                        <option value="normal">Normal</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="bug">Bug</option>
                        <option value="rock">Rock</option>
                    </select>
                    <label>
                        <input 
                            style={{accentColor: '#72c7ee'}}
                            type="checkbox"
                            checked={showOnlyHighLevel}
                            onChange={(e) => setShowOnlyHighLevel(e.target.checked)}
                        />
                        &nbsp; Show only level 4+
                    </label>

                    <button onClick={addPokemon} style={buttonStyle}>
                        + Random Pokemon
                    </button>
                </div>
            </div>

            {filteredPokemon.length === 0 ? (
                <div style={boxPokemons}>
                    <h3>The box is empty!</h3>
                    <p>No Pokemon match the selected filters</p>
                </div>
            ) : (
                <div>
                    <p><strong>Showing {filteredPokemon.length} of {pcBox.length} Pokemon</strong></p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        {filteredPokemon.map(pokemon => (
                            <div
                                key={pokemon.id}
                                style={boxPK}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Imagen del Pokémon */}
                                <img 
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokemonId}.png`}
                                    alt={pokemon.name}
                                    style={pokemonImage}
                                    onError={(e) => {
                                        e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png';
                                        e.target.alt = 'Imagen no disponible';
                                    }}
                                />
                                <h4 style={{ margin: '5px 0', color: '#0066cc', textTransform: 'capitalize' }}>
                                    {pokemon.name}
                                </h4>
                                <p style={{ margin: '5px 0', color: '#555' }}>Level: {pokemon.level}</p>
                                <p style={{ margin: '5px 0', color: '#555' }}>Type: {pokemon.type}</p>
                                <button
                                    onClick={() => releasePokemon(pokemon.id)}
                                    style={releaseButton}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                                >
                                    Release
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Example6CondicionalListas;