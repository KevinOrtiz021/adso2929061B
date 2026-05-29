import BtnBack from '../components/BtnBack';

// Component tanjiro
function Tanjiro() {
    return (
        <div style={{border: '3px solid #392328',
            padding: '1rem',
            backgroundColor: '#57A380'}}>
                <h5>Name: Tanjiro</h5>
                <h5>Arma: Espadas Nichirin</h5>
                <h5>Respiracion: Danza Fluida</h5>
            </div>
    );
}

// Component Zenitsu
function Zenitsu() {
    return (
        <div style={{border: '3px solid #f2cf59',
            padding: '1rem',
            backgroundColor: '#E18349'}}>
                <h5>Name: Zenitsu</h5>
                <h5>Arma: Espadas Nichirin</h5>
                <h5>Respiracion: Trueno Ardiente</h5>
            </div>
    );
}

// Component Inosuke
function Inosuke() {
    return (
        <div style={{border: '3px solid #904660',
            padding: '1rem',
            backgroundColor: '#c5b79a',}}>
                <h5>Name: Inosuke</h5>
                <h5>Arma: Espadas Nichirin</h5>
                <h5>Respiracion: Embestida de cerdo</h5>
            </div>
    );
}

function Example1Components() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example1Components</h2>
            <p>Example of simple components in React</p>
            <div style={{
                display: 'flex', 
                gap: '1.5rem',        
                marginTop: '1.4rem',  
                justifyContent: 'center', 
                alignItems: 'center', 
                flexWrap: 'wrap'
            }}>
                <Tanjiro />
                <Zenitsu />
                <Inosuke />
            </div>
        </div>
    );
}
export default Example1Components;