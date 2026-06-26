import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import dogImg    from '../assets/Rectangle_3.png';
import bgLeather from '../assets/Rectangle_2.jpg';

export default function Login() {
  const { login } = useAuth();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password);
    } catch(err) {
      setError(err.response?.data?.message ?? 'Email o contraseña incorrectos');
    } finally { setLoading(false); }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.leatherBg}>
          <div style={s.dogContainer}>
            <img src={dogImg} alt="perro" style={s.dog}/>
          </div>
          <div style={s.grad}/>
          <div style={s.hero}>
            <h2 style={s.welcome}>Bienvenido</h2>
            <p style={s.sub}>Inicia Sesión para continuar</p>
          </div>
          <div style={s.form}>
            {error && <p style={s.err}>{error}</p>}
            <form onSubmit={onSubmit}>
              <div style={s.fieldGroup}>
                <p style={s.lbl}>Email</p>
                <div style={s.field}>
                  <input style={s.inp} type="email" placeholder="ejemplo@mail.com"
                    value={email} onChange={e=>setEmail(e.target.value)} required/>
                </div>
              </div>
              <div style={s.fieldGroup}>
                <p style={s.lbl}>Contraseña</p>
                <div style={s.field}>
                  <input style={s.inp} type="password" placeholder="Contraseña"
                    value={password} onChange={e=>setPassword(e.target.value)} required/>
                </div>
              </div>
              <button style={{...s.btn, opacity:loading?0.75:1}} type="submit" disabled={loading}>
                {loading ? 'Cargando...' : 'Iniciar sesión'}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

const s = {
  
  card: { 
    width: 380,
    borderRadius: 30,
    overflow: 'hidden',
    border: '2px solid #2d5a2d',
  },
  
  leatherBg: {
    position: 'relative',
    backgroundImage: `url(${bgLeather})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '680px',
    display: 'flex',
    flexDirection: 'column',
  },

  dogContainer: {
    position: 'relative',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '350px',
  },
  
  dog: { 
    width: '650px',
    height: '900px',
    objectFit: 'contain',
    objectPosition: 'center',
    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
    zIndex: 1,
  },
  
  grad: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    height: '55%', 
    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))', 
    zIndex: 2 
  },
  
  hero: { 
    position: 'relative', 
    zIndex: 3, 
    padding: '0 30px 10px',
    marginTop: '-30px',
    textAlign: 'center',
  },
  
  welcome: { 
    margin: 0, 
    color: '#fff', 
    aligntext: 'center',
    fontSize: 32,
    fontWeight: 700, 
    fontFamily: 'Georgia, serif', 
    textShadow: '0 2px 15px rgba(0, 0, 0, 0.9)',
    letterSpacing: '0.5px'
  },
  
  sub: { 
    margin: '4px 0 0', 
    color: '#e8e0d8',
    fontSize: 14,
    fontWeight: 400,
    textShadow: '0 1px 10px rgba(0,0,0,0.8)'
  },

  form: { 
    position: 'relative',
    zIndex: 3,
    margin: '10px 20px 25px',
    borderRadius: '16px',
  },
  
  fieldGroup: {
    marginBottom: 14
  },
  
  lbl: { 
    margin: '0 0 5px 0', 
    color: '#ffffff',
    fontSize: 13, 
    fontWeight: 500,
    letterSpacing: '0.3px'
  },
  
  field: { 
    display: 'flex', 
    alignItems: 'center', 
    background: 'rgb(65, 65, 65)',
    borderRadius: 10,
    padding: '0 14px', 
    border: '2px solid rgb(255, 255, 255)',
    transition: 'all 0.3s',
  },
  
  inp: { 
    flex: 1, 
    background: 'transparent', 
    border: 'none', 
    outline: 'none', 
    color: '#a8a098', 
    fontSize: 14, 
    padding: '12px 0', 
    fontFamily: 'inherit',
    '&::placeholder': {
      color: 'rgba(255,255,255,0.3)',
    }
    ,
  },
  
  btn: { 
    marginTop: 18, 
    width: '100%', 
    padding: '14px 0', 
    borderRadius: 10, 
    border: 'none', 
    background: 'linear-gradient(90deg, #8B6914 0%, #D4A843 50%, #8B6914 100%)',
    color: '#000', 
    fontWeight: 700, 
    fontSize: 15, 
    cursor: 'pointer', 
    transition: 'all 0.3s',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 20px rgba(212, 168, 67, 0.3)',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 6px 25px rgba(212, 168, 67, 0.5)'
    },
    '&:active': {
      transform: 'scale(0.98)'
    }
  },
  
  err: { 
    color: '#ff6b6b', 
    fontSize: 12, 
    textAlign: 'center', 
    background: 'rgba(255,0,0,0.15)', 
    borderRadius: 8, 
    padding: '8px', 
    marginBottom: 12 
  },
};