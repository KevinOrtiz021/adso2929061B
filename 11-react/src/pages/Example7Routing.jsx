import { Routes, Route, Link, useLocation, NavLink } from 'react-router-dom';
import BtnBack from '../components/BtnBack';

// Estilos para la navegación
const stylesMenu = {
    display: 'flex',
    gap: '15px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap'
};

const linkStyle = {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    transition: 'all 0.3s'
};

const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)'
};

const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
};

const infoContainer = {
    padding: '20px',
    backgroundColor: '#e3f2fd',
    color: '#333',
    borderRadius: '8px',
    marginTop: '20px'
};

// Componente de Información General
function GeneralInfo() {
    return (
        <div style={infoContainer}>
            <h3>General Information</h3>
            <p>Welcome to the Pokémon region. Here you'll find basic information about the Pokémon world.</p>
            <ul>
                <li>Regions: Kanto, Johto, Hoenn, Sinnoh</li>
                <li>Types: 18 different types</li>
                <li>Known Pokémon: 898</li>
            </ul>
        </div>
    );
}

// Componente de Lista de Pokémon
function PokemonList() {
    const pokemonList = ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu', 'Eevee'];
    return (
        <div style={{ padding: '20px', backgroundColor: '#ffffff', color: '#333', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>Starter Pokémon</h3>
            <ul style={{ fontSize: '18px' }}>
                {pokemonList.map((pokemon, index) => (
                    <li key={index} style={{ margin: '8px 0' }}>{pokemon}</li>
                ))}
            </ul>
        </div>
    );
}

// Función para obtener el ID del Pokémon según su nombre
const getPokemonId = (name) => {
    const pokemonIds = {
        'pikachu': 25,
        'charmander': 4,
        'bulbasaur': 1,
        'squirtle': 7,
        'eevee': 133
    };
    return pokemonIds[name.toLowerCase()] || 1;
};

// Componente de Detalles del Pokémon
function PokemonDetails() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pokemon = searchParams.get('name') || 'unknown';
    const pokemonId = getPokemonId(pokemon);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', color: '#333', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>Pokémon Details</h3>
            <p>Showing details for: <strong>{pokemon}</strong></p>
            
            {pokemon !== 'unknown' ? (
                <div style={{ textAlign: 'center' }}>
                    <img 
                        src={imageUrl}
                        alt={pokemon}
                        style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                        onError={(e) => {
                            e.target.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png';
                        }}
                    />
                    <p>Additional information about {pokemon}...</p>
                    <p>ID: {pokemonId}</p>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffeb3b', borderRadius: '8px' }}>
                    <h3>Unknown Pokémon</h3>
                    <p>Please select a Pokémon from the navigation menu.</p>
                </div>
            )}
        </div>
    );
}

// Componente de Navegación Interna
function InternalNavigation() {
    // Usar NavLink para saber cuál está activo
    return (
        <nav style={stylesMenu}>
            <NavLink 
                to="/example7" 
                style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
                end
            >
                Home
            </NavLink>
            <NavLink 
                to="/example7/list" 
                style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
            >
                List
            </NavLink>
            <NavLink 
                to="/example7/details?name=Pikachu" 
                style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
            >
                Pikachu
            </NavLink>
            <NavLink 
                to="/example7/details?name=Charmander" 
                style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
            >
                Charmander
            </NavLink>
        </nav>
    );
}

// Componente Principal
function Example7Routing() {
    return (
        <div style={containerStyle} className="container">
            <BtnBack />
            <h2>Example 7: React Router</h2>
            <p>Navigation between different 'pages' without reloading the browser.</p>
            <InternalNavigation />
            
            {/* Las rutas son relativas porque ya estamos dentro de /example7 */}
            <Routes>
                <Route path="/" element={<GeneralInfo />} />
                <Route path="/list" element={<PokemonList />} />
                <Route path="/details" element={<PokemonDetails />} />
            </Routes>
        </div>
    );
}

export default Example7Routing;