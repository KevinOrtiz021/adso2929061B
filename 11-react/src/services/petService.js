// ─── Pet Service — datos reales del dump SQL (localStorage) ─────────────────

const STORAGE_KEY = 'pets_larapets';

// Datos reales de larapets2929061b.sql
const INITIAL_PETS = [
  { id:1,  name:'Rocko52',    kind:'Perro',  weight:4,   age:6,  breed:'Creole',           location:'Villamaria Caldas',             description:'He is a calm dog and is friendly to everyone.',                                                                          active:1, adopted:0, image:null },
  { id:2,  name:'Tiger',      kind:'Cat',    weight:2,   age:8,  breed:'Orange',           location:'Villamaria Caldas',             description:'He is a calm and sleepy cat.',                                                                                            active:1, adopted:1, image:null },
  { id:3,  name:'Juan',       kind:'Horse',  weight:16,  age:2,  breed:'Friesian',         location:'Llanitos Villamaria Caldas',    description:'He is a beautiful and calm horse who loves to trot all over the countryside, happy with life.',                            active:1, adopted:0, image:null },
  { id:4,  name:'Roberto',    kind:'Pig',    weight:5,   age:1,  breed:'Mini Pig',         location:'Buenaventura Valle del Cauca',  description:'Its a pig that eats people and loves pork.',                                                                             active:1, adopted:1, image:null },
  { id:5,  name:'Chilindrina',kind:'Cow',    weight:15,  age:3,  breed:'Angus',            location:'Pereira Risaralda',             description:'Shes a quiet cow, bored of living in Pereira.',                                                                          active:1, adopted:0, image:null },
  { id:6,  name:'Luna',       kind:'Dog',    weight:8,   age:3,  breed:'Golden Retriever', location:'Manizales Caldas',              description:'She is an energetic dog who loves to play fetch and swim in the river.',                                                  active:1, adopted:0, image:null },
  { id:7,  name:'Michi',      kind:'Cat',    weight:3,   age:2,  breed:'Siamese',          location:'Pereira Risaralda',             description:'A curious cat who loves to explore and climb trees. Very vocal and affectionate.',                                         active:1, adopted:0, image:null },
  { id:8,  name:'Pepe',       kind:'Bird',   weight:1,   age:5,  breed:'African Grey',     location:'Armenia Quindío',               description:'He can talk and mimic sounds. Loves to whistle and say "Hola".',                                                           active:1, adopted:0, image:null },
  { id:9,  name:'Copito',     kind:'Rabbit', weight:2,   age:1,  breed:'Holland Lop',      location:'Chinchiná Caldas',              description:'A fluffy white rabbit who loves carrots and jumping around the garden.',                                                   active:1, adopted:0, image:null },
  { id:10, name:'Ruedita',    kind:'Rodent', weight:0.5, age:1,  breed:'Syrian Hamster',   location:'Santa Rosa de Cabal',           description:'Tiny and fast, loves to run on his wheel all night long.',                                                               active:1, adopted:0, image:null },
  { id:11, name:'Manuelita',  kind:'Turtle', weight:3,   age:15, breed:'Red-eared Slider', location:'Neira Caldas',                  description:'A wise old turtle who enjoys sunbathing on rocks and swimming slowly.',                                                   active:1, adopted:0, image:null },
  { id:12, name:'Nemo',       kind:'Fish',   weight:0.2, age:1,  breed:'Clownfish',        location:'Acuario de Manizales',          description:'Bright orange and white fish who loves swimming among anemones.',                                                          active:1, adopted:0, image:null },
  { id:13, name:'Bruno',      kind:'Dog',    weight:25,  age:4,  breed:'German Shepherd',  location:'Dosquebradas',                  description:'Protective and loyal, great with kids and very intelligent.',                                                             active:1, adopted:0, image:null },
  { id:14, name:'Canela',     kind:'Cat',    weight:4,   age:3,  breed:'Persian',          location:'La Dorada Caldas',              description:'Long-haired beauty with a calm temperament. Loves to be brushed.',                                                        active:1, adopted:0, image:null },
  { id:15, name:'Relámpago',  kind:'Horse',  weight:18,  age:7,  breed:'Arabian',          location:'Chinchiná Caldas',              description:'Fast and elegant, winner of local competitions. Very noble.',                                                             active:1, adopted:0, image:null },
  { id:16, name:'Sasha',      kind:'Bird',   weight:3.6, age:13, breed:'Cockatiel',        location:"O'Reillyview",                  description:'Eius optio blanditiis pariatur cupiditate veniam cumque.',                                                               active:1, adopted:0, image:null },
  { id:17, name:'Rocky',      kind:'Cat',    weight:4.4, age:4,  breed:'British Shorthair',location:'Emmerichberg',                  description:'Nam quis est dolores nisi animi et.',                                                                                    active:1, adopted:0, image:null },
  { id:18, name:'Simba',      kind:'Bird',   weight:3.8, age:15, breed:'Canary',           location:'South Frances',                 description:'Eum quia rerum similique.',                                                                                              active:1, adopted:0, image:null },
  { id:19, name:'Oliver',     kind:'Bird',   weight:9.9, age:12, breed:'Cockatiel',        location:'East Allene',                   description:'Vitae maxime omnis culpa.',                                                                                              active:1, adopted:0, image:null },
  { id:20, name:'Charlie',    kind:'Pig',    weight:8,   age:15, breed:'Vietnamese',       location:'Kianaburgh',                    description:'Tempora molestias autem cumque illo.',                                                                                   active:1, adopted:0, image:null },
];

