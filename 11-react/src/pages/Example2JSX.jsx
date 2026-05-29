import BtnBack from '../components/BtnBack';

const spotifyUrl = "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84087b596c4b97f70a08f084ff";

function Example2JSX() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 2: JSX</h2>
            <p>Writing HTML-Like code within JavaScript using curly braces {'{ }'} for JavaScript expressions</p>
            
            <div style={{
                textAlign: 'center',
                marginTop: '30px',
                padding: '20px',
                border: '2px solid #1DB954',
                borderRadius: '10px',
                backgroundColor: '#f9f9f9'
            }}>
                <h3 style={{ color: '#1DB954' }}>🎵 Spotify Album Art</h3>
                <img 
                    src={spotifyUrl} 
                    alt="Spotify Album Art" 
                    style={{
                        width: '300px',
                        height: '300px',
                        borderRadius: '10px',
                        marginTop: '10px'
                    }}
                />
                <p style={{ marginTop: '15px' }}>
                    URL de la imagen: {spotifyUrl}
                </p>
            </div>
        </div>
    );
}

export default Example2JSX;