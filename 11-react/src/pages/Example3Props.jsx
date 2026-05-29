import BtnBack from '../components/BtnBack';
import CardPokemon from '../components/CardPokemon';

const pokemons = [
    {
        id: 1,
        name: 'Pikachu',
        type: 'Electric',
        power: 'Thunderbolt',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        legendary: false
    },
    {
        id: 2,
        name: 'kanton',
        type: 'legendary',
        power: 'Shadow Ball',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',
        legendary: true
    },
    {
        id: 3,
        name: 'Charmander',
        type: 'Fire',
        power: 'Ember',
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
        legendary: false
    }
];

function Example3Props() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example3Props</h2>
            <p>Pass data from parent to children (like function arguments)</p>
            
            {/* CAMBIA ESTE DIV - usa className="pokemon-container" */}
            <div className="pokemon-container">
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                            key={pokemon.id}
                            name={pokemon.name}
                            type={pokemon.type}
                            power={pokemon.power}
                            image={pokemon.image}
                            legendary={pokemon.legendary}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Example3Props;