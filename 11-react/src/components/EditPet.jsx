import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import petService from '../services/petService';
import iconBack from '../assets/Vector__4_.png';
import iconPencil from '../assets/Pencil__2_.png';
import iconPaw from '../assets/Mask_group.png';
import iconWeight from '../assets/Mask_group__3_.png';
import iconCalendar from '../assets/Mask_group__4_.png';
import iconRaza from '../assets/Mask_group__5_.png';
import iconPin from '../assets/Mask_group__6_.png';
import iconDesc from '../assets/Mask_group__7_.png';

const FIELDS = [
  { label: 'Nombre', name: 'name', type: 'text', icon: iconPaw },
  { label: 'Tipo', name: 'kind', type: 'text', icon: iconPaw },
  { label: 'Peso (lbs)', name: 'weight', type: 'number', icon: iconWeight },
  { label: 'Edad (Años)', name: 'age', type: 'number', icon: iconCalendar },
  { label: 'Raza', name: 'breed', type: 'text', icon: iconRaza },
  { label: 'Ubicación', name: 'location', type: 'text', icon: iconPin },
];

export default function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: '',
    kind: '',
    weight: '',
    age: '',
    breed: '',
    location: '',
    description: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await petService.getOne(id);
        setForm({
          name: data.name || '',
          kind: data.kind || '',
          weight: data.weight || '',
          age: data.age || '',
          breed: data.breed || data.bread || '',
          location: data.location || '',
          description: data.description || '',
          image: null,
        });
        setPreview(data.imageUrl || null);
      } catch (err) {
        console.error('Error:', err);
        await Swal.fire({
          title: 'Mascota no encontrada',
          text: 'Es posible que haya sido eliminada o el enlace ya no sea válido.',
          icon: 'warning',
          confirmButtonText: 'Volver al listado',
          background: '#121116',
          color: '#e0e0e0',
          confirmButtonColor: '#A69459',
        });
        navigate('/dashboard', { replace: true });
        return;
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      fetchPet();
    } else {
      navigate('/dashboard', { replace: true });
    }
  }, [id, navigate]);

  const onChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('kind', form.kind);
      formData.append('weight', form.weight);
      formData.append('age', form.age);
      formData.append('breed', form.breed);
      formData.append('location', form.location);
      formData.append('description', form.description);
      
      if (form.image) {
        formData.append('image', form.image);
      }
      
      const result = await petService.update(id, formData);
      
      if (result) {
        await Swal.fire({
          title: '¡Actualizado!',
          text: 'La mascota se ha actualizado correctamente',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
          background: '#121116',
          color: '#e0e0e0',
        });
        
        window.location.href = '/dashboard';
      } else {
        throw new Error('No se pudo actualizar la mascota');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || err.message || 'Error al guardar');
      
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || err.message || 'Error al actualizar la mascota',
        icon: 'error',
        background: '#121116',
        color: '#e0e0e0',
        confirmButtonColor: '#A69459',
      });
    } finally { 
      setLoading(false); 
    }
  };

  if (loadingData) {
    return (
      <div className="page">
        <div className="editpet-card">
          <div className="loading-text">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="editpet-card">
        <div className="editpet-header">
          <button className="editpet-backBtn" onClick={() => navigate('/dashboard')}>
            <img src={iconBack} alt="←" className="editpet-backIco" />
          </button>
          <div className="editpet-titleContainer">
            <img src={iconPencil} alt="✏️" className="editpet-titleIco" />
            <span className="editpet-title">Editar mascota</span>
          </div>
        </div>

        <div className="editpet-body">
          <label htmlFor="edit-img" className="editpet-imgBox">
            {preview ? (
              <img src={preview} alt="preview" className="editpet-previewImg" />
            ) : (
              <div className="editpet-pencilBox">
                <img src={iconPencil} alt="✏️" className="editpet-pencilIco" />
              </div>
            )}
          </label>
          <input 
            id="edit-img" 
            type="file" 
            name="image" 
            accept="image/*"
            style={{ display: 'none' }} 
            onChange={onChange}
          />

          {preview && (
            <p className="editpet-changePhoto" onClick={() => document.getElementById('edit-img').click()}>
              Cambiar foto
            </p>
          )}

          {error && <p className="editpet-errMsg">{error}</p>}

          <form onSubmit={onSubmit}>
            {FIELDS.map(({ label, name, type, icon }) => (
              <div key={name} className="editpet-group">
                <div className="editpet-labelRow">
                  <img src={icon} alt={label} className="editpet-fIco" />
                  <span className="editpet-lbl">{label}</span>
                </div>
                <input 
                  className="editpet-input" 
                  type={type} 
                  name={name}
                  value={form[name]} 
                  onChange={onChange} 
                  required
                />
              </div>
            ))}

            <div className="editpet-group">
              <div className="editpet-labelRow">
                <img src={iconDesc} alt="desc" className="editpet-fIco" />
                <span className="editpet-lbl">Descripción</span>
              </div>
              <textarea 
                className="editpet-input"
                style={{ minHeight: 55, resize: 'vertical' }}
                name="description" 
                value={form.description} 
                onChange={onChange} 
                required
              />
            </div>

            <div className="editpet-btnRow">
              <button 
                type="button" 
                className="editpet-btnCancel" 
                onClick={() => navigate('/dashboard')}
              >
                Cancelar
              </button>
              <button 
                type="submit"  
                className="editpet-btnSave"   
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar cambio'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}