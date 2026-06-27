import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';
import Menu from './components/Menu';
import Example1Components       from './pages/Example1Components';
import Example2JSX              from './pages/Example2JSX';
import Example3Props            from './pages/Example3Props';
import Example4StateHooks       from './pages/Example4StateHooks';
import Example5Eventos          from './pages/Example5Eventos';
import Example6CondicionalListas from './pages/Example6CondicionalListas';
import Example7Routing          from './pages/Example7Routing';
import Example8DataFetching     from './pages/Example8DataFetching';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddPet from './components/AddPet';
import EditPet from './components/EditPet';
import ShowPet from './components/ShowPet';

// Componente para proteger rutas
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AppWrapper() {
  const location = useLocation();
  const isPets = location.pathname === '/challenge' || 
                 location.pathname === '/login' || 
                 location.pathname === '/dashboard' ||
                 location.pathname.startsWith('/challenge/');

  return (
    <div className={isPets ? 'pets-page' : 'App'}>
      <Routes>
        {/* Rutas del menú original */}
        <Route path="/"          element={<Menu />} />
        <Route path="/example1"  element={<Example1Components />} />
        <Route path="/example2"  element={<Example2JSX />} />
        <Route path="/example3"  element={<Example3Props />} />
        <Route path="/example4"  element={<Example4StateHooks />} />
        <Route path="/example5"  element={<Example5Eventos />} />
        <Route path="/example6"  element={<Example6CondicionalListas />} />
        <Route path="/example7/*" element={<Example7Routing />} />
        <Route path="/example8"  element={<Example8DataFetching />} />
        
        {/* Rutas del proyecto de mascotas */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/challenge" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/challenge/add" element={
          <PrivateRoute>
            <AddPet />
          </PrivateRoute>
        } />
        <Route path="/challenge/edit/:id" element={
          <PrivateRoute>
            <EditPet />
          </PrivateRoute>
        } />
        <Route path="/challenge/show/:id" element={
          <PrivateRoute>
            <ShowPet />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;