function loadPets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    // Primera vez: cargar datos reales del SQL
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PETS));
    return INITIAL_PETS;
  } catch { return INITIAL_PETS; }
}

function savePets(pets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
}

function getNextId() {
  const pets = loadPets();
  return pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1;
}

const delay = (ms = 350) => new Promise(r => setTimeout(r, ms));

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) { resolve(null); return; }
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const petService = {
  getAll: async () => {
    await delay(300);
    return loadPets();
  },

  getOne: async (id) => {
    await delay(200);
    const pet = loadPets().find(p => p.id === Number(id));
    if (!pet) throw new Error('Mascota no encontrada');
    return pet;
  },

  create: async (petData) => {
    await delay(500);
    const pets = loadPets();
    let imageData = null;
    if (petData.image instanceof File) {
      imageData = await fileToBase64(petData.image);
    }
    const newPet = {
      id:          getNextId(),
      name:        petData.name        || '',
      kind:        petData.kind        || '',
      weight:      Number(petData.weight) || 0,
      age:         Number(petData.age)    || 0,
      breed:       petData.breed       || '',
      location:    petData.location    || '',
      description: petData.description || '',
      active:      1,
      adopted:     0,
      image:       imageData,
    };
    pets.push(newPet);
    savePets(pets);
    return newPet;
  },

  update: async (id, petData) => {
    await delay(500);
    const pets = loadPets();
    const idx = pets.findIndex(p => p.id === Number(id));
    if (idx === -1) throw new Error('Mascota no encontrada');
    let imageData = pets[idx].image;
    if (petData.image instanceof File) {
      imageData = await fileToBase64(petData.image);
    }
    pets[idx] = {
      ...pets[idx],
      name:        petData.name        ?? pets[idx].name,
      kind:        petData.kind        ?? pets[idx].kind,
      weight:      petData.weight      ?? pets[idx].weight,
      age:         petData.age         ?? pets[idx].age,
      breed:       petData.breed       ?? pets[idx].breed,
      location:    petData.location    ?? pets[idx].location,
      description: petData.description ?? pets[idx].description,
      image:       imageData,
    };
    savePets(pets);
    return pets[idx];
  },

  remove: async (id) => {
    await delay(300);
    const pets = loadPets().filter(p => p.id !== Number(id));
    savePets(pets);
    return { success: true };
  },
};

export default petService;
