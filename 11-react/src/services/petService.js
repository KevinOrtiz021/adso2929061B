// ─── Pet Service — API Laravel ────────────────────────────────────────────────
import apiClient from './apiClient';

const STORAGE_KEY  = 'pets_larapets_local';
const IMAGE_BASE   = 'http://127.0.0.1:8000/storage/pets/';

// ── Datos iniciales ────────────────────────────────────────────────────────────
const INITIAL_PETS = [
  { id:1,  name:'Rocko52',    kind:'Perro',  weight:4,   age:6,  bread:'Creole',            location:'Villamaria Caldas',          description:'He is a calm dog.',        active:1, adopted:0, image:'1775691021_Captura de pantalla 2026-03-26 200619.png' },
  { id:2,  name:'Tiger',      kind:'Cat',    weight:2,   age:8,  bread:'Orange',            location:'Villamaria Caldas',          description:'He is a calm sleepy cat.', active:1, adopted:1, image:null },
  { id:3,  name:'Juan',       kind:'Horse',  weight:16,  age:2,  bread:'Friesian',          location:'Llanitos Villamaria Caldas', description:'Beautiful calm horse.',    active:1, adopted:0, image:null },
  { id:4,  name:'Roberto',    kind:'Pig',    weight:5,   age:1,  bread:'Mini Pig',          location:'Buenaventura Valle',        description:'Mini pig that eats a lot.',active:1, adopted:1, image:null },
  { id:5,  name:'Chilindrina', kind:'Cow',   weight:15,  age:3,  bread:'Angus',             location:'Pereira Risaralda',         description:'Quiet cow.',               active:1, adopted:0, image:null },
];

// ── Helpers localStorage ───────────────────────────────────────────────────────
function localLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PETS));
    return INITIAL_PETS;
  } catch { return INITIAL_PETS; }
}
function localSave(pets) { localStorage.setItem(STORAGE_KEY, JSON.stringify(pets)); }
function nextId() { const p = localLoad(); return p.length ? Math.max(...p.map(x=>x.id))+1 : 1; }

// ── Normaliza pet ──────────────────────────────────────────────────────────────
function normalize(pet) {
  // Construir la URL de la imagen si es un nombre de archivo
  let imageUrl = null;
  if (pet.image) {
    if (pet.image.startsWith('http') || pet.image.startsWith('data:')) {
      imageUrl = pet.image;
    } else if (pet.image !== 'no-image.png' && pet.image !== 'no-photo.png') {
      imageUrl = `${IMAGE_BASE}${pet.image}`;
    }
  }
  
  return {
    ...pet,
    breed:    pet.breed ?? pet.bread ?? '',
    bread:    pet.bread ?? pet.breed ?? '',
    imageUrl: imageUrl,
  };
}

// ── API calls ──────────────────────────────────────────────────────────────────
const petService = {

  getAll: async () => {
    try {
      const r = await apiClient.get('/pets/list');
      const pets = r.data.pets ?? r.data ?? [];
      return Array.isArray(pets) ? pets.map(normalize) : [];
    } catch {
      return localLoad().map(normalize);
    }
  },

  getOne: async (id) => {
    try {
      const r = await apiClient.get(`/pets/show/${id}`);
      return normalize(r.data.pet ?? r.data);
    } catch {
      const pet = localLoad().find(p => p.id === Number(id));
      if (!pet) throw new Error('Mascota no encontrada');
      return normalize(pet);
    }
  },

  create: async (petData) => {
    try {
      const r = await apiClient.post('/pets/store', petData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return normalize(r.data.pet ?? r.data);
    } catch (error) {
      console.error('Error creating pet:', error);
      return null;
    }
  },

  update: async (id, petData) => {
    try {
      const r = await apiClient.post(`/pets/edit/${id}`, petData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return normalize(r.data.pet ?? r.data);
    } catch (error) {
      console.error('Error updating pet:', error);
      return null;
    }
  },

  remove: async (id) => {
    try {
      const r = await apiClient.delete(`/pets/delete/${id}`);
      return r.data;
    } catch {
      const pets = localLoad().filter(p => p.id !== Number(id));
      localSave(pets);
      return { success: true };
    }
  },
};

export default petService;