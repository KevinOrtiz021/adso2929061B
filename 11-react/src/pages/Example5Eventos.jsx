import { useState } from "react";
import BtnBack from "../components/BtnBack";

const eventContainer = {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    marginTop: "20px"
};

const titleH3 = {
    color: "#333",
    marginTop: "20px",
    marginBottom: "10px"
};

const btnsClick = {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
};

const buttonStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px"
};

const chosePokemon = {
    padding: "10px",
    backgroundColor: "#2da2f59d",
    borderRadius: "4px",
    marginTop: "10px",
    textAlign: "center" 
};

const rangeStyle = {
    width: "100%",
    margin: "10px 0"
};

const outPut = {
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "white",
    borderRadius: "4px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold"
};

function Example5Eventos() {
    const [chosenPokemon, setChosenPokemon] = useState(null);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const [inputRange, setInputRange] = useState(50);

    //Event Click
    const handleChoice = (name) => {
        setChosenPokemon(name);
    };
    //Event Hover: MouseEnter || MouseOver
    const handleMouseEnter = (name) => {
        setHoveredPokemon(name);
    };
    // Event MouseLeave
    const handleMouseLeave = () => {
        setHoveredPokemon(null);
    };
    // Event Input
    const hadleInput = (e) => {
        setInputRange(e.target.value);
    };

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 5: Event Handling</h2>
            <p>Respond to user interactions (click, hover, input, submit).</p>
            <div style={eventContainer}>
                {/* Click - - - - - - - - - - -*/}
                <h3 style={titleH3}>Click Event:</h3>
                <div style={btnsClick}>
                    <button
                        onClick={() => handleChoice("Bulbasaur")}  
                        style={buttonStyle}
                    >
                        <span style={{ zoom: 2.4 }}>🌱</span> Bulbasaur
                    </button>
                    <button
                        onClick={() => handleChoice("Charmander")}  
                        style={buttonStyle}
                    >
                        <span style={{ zoom: 2.4 }}>🔥</span> Charmander
                    </button>
                    <button onClick={() => handleChoice("Squirtle")} style={buttonStyle}> 
                        <span style={{ zoom: 2.4 }}>💧</span> Squirtle
                    </button>
                </div>
                {chosenPokemon ? (
                    <div style={chosePokemon}>You choose {chosenPokemon}</div>
                ) : (
                    <div style={chosePokemon}>Please choose a pokemon!</div>
                )}
                {/* MouseEnter - - - - - - - - - - -*/}
                <h3 style={titleH3}>MouseEnter/MouseLeave Event:</h3>
                <div style={btnsClick}>
                    <button 
                        onMouseEnter={() => handleMouseEnter('Pikachu')}
                        onMouseLeave={handleMouseLeave}
                        style={buttonStyle}
                    >
                        Hover here! 
                        <img style={{zoom: 0.4}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" />
                    </button>
                    <button 
                        onMouseEnter={() => handleMouseEnter('Evee')}
                        onMouseLeave={handleMouseLeave}
                        style={buttonStyle}
                    >
                        Hover here too! 
                        <img style={{zoom: 0.4}} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png" alt="" />
                    </button>
                </div>
                {hoveredPokemon && (
                    <div style={chosePokemon}>You are viewing {hoveredPokemon}!</div>
                )}
                {/* Input - - - - - - - - - - -*/}
                <h3 style={titleH3}>Input Event:</h3>
                <input
                    style={rangeStyle}
                    onInput={hadleInput}
                    type="range"
                    min="0"
                    max="100"
                />
                <span style={{display: "block", textAlign: "center"}}>power:</span>
                {inputRange && (
                    <div style={outPut}>{inputRange}</div>
                )}
            </div>
        </div>
    );
}

export default Example5Eventos;