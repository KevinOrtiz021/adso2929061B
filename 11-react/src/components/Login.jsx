import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import dogImg    from '../assets/Rectangle_3.png';
import bgLeather from '../assets/Rectangle_2.jpg';

// Colores del Figma (Login):
// Fondo card superior: cuero verde Rectangle_2.jpg
// Texto "Bienvenido": #FFFFFF
// Fondo formulario: #1D2227 (84%)  → ~rgba(29,34,39,0.96)
// Campos: #333131
// Labels: #A7A4A4 / #8D8D8D
// Botón gradiente: #A69459 (82%) → linear de #915921 → #F6D25A → #915921
// Borde campos: rgba(255,255,255,0.10)

export default function Login() {
  const { login } = useAuth();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Credenciales incorrectas');
    } finally { setLoading(false); }
  };

  return (
    /* Sin fondo propio — hereda el fondo de olas del body */
    <div style={s.page}>
      <div style={s.card}>

        {/* Zona superior: SOLO aquí va el cuero verde + perro */}
        <div style={{ ...s.topZone, backgroundImage: `url(${bgLeather})` }}>
          <img src={dogImg} alt="perro" style={s.dogImg} />
          <div style={s.gradient} />
          <div style={s.heroText}>
            <h2 style={s.welcome}>Bienvenido</h2>
            <p  style={s.subtitle}>Inicia Sesión para continuar</p>
          </div>
        </div>

        {/* Zona inferior: formulario oscuro */}
        <div style={s.formZone}>
          {error && <p style={s.errorMsg}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <p style={s.label}>Email</p>
            <div style={s.field}>
              <span style={s.icon}>✉️</span>
              <input
                style={s.input}
                type="email"
                placeholder="ejemplo@mail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <p style={s.label}>Contraseña</p>
            <div style={s.field}>
              <span style={s.icon}>🔒</span>
              <input
                style={s.input}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              style={{ ...s.btn, opacity: loading ? 0.75 : 1 }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

const s = {
  /* Página — transparent, hereda el fondo de olas */
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    padding: '20px 0',
  },

  /* Card completa */
  card: {
    width: 340,
    borderRadius: 24,
    overflow: 'hidden',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
  },

  /* Zona verde (cuero) — SOLO dentro del card */
  topZone: {
    position: 'relative',
    height: 300,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  dogImg: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '88%',
    height: '92%',
    objectFit: 'contain',
    objectPosition: 'top center',
    zIndex: 1,
  },
  gradient: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '55%',
    background: 'linear-gradient(to bottom, transparent, rgba(3,3,3,0.75))',
    zIndex: 2,
  },
  heroText: {
    position: 'relative',
    zIndex: 3,
    padding: '0 20px 20px',
  },
  welcome: {
    margin: 0,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 700,
    fontFamily: 'Georgia, serif',
    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
  },
  subtitle: {
    margin: '4px 0 0',
    color: '#C2C0C0',
    fontSize: 13,
  },

  /* Formulario — color #1D2227 del Figma */
  formZone: {
    background: '#1D2227',
    padding: '16px 22px 28px',
  },
  label: {
    margin: '12px 0 5px',
    color: '#A7A4A4',
    fontSize: 12,
    fontWeight: 500,
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    background: '#333131',
    borderRadius: 8,
    padding: '0 12px',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  icon:  { fontSize: 13, marginRight: 8, color: '#706D6D' },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#FFFFFF',
    fontSize: 13,
    padding: '12px 0',
    fontFamily: 'Poppins, sans-serif',
  },
  /* Botón gradiente dorado del Figma: #915921 → #F6D25A 82% → #915921 */
  btn: {
    marginTop: 22,
    width: '100%',
    padding: '13px 0',
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(90deg, #915921 0%, #F6D25A 50%, #915921 100%)',
    color: '#030303',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    boxShadow: '0 4px 18px rgba(145,89,33,0.5)',
    fontFamily: 'Poppins, sans-serif',
    transition: 'opacity 0.2s',
  },
  errorMsg: {
    color: '#ff6b6b',
    fontSize: 12,
    textAlign: 'center',
    background: 'rgba(255,0,0,0.1)',
    borderRadius: 6,
    padding: '7px',
    marginBottom: 8,
  },
};
