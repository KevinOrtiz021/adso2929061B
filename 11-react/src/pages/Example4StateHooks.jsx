// src/pages/Example4StateHooks.jsx
import React, { useState, useEffect, useRef } from 'react';
import BtnBack from '../components/BtnBack';

const Example4StateHooks = () => {
  const [caughtPokemon, setCaughtPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catchCounter, setCatchCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [capturedPokemonData, setCapturedPokemonData] = useState(null);

  const hasMounted = useRef(false);

  const pokemonList = [
    { id: 1, name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' },
    { id: 2, name: 'Ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png' },
    { id: 3, name: 'Venusaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png' },
    { id: 4, name: 'Charmander', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' },
    { id: 5, name: 'Charmeleon', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png' },
    { id: 6, name: 'Charizard', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
    { id: 7, name: 'Squirtle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png' },
    { id: 8, name: 'Wartortle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png' },
    { id: 9, name: 'Blastoise', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png' },
    { id: 10, name: 'Caterpie', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png' },
    { id: 11, name: 'Metapod', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png' },
    { id: 12, name: 'Butterfree', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png' },
    { id: 13, name: 'Weedle', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png' },
    { id: 14, name: 'Kakuna', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png' },
    { id: 15, name: 'Beedrill', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png' },
    { id: 16, name: 'Pidgey', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png' },
    { id: 17, name: 'Pidgeotto', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png' },
    { id: 18, name: 'Pidgeot', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png' },
    { id: 19, name: 'Rattata', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png' },
    { id: 20, name: 'Raticate', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png' }
  ];

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
    }
  }, []);

  const capturePokemon = async () => {
    if (loading) return;

    setLoading(true);
    setShowResult(false);
    setMessage('Buscando Pokémon salvaje...');

    await new Promise(resolve => setTimeout(resolve, 2000));

    // Verificar si ya completó todos
    if (caughtPokemon.length === pokemonList.length) {
      setMessage('¡Ya capturaste todos los Pokémon! Reinicia el juego');
      setLoading(false);
      return;
    }

    // Seleccionar Pokémon aleatorio de los NO capturados
    const uncapturedPokemon = pokemonList.filter(
      p => !caughtPokemon.some(caught => caught.id === p.id)
    );

    const randomIndex = Math.floor(Math.random() * uncapturedPokemon.length);
    const capturedPokemon = uncapturedPokemon[randomIndex];

    setCapturedPokemonData(capturedPokemon);
    setShowResult(true);
    setMessage(`¡${capturedPokemon.name} apareció!`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Capturar el Pokémon
    const updatedCaught = [...caughtPokemon, capturedPokemon];
    setCaughtPokemon(updatedCaught);
    setCatchCounter(updatedCaught.length);
    setHistory([capturedPokemon.name, ...history].slice(0, 5));
    setMessage(`¡${capturedPokemon.name} capturado!`);
    
    setLoading(false);
  };

  const resetGame = () => {
    setCaughtPokemon([]);
    setCatchCounter(0);
    setHistory([]);
    setMessage('');
    setShowResult(false);
    setCapturedPokemonData(null);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'rgba(0, 0, 0, 0.85)',
      padding: '15px'
    }}>
      <BtnBack />
      
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto',
        padding: '15px'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h1 style={{ 
            color: '#fff',
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '6px'
          }}>
            Pokédex
          </h1>
          <p style={{ color: '#aaa', fontSize: '13px' }}>
            {catchCounter} / {pokemonList.length} capturados
          </p>
          <progress 
            value={catchCounter} 
            max={pokemonList.length} 
            style={{ 
              width: '100%', 
              height: '6px',
              borderRadius: '3px'
            }} 
          />
        </div>

        {/* Área de captura */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '20px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.2)',
          minHeight: '320px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {!showResult && !loading && caughtPokemon.length < pokemonList.length && (
            <>
              <div style={{
                fontSize: '64px',
                marginBottom: '20px',
                opacity: 0.5
              }}>
                ❓
              </div>
              <p style={{ color: '#aaa', marginBottom: '20px' }}>
                ¿Qué Pokémon aparecerá?
              </p>
              <button 
                onClick={capturePokemon}
                style={{
                  background: '#ef5350',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Buscar Pokémon
              </button>
            </>
          )}

          {!showResult && !loading && caughtPokemon.length === pokemonList.length && (
            <>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px'
              }}>
                🏆
              </div>
              <p style={{ color: '#4caf50', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                ¡Completaste la Pokédex!
              </p>
              <button 
                onClick={resetGame}
                style={{
                  background: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Reiniciar juego
              </button>
            </>
          )}

          {loading && !showResult && (
            <div>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(255,255,255,0.3)',
                borderTop: '3px solid #fff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 15px'
              }} />
              <p style={{ color: '#fff' }}>{message}</p>
            </div>
          )}

          {showResult && capturedPokemonData && (
            <div>
              <img 
                src={capturedPokemonData.image} 
                alt={capturedPokemonData.name}
                style={{ 
                  width: '140px', 
                  height: '140px',
                  marginBottom: '10px'
                }}
              />
              <h2 style={{ 
                fontSize: '24px',
                color: '#fff',
                marginBottom: '10px'
              }}>
                {capturedPokemonData.name}
              </h2>
              <p style={{ color: '#4caf50' }}>{message}</p>
              {!loading && (
                <button 
                  onClick={() => {
                    setShowResult(false);
                    setCapturedPokemonData(null);
                  }}
                  style={{
                    background: '#2196f3',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 24px',
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    marginTop: '15px'
                  }}
                >
                  Continuar capturando
                </button>
              )}
            </div>
          )}
        </div>

        {/* Últimas capturas */}
        {history.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '15px',
            marginBottom: '20px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Últimas capturas
            </h3>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {history.map((pokemon, index) => (
                <span key={index} style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  color: '#ddd'
                }}>
                  {pokemon}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Colección */}
        {caughtPokemon.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '15px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h3 style={{
              fontSize: '14px',
              color: '#ccc',
              marginBottom: '12px',
              fontWeight: '500'
            }}>
              Mi colección ({caughtPokemon.length})
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
              gap: '10px'
            }}>
              {caughtPokemon.map((pokemon) => (
                <div key={pokemon.id} style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center'
                }}>
                  <img 
                    src={pokemon.image} 
                    alt={pokemon.name}
                    style={{ 
                      width: '60px', 
                      height: '60px',
                      marginBottom: '6px'
                    }}
                  />
                  <div style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#bbb'
                  }}>
                    {pokemon.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Example4StateHooks;