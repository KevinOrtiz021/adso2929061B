// EditPet — Colores Figma "Editar mascota":
// Card bg: #141313  borde: #264A30
// Cuadro lápiz dorado: gradiente #C29500 (82%) center
// Labels: #A9903C  Campos: bg #333333 20% / borde A7A4A4 10%
// Botón Cancelar: #141313 borde A7A4A4
// Botón Guardar: gradiente dorado #915921→#F6D25A→#915921

import { useState } from 'react';
import petService from '../services/petService';

import iconBack     from '../assets/Vector__1_.png';
import iconPencil   from '../assets/Pencil__2_.png';
import iconPaw      from '../assets/Mask_group.png';
import iconWeight   from '../assets/Mask_group__3_.png';
import iconCalendar from '../assets/Mask_group__4_.png';
import iconBreed    from '../assets/Mask_group__5_.png';
import iconLocation from '../assets/Mask_group__6_.png';

const FIELDS = [
  { label:'Nombre',      name:'name',     type:'text',   icon: iconPaw      },
  { label:'Tipo',        name:'kind',     type:'text',   icon: iconPaw      },
  { label:'Peso (lbs)',  name:'weight',   type:'number', icon: iconWeight   },
  { label:'Edad (Años)', name:'age',      type:'number', icon: iconCalendar },
  { label:'Raza',        name:'breed',    type:'text',   icon: iconBreed    },
  { label:'Ubicación',   name:'location', type:'text',   icon: iconLocation },
];

export default function EditPet({ pet, onBack, onUpdated }) {
  const [form, setForm] = useState({
    name:        pet?.name        ?? '',
    kind:        pet?.kind        ?? '',
    weight:      pet?.weight      ?? '',
    age:         pet?.age         ?? '',
    breed:       pet?.breed       ?? '',
    location:    pet?.location    ?? '',
    description: pet?.description ?? '',
    image:       null,
  });
  const [preview, setPreview] = useState(pet?.image ?? null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      setForm(f => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const payload = { ...form };
      if (!payload.image) delete payload.image;
      await petService.update(pet.id, payload);
      onUpdated?.();
    } catch (err) {
      setError(err.message ?? 'Error al guardar');
    } finally { setLoading(false); }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* Header */}
        <div style={s.header}>
          <button style={s.backBtn} onClick={onBack}>
            <img src={iconBack} alt="back" style={s.backIcon} />
          </button>
          <img src={iconPencil} alt="edit" style={s.titleIcon} />
          <span style={s.title}>Agregar mascota</span>
        </div>

        <div style={s.body}>
          {/* Cuadro dorado con lápiz */}
          <label htmlFor="edit-img" style={s.imgBox}>
            {preview
              ? <img src={preview} alt="preview" style={s.previewImg} />
              : (
                <div style={s.pencilBox}>
                  <img src={iconPencil} alt="edit" style={s.pencilIcon} />
                </div>
              )}
          </label>
          <input id="edit-img" type="file" name="image" accept="image/*"
            style={{ display:'none' }} onChange={handleChange} />

          {error && <p style={s.errMsg}>{error}</p>}

          <form onSubmit={handleSubmit}>
            {FIELDS.map(({ label, name, type, icon }) => (
              <div key={name} style={s.group}>
                <div style={s.labelRow}>
                  <img src={icon} alt={label} style={s.fieldIcon} />
                  <span style={s.labelTxt}>{label}</span>
                </div>
                <input style={s.input} type={type} name={name}
                  value={form[name]} onChange={handleChange} required />
              </div>
            ))}

            <div style={s.btnRow}>
              <button type="button" style={s.cancelBtn} onClick={onBack}>Cancelar</button>
              <button type="submit" style={s.submitBtn} disabled={loading}>
                {loading ? '...' : 'Guardar cambio'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

const s = {
  page:      { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 0', background:'transparent' },

  /* Card: #141313 borde #264A30 del Figma */
  card:      { width:360, borderRadius:22, overflow:'hidden', maxHeight:'93vh', overflowY:'auto', boxShadow:'0 24px 64px rgba(0,0,0,0.7)', background:'#141313', border:'1px solid #264A30' },

  header:    { display:'flex', alignItems:'center', gap:8, padding:'14px 18px', borderBottom:'1px solid rgba(38,74,48,0.5)', position:'sticky', top:0, zIndex:2, background:'#141313' },
  backBtn:   { background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' },
  backIcon:  { width:14, height:14, objectFit:'contain', filter:'brightness(2)', opacity:0.75 },
  titleIcon: { width:15, height:15, objectFit:'contain', opacity:0.85 },
  title:     { color:'#FFFFFF', fontWeight:600, fontSize:14 },

  body:      { padding:'16px 18px 22px' },

  /* Cuadro imagen — gradiente dorado #C29500 del Figma */
  imgBox:    { display:'flex', alignItems:'center', justifyContent:'center', height:94, background:'rgba(255,255,255,0.03)', borderRadius:12, cursor:'pointer', marginBottom:14, border:'1px solid rgba(255,255,255,0.07)', overflow:'hidden' },
  previewImg:{ width:'100%', height:'100%', objectFit:'cover' },
  pencilBox: { width:58, height:58, borderRadius:16, background:'linear-gradient(135deg,#915921,#C29500,#915921)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 18px rgba(194,149,0,0.4)' },
  pencilIcon:{ width:28, height:28, objectFit:'contain', filter:'brightness(10)' },

  group:     { marginBottom:10 },
  labelRow:  { display:'flex', alignItems:'center', gap:6, marginBottom:4 },
  fieldIcon: { width:13, height:13, objectFit:'contain', opacity:0.8 },
  labelTxt:  { color:'#A9903C', fontSize:11, fontWeight:500 },
  input:     { width:'100%', background:'rgba(51,51,51,0.5)', border:'1px solid rgba(167,164,164,0.15)', borderRadius:8, padding:'10px 12px', color:'#FFFFFF', fontSize:12, outline:'none', boxSizing:'border-box', fontFamily:'Poppins, sans-serif' },

  btnRow:    { display:'flex', gap:10, marginTop:18 },
  cancelBtn: { flex:1, padding:'11px 0', borderRadius:10, border:'1px solid rgba(167,164,164,0.3)', background:'#141313', color:'#FFFFFF', fontSize:13, cursor:'pointer' },
  /* Botón dorado del Figma: #915921→#F6D25A 82%→#915921 */
  submitBtn: { flex:1, padding:'11px 0', borderRadius:10, border:'none', background:'linear-gradient(90deg,#915921,#F6D25A,#915921)', color:'#030303', fontSize:13, fontWeight:700, cursor:'pointer' },
  errMsg:    { color:'#ff6b6b', fontSize:11, background:'rgba(255,0,0,0.1)', borderRadius:6, padding:'5px 8px', marginBottom:8 },
};
