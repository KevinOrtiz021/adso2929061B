import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import dogImg from '../assets/Rectangle_3.png';
import bgLeather from '../assets/Rectangle_2.jpg';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Email o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page login-page">
      <div className="card login-card">
        <div className="login-leather-bg" style={{ backgroundImage: `url(${bgLeather})` }}>
          <div className="login-dog-container">
            <img src={dogImg} alt="perro" className="login-dog" />
          </div>
          <div className="login-grad" />
          <div className="login-hero">
            <h2 className="login-welcome">Bienvenido</h2>
            <p className="login-sub">Inicia Sesión para continuar</p>
          </div>
          <div className="login-form">
            {error && <p className="login-err">{error}</p>}
            <form onSubmit={onSubmit}>
              <div className="login-field-group">
                <p className="login-lbl">Email</p>
                <div className="login-field">
                  <input
                    className="login-inp"
                    type="email"
                    placeholder="ejemplo@mail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="login-field-group">
                <p className="login-lbl">Contraseña</p>
                <div className="login-field">
                  <input
                    className="login-inp"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? 'Cargando...' : 'Iniciar sesión'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}