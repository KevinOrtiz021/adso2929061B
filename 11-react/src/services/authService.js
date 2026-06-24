// ─── Auth Service — credenciales reales de larapets2929061b.sql ─────────────
// Contraseña de TODOS los usuarios: "password"
// (El hash $2y$12$7YctpfJb... corresponde a "password" en bcrypt Laravel)

const FAKE_TOKEN = 'local-pets-token';

const VALID_USERS = [
  { id:1,  email:'johnw@mail.com',      password:'password', fullname:'John Wick',        role:'Admin'    },
  { id:2,  email:'larac@mail.com',      password:'password', fullname:'Lara Croft',       role:'Customer' },
  { id:3,  email:'ismael834@mail.com',  password:'password', fullname:'Ismael Wolf',      role:'Customer' },
  { id:4,  email:'arch683@mail.com',    password:'password', fullname:'Arch Rolfson',     role:'Customer' },
  { id:5,  email:'emiliano076@mail.com',password:'password', fullname:'Emiliano Nicolas', role:'Customer' },
  { id:6,  email:'davon103@mail.com',   password:'password', fullname:'Davon Armstrong',  role:'Customer' },
  { id:7,  email:'hanna897@mail.com',   password:'password', fullname:'Hanna Hauck',      role:'Customer' },
  { id:8,  email:'hassan855@mail.com',  password:'password', fullname:'Hassan Pacocha',   role:'Customer' },
  { id:9,  email:'jerel048@mail.com',   password:'password', fullname:'Jerel Weissnat',   role:'Customer' },
  { id:10, email:'maryse149@mail.com',  password:'password', fullname:'Maryse Jones',     role:'Customer' },
];

const authService = {
  login: async (email, password) => {
    await new Promise(r => setTimeout(r, 600));
    const found = VALID_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      const err = new Error('Credenciales incorrectas');
      err.response = { data: { message: 'Email o contraseña incorrectos' } };
      throw err;
    }
    const user = { id: found.id, fullname: found.fullname, email: found.email, role: found.role };
    localStorage.setItem('token', FAKE_TOKEN);
    localStorage.setItem('user',  JSON.stringify(user));
    return { token: FAKE_TOKEN, user };
  },

  logout: async () => {
    await new Promise(r => setTimeout(r, 200));
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getStoredUser: () => {
    try { const r = localStorage.getItem('user'); return r ? JSON.parse(r) : null; }
    catch { return null; }
  },

  getToken: () => localStorage.getItem('token'),
};

export default authService;
