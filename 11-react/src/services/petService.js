// ─── Pet Service — API Laravel con fallback a localStorage ───────────────────
// Intenta conectar a http://127.0.0.1:8000/api
// Si falla (Laravel no corre), usa localStorage automáticamente

import apiClient from './apiClient';

const STORAGE_KEY  = 'pets_larapets_local';
const IMAGE_BASE   = 'http://127.0.0.1:8000/storage/pets/';

// ── Datos iniciales del dump SQL (se usan si no hay API) ──────────────────────
const INITIAL_PETS = [
  { id:1,  name:'Rocko52',    kind:'Perro',  weight:4,   age:6,  bread:'Creole',            location:'Villamaria Caldas',          description:'He is a calm dog.',        active:1, adopted:0, image:null },
  { id:2,  name:'Tiger',      kind:'Cat',    weight:2,   age:8,  bread:'Orange',            location:'Villamaria Caldas',          description:'He is a calm sleepy cat.', active:1, adopted:1, image:null },
  { id:3,  name:'Juan',       kind:'Horse',  weight:16,  age:2,  bread:'Friesian',          location:'Llanitos Villamaria Caldas', description:'Beautiful calm horse.',    active:1, adopted:0, image:null },
  { id:4,  name:'Roberto',    kind:'Pig',    weight:5,   age:1,  bread:'Mini Pig',          location:'Buenaventura Valle',        description:'Mini pig that eats a lot.',active:1, adopted:1, image:null },
  { id:5,  name:'Chilindrina', kind:'Cow',   weight:15,  age:3,  bread:'Angus',             location:'Pereira Risaralda',         description:'Quiet cow.',               active:1, adopted:0, image:null },
  { id:6,  name:'Luna',       kind:'Dog',    weight:8,   age:3,  bread:'Golden Retriever',  location:'Manizales Caldas',          description:'Energetic dog.',           active:1, adopted:0, image:null },
  { id:7,  name:'Michi',      kind:'Cat',    weight:3,   age:2,  bread:'Siamese',           location:'Pereira Risaralda',         description:'Curious cat.',             active:1, adopted:0, image:null },
  { id:8,  name:'Pepe',       kind:'Bird',   weight:1,   age:5,  bread:'African Grey',      location:'Armenia Quindío',           description:'Can talk and whistle.',    active:1, adopted:0, image:null },
  { id:9,  name:'Copito',     kind:'Rabbit', weight:2,   age:1,  bread:'Holland Lop',       location:'Chinchiná Caldas',          description:'Fluffy white rabbit.',     active:1, adopted:0, image:null },
  { id:10, name:'Bruno',      kind:'Dog',    weight:25,  age:4,  bread:'German Shepherd',   location:'Dosquebradas',              description:'Loyal and intelligent.',   active:1, adopted:0, image:null },
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
function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload  = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// ── Normaliza pet de la API → objeto interno ───────────────────────────────────
function normalize(pet) {
  const img = pet.image;
  return {
    ...pet,
    breed:    pet.breed ?? pet.bread ?? '',
    bread:    pet.bread ?? pet.breed ?? '',
    // imageUrl: URL completa para mostrar la imagen
    imageUrl: img
      ? (img.startsWith('data:') || img.startsWith('http') ? img : `${IMAGE_BASE}${img}`)
      : null,
  };
}

// ── API calls con fallback automático ─────────────────────────────────────────
const petService = {

  getAll: async () => {
    try {
      const r = await apiClient.get('/pets/list');
      const pets = r.data.pets ?? r.data ?? [];
      return Array.isArray(pets) ? pets.map(normalize) : [];
    } catch {
      // Sin backend → usar localStorage
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

  // Crea mascota — intenta con API, si falla usa localStorage
  // Soporta imagen como File (multipart) o null
  create: async (petData) => {
    try {
      // Si hay imagen → multipart/form-data
      if (petData.image instanceof File) {
        const fd = new FormData();
        fd.append('name',        petData.name        || '');
        fd.append('kind',        petData.kind        || '');
        fd.append('bread',       petData.breed || petData.bread || '');
        fd.append('age',         petData.age         || 0);
        fd.append('weight',      petData.weight      || 0);
        fd.append('location',    petData.location    || '');
        fd.append('description', petData.description || '');
        fd.append('active',      1);
        fd.append('adopted',     0);
        fd.append('image',       petData.image);
        const r = await apiClient.post('/pets/store', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return normalize(r.data.pet ?? r.data);
      } else {
        // Sin imagen → JSON
        const payload = {
          name: petData.name||'', kind: petData.kind||'',
          bread: petData.breed||petData.bread||'',
          age: Number(petData.age)||0, weight: Number(petData.weight)||0,
          location: petData.location||'', description: petData.description||'',
          active: true, adopted: false,
        };
        const r = await apiClient.post('/pets/store', payload);
        return normalize(r.data.pet ?? r.data);
      }
    } catch {
      // Fallback localStorage
      const pets = localLoad();
      let imageData = null;
      if (petData.image instanceof File) imageData = await fileToBase64(petData.image);
      const newPet = {
        id: nextId(), name: petData.name||'', kind: petData.kind||'',
        bread: petData.breed||petData.bread||'', age: Number(petData.age)||0,
        weight: Number(petData.weight)||0, location: petData.location||'',
        description: petData.description||'', active:1, adopted:0,
        image: imageData,
      };
      pets.push(newPet);
      localSave(pets);
      return normalize(newPet);
    }
  },

  update: async (id, petData) => {
    try {
      if (petData.image instanceof File) {
        const fd = new FormData();
        fd.append('name',        petData.name        || '');
        fd.append('kind',        petData.kind        || '');
        fd.append('bread',       petData.breed || petData.bread || '');
        fd.append('age',         petData.age         || 0);
        fd.append('weight',      petData.weight      || 0);
        fd.append('location',    petData.location    || '');
        fd.append('description', petData.description || '');
        fd.append('active',      petData.active ?? 1);
        fd.append('adopted',     petData.adopted ?? 0);
        fd.append('image',       petData.image);
        fd.append('_method',     'PUT');   // Laravel necesita esto para PUT con multipart
        const r = await apiClient.post(`/pets/edit/${id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return normalize(r.data.pet ?? r.data);
      } else {
        const payload = {
          name: petData.name||'', kind: petData.kind||'',
          bread: petData.breed||petData.bread||'',
          age: Number(petData.age)||0, weight: Number(petData.weight)||0,
          location: petData.location||'', description: petData.description||'',
          active: petData.active??true, adopted: petData.adopted??false,
        };
        const r = await apiClient.put(`/pets/edit/${id}`, payload);
        return normalize(r.data.pet ?? r.data);
      }
    } catch {
      // Fallback localStorage
      const pets = localLoad();
      const idx  = pets.findIndex(p => p.id === Number(id));
      if (idx === -1) throw new Error('Mascota no encontrada');
      let imageData = pets[idx].image;
      if (petData.image instanceof File) imageData = await fileToBase64(petData.image);
      pets[idx] = {
        ...pets[idx],
        name:        petData.name        ?? pets[idx].name,
        kind:        petData.kind        ?? pets[idx].kind,
        bread:       petData.breed ?? petData.bread ?? pets[idx].bread,
        age:         petData.age         ?? pets[idx].age,
        weight:      petData.weight      ?? pets[idx].weight,
        location:    petData.location    ?? pets[idx].location,
        description: petData.description ?? pets[idx].description,
        image: imageData,
      };
      localSave(pets);
      return normalize(pets[idx]);
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
