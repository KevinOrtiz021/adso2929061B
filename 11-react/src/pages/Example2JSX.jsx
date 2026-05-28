import BtnBack from '../components/BtnBack';
const url = "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84087b596c4b97f70a08f084ff"
function Example2JSX() {
    return(
        <div className="container">
            <BtnBack />
            <h2>Example2 JSX</h2>
            <p>Writing HTML-Like code whiting JavaScript using curly  bracs &#123; &#125; for </p>
            <div style={StyleSheet.container}>
                <h3 style={StyleSheet.title}>{pkName} (Lv1. {pkLevel})</h3>
            <img src={pkImage} alt={pkName} style={StyleSheet.img} />
            <p>Type: {pkType}</p>
            <p>Uppercase: {pkName.toUpperCase()}</p>
            
            </div>
            <img src={url} alt="Spotify Album Art" />
        </div>
    );
}
export default Example2JSX;