// AddPet — Colores Figma "Agregar mascota":
// Card bg: #333131  borde: rgba(255,255,255,0.08)
// Header: mismo dark  Labels: #A9903C (82%) / blancos
// Campos: bg #414141  borde rgba(255,255,255,0.08)
// Botón Cancelar: bg rgba(255,255,255,0.10) borde gris
// Botón Agregar: gradiente verde #2a5c2a→#3a8a3a

import { useState } from 'react';
import petService from '../services/petService';

import iconBack     from '../assets/Vector__1_.png';
import iconPaw      from '../assets/Mask_group.png';
import iconWeight   from '../assets/Mask_group__3_.png';
import iconCalendar from '../assets/Mask_group__4_.png';
import iconBreed    from '../assets/Mask_group__5_.png';
import iconLocation from '../assets/Mask_group__6_.png';

const EMPTY = { name:'', kind:'', weight:'', age:'', breed:'', location:'', description:'', image:null };

const FIELDS = [
  { label:'Nombre',      name:'name',     type:'text',   icon: iconPaw      },
  { label:'Tipo',        name:'kind',     type:'text',   icon: iconPaw      },
  { label:'Peso (lbs)',  name:'weight',   type:'number', icon: iconWeight   },
  { label:'Edad (Años)', name:'age',      type:'number', icon: iconCalendar },
  { label:'Raza',        name:'breed',    type:'text',   icon: iconBreed    },
  { label:'Ubicación',   name:'location', type:'text',   icon: iconLocation },
];

export default function AddPet({ onBack, onCreated }) {
  const [form,    setForm]    = useState(EMPTY);
  const [preview, setPreview] = useState(null);
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
      await petService.create(form);
      onCreated?.();
    } catch (err) {
      setError(err.message ?? 'Error al agregar');
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
          <img src={iconPaw} alt="paw" style={s.titleIcon} />
          <span style={s.title}>Agregar mascota</span>
        </div>

        <div style={s.body}>
          {/* Imagen */}
          <label htmlFor="add-img" style={s.imgBox}>
            {preview
              ? <img src={preview} alt="preview" style={s.previewImg} />
              : <span style={s.imgHint}>📷 Seleccionar foto</span>}
          </label>
          <input id="add-img" type="file" name="image" accept="image/*"
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
                {loading ? '...' : 'Agregar'}
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

  /* Card: #333131 del Figma */
  card:      { width:360, borderRadius:22, overflow:'hidden', maxHeight:'93vh', overflowY:'auto', boxShadow:'0 24px 64px rgba(0,0,0,0.7)', background:'#2A2727', border:'1px solid rgba(255,255,255,0.07)' },

  header:    { display:'flex', alignItems:'center', gap:8, padding:'14px 18px', borderBottom:'1px solid rgba(255,255,255,0.07)', position:'sticky', top:0, zIndex:2, background:'#2A2727' },
  backBtn:   { background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' },
  backIcon:  { width:14, height:14, objectFit:'contain', filter:'brightness(2)', opacity:0.75 },
  titleIcon: { width:15, height:15, objectFit:'contain', opacity:0.85 },
  title:     { color:'#FFFFFF', fontWeight:600, fontSize:14 },

  body:      { padding:'14px 18px 22px' },
  imgBox:    { display:'flex', alignItems:'center', justifyContent:'center', height:76, background:'rgba(255,255,255,0.04)', borderRadius:10, cursor:'pointer', marginBottom:12, border:'2px dashed rgba(255,255,255,0.1)', overflow:'hidden' },
  previewImg:{ width:'100%', height:'100%', objectFit:'cover' },
  imgHint:   { color:'#666', fontSize:12 },

  group:     { marginBottom:9 },
  labelRow:  { display:'flex', alignItems:'center', gap:6, marginBottom:4 },
  fieldIcon: { width:13, height:13, objectFit:'contain', opacity:0.8 },
  labelTxt:  { color:'#A9903C', fontSize:11, fontWeight:500 },
  input:     { width:'100%', background:'#414141', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, padding:'10px 12px', color:'#FFFFFF', fontSize:12, outline:'none', boxSizing:'border-box', fontFamily:'Poppins, sans-serif' },

  btnRow:    { display:'flex', gap:10, marginTop:18 },
  cancelBtn: { flex:1, padding:'11px 0', borderRadius:10, border:'1px solid rgba(255,255,255,0.15)', background:'rgba(255,255,255,0.08)', color:'#FFFFFF', fontSize:13, cursor:'pointer' },
  submitBtn: { flex:1, padding:'11px 0', borderRadius:10, border:'none', background:'linear-gradient(90deg,#2a5c2a,#3a8a3a)', color:'#FFFFFF', fontSize:13, fontWeight:700, cursor:'pointer' },
  errMsg:    { color:'#ff6b6b', fontSize:11, background:'rgba(255,0,0,0.1)', borderRadius:6, padding:'5px 8px', marginBottom:8 },
};
