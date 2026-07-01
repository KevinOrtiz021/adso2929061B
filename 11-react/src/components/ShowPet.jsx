import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import petService from '../services/petService';
import iconBack from '../assets/Vector__4_.png';
import iconSearch from '../assets/Mask_group.svg';
import iconPaw from '../assets/Mask_group.png';
import iconWeight from '../assets/Mask_group__3_.png';
import iconCalendar from '../assets/Mask_group__4_.png';
import iconRaza from '../assets/Mask_group__5_.png';
import iconPin from '../assets/Mask_group__6_.png';
import iconDesc from '../assets/Mask_group__7_.png';

const IMAGE_BASE = 'http://127.0.0.1:8000/storage/pets/';
const DEFAULT_IMAGE = 'https://placehold.co/320x170/1a1a1a/444?text=Sin+foto';

export default function ShowPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        setLoading(true);
        const data = await petService.getOne(id);
        setPet(data);
      } catch (err) {
        console.error('Error:', err);
        setError('Error al cargar la mascota');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [id]);

  const getImageSrc = () => {
    if (!pet?.image) return DEFAULT_IMAGE;
    if (pet.image.startsWith('http') || pet.image.startsWith('data:')) return pet.image;
    if (pet.imageUrl) return pet.imageUrl;
    if (pet.image !== 'no-image.png' && pet.image !== 'no-photo.png') {
      return `${IMAGE_BASE}${pet.image}`;
    }
    return DEFAULT_IMAGE;
  };

  if (loading) {
    return (
      <div className="page">
        <div className="showpet-card">
          <div className="loading-text">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="page">
        <div className="showpet-card">
          <div className="error-text">
            {error || 'Mascota no encontrada'}
            <br />
            <button className="showpet-atrasBtn" onClick={() => navigate('/dashboard')}>
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  const imgSrc = getImageSrc();
  const raza = pet.breed || pet.bread || '—';

  const fields = [
    { icon: iconPaw, label: 'Nombre', value: pet.name },
    { icon: iconPaw, label: 'Tipo', value: pet.kind },
    { icon: iconWeight, label: 'Peso (lbs)', value: `${pet.weight} lbs` },
    { icon: iconCalendar, label: 'Edad (Años)', value: `${pet.age} Años` },
    { icon: iconRaza, label: 'Raza', value: raza },
    { icon: iconPin, label: 'Ubicación', value: pet.location },
  ];

  return (
    <div className="page">
      <div className="showpet-card">
        <div className="showpet-header">
          <button className="showpet-backBtn" onClick={() => navigate('/dashboard')}>
            <img src={iconBack} alt="←" className="showpet-backIco" />
          </button>
          <div className="showpet-titleContainer">
            <img src={iconSearch} alt="🔍" className="showpet-titleIco" />
            <span className="showpet-title">Ver mascota</span>
          </div>
        </div>

        <img 
          src={imgSrc} 
          alt={pet.name} 
          className="showpet-photo"
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />

        <div className="showpet-fields">
          {fields.map(({ icon, label, value }) => (
            <div key={label} className="showpet-row">
              <img src={icon} alt={label} className="showpet-rIco" />
              <span className="showpet-rLabel">{label}</span>
              <span className="showpet-rValue">{value}</span>
            </div>
          ))}

          <div className="showpet-descWrap">
            <div className="showpet-row">
              <img src={iconDesc} alt="desc" className="showpet-rIco" />
              <span className="showpet-rLabel">Descripcion</span>
            </div>
            <p className="showpet-descTxt">{pet.description}</p>
          </div>
        </div>

        <div className="showpet-footer">
          <button className="showpet-atrasBtn" onClick={() => navigate('/dashboard')}>Atrás</button>
        </div>
      </div>
    </div>
  );
}