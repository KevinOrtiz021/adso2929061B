import { useState, useEffect, useCallback } from 'react';
import petService from '../services/petService';

export function usePets() {
  const [pets,    setPets]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetchPets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await petService.getAll();
      setPets(data);
    } catch (err) {
      const msg = err.response?.data?.message ?? err.message ?? 'Error al cargar mascotas';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPets(); }, [fetchPets]);

  return { pets, loading, error, reload: fetchPets };
}

export function usePet(id) {
  const [pet,     setPet]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    petService.getOne(id)
      .then(data => setPet(data))
      .catch(err => setError(err.response?.data?.message ?? err.message ?? 'Error'))
      .finally(() => setLoading(false));
  }, [id]);

  return { pet, loading, error };
}
