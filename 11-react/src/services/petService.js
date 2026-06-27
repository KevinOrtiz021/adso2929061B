// ─── Pet Service — API Laravel ────────────────────────────────────────────────
import apiClient from './apiClient';

const STORAGE_KEY = 'pets_larapets_local';
const IMAGE_BASE = 'http://127.0.0.1:8000/storage/pets/';

// ── Normaliza pet ──────────────────────────────────────────────────────────────
function normalize(pet) {
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
        breed: pet.breed ?? pet.bread ?? '',
        bread: pet.bread ?? pet.breed ?? '',
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
        } catch (error) {
            console.log('⚠️ Error:', error);
            return [];
        }
    },

    getOne: async (id) => {
        try {
            const r = await apiClient.get(`/pets/show/${id}`);
            return normalize(r.data.pet ?? r.data);
        } catch (error) {
            console.error('❌ Error:', error);
            throw error;
        }
    },

    create: async (petData) => {
        try {
            const r = await apiClient.post('/pets/store', petData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return normalize(r.data.pet ?? r.data);
        } catch (error) {
            console.error('❌ Error creating pet:', error);
            throw error;
        }
    },

    update: async (id, petData) => {
        try {
            const r = await apiClient.post(`/pets/edit/${id}`, petData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return normalize(r.data.pet ?? r.data);
        } catch (error) {
            console.error('❌ Error updating pet:', error);
            throw error;
        }
    },

    remove: async (id) => {
        try {
            const r = await apiClient.delete(`/pets/delete/${id}`);
            return r.data;
        } catch (error) {
            console.error('❌ Error deleting pet:', error);
            throw error;
        }
    },
};

export default petService;