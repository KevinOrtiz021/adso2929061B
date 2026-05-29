import './CardPokemon.css';

function CardPokemon({name, type, power, image, legendary=false}) {
    const typeColor = {
        'electric': '#FFEA00',
        'fire': '#F08030',
        'water': '#6890F0',
        'grass': '#78C850',
        'grass/poison': '#78C850',
        'psychic': '#F85888',
        'legendary': '#dbb6ee',
        'normal': '#A8A878',
    }
    
    return (
        <div 
            className='pokemon-card'
            style={{ backgroundColor: typeColor[type?.toLowerCase()] || '#ccc' }}
        >
            {image && <img src={image} alt={name} className='pokemon-image' />}
            <h3 className='pokemon-name'>{name}</h3>
            <p className='pokemon-type'>Type: {type}</p>
            <p className='pokemon-power'>Power: {power}</p>
            {legendary && <div className='legendary-badge'>⭐ Legendary</div>}
        </div>
    );
}

export default CardPokemon;