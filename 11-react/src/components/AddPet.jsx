// AddPet — igual al Figma: header con pata + título, campos con iconos, foto opcional
import { useState } from 'react';
import petService from '../services/petService';
import iconBack     from '../assets/Vector__1_.png';
import iconPaw      from '../assets/Mask_group.png';
import iconWeight   from '../assets/Mask_group__3_.png';
import iconCalendar from '../assets/Mask_group__4_.png';
import iconRaza     from '../assets/Mask_group__5_.png';
import iconPin      from '../assets/Mask_group__6_.png';
import iconDesc     from '../assets/Mask_group__7_.png';

const FIELDS = [
  { label:'Nombre',      name:'name',        type:'text',   icon:iconPaw      },
  { label:'Tipo',        name:'kind',        type:'text',   icon:iconPaw      },
  { label:'Peso (lbs)',  name:'weight',      type:'number', icon:iconWeight   },
  { label:'Edad (Años)', name:'age',         type:'number', icon:iconCalendar },
  { label:'Raza',        name:'breed',       type:'text',   icon:iconRaza     },
  { label:'Ubicación',   name:'location',    type:'text',   icon:iconPin      },
];

const EMPTY = { name:'', kind:'', weight:'', age:'', breed:'', location:'', description:'', image:null };

export default function AddPet({ onBack, onCreated }) {
  const [form,    setForm]    = useState(EMPTY);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const onChange = e => {
    const {name, value, files} = e.target;
    if (name==='image' && files[0]) {
      setForm(f=>({...f, image:files[0]}));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f=>({...f, [name]:value}));
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await petService.create(form);
      onCreated?.();
    } catch(err) {
      setError(err.response?.data?.message ?? err.message ?? 'Error al agregar');
    } finally { setLoading(false); }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.header}>
          <button style={s.backBtn} onClick={onBack}>
            <img src={iconBack} alt="←" style={s.backIco}/>
          </button>
          <img src={iconPaw} alt="🐾" style={s.titleIco}/>
          <span style={s.title}>Agregar mascota</span>
        </div>

        <div style={s.body}>
          {/* Selector de foto */}
          <label htmlFor="add-img" style={s.imgBox}>
            {preview
              ? <img src={preview} alt="preview" style={s.previewImg}/>
              : <div style={s.imgPlaceholder}>
                  <span style={s.camIcon}>📷</span>
                  <span style={s.camTxt}>Agregar foto</span>
                </div>}
          </label>
          <input id="add-img" type="file" name="image" accept="image/*"
            style={{display:'none'}} onChange={onChange}/>

          {error && <p style={s.errMsg}>{error}</p>}

          <form onSubmit={onSubmit}>
            {FIELDS.map(({label, name, type, icon})=>(
              <div key={name} style={s.group}>
                <div style={s.labelRow}>
                  <img src={icon} alt={label} style={s.fIco}/>
                  <span style={s.lbl}>{label}</span>
                </div>
                <input style={s.input} type={type} name={name}
                  value={form[name]} onChange={onChange} required/>
              </div>
            ))}

            {/* Descripción */}
            <div style={s.group}>
              <div style={s.labelRow}>
                <img src={iconDesc} alt="desc" style={s.fIco}/>
                <span style={s.lbl}>Descripción</span>
              </div>
              <textarea style={{...s.input, minHeight:55, resize:'vertical'}}
                name="description" value={form.description} onChange={onChange} required/>
            </div>

            <div style={s.btnRow}>
              <button type="button" style={s.btnCancel} onClick={onBack}>Cancelar</button>
              <button type="submit"  style={s.btnAdd}    disabled={loading}>
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
  page: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 0' },
  card: { width:320, borderRadius:22, overflow:'hidden', maxHeight:'93vh', overflowY:'auto', boxShadow:'0 24px 64px rgba(0,0,0,0.7)', background:'#1e1e1e', border:'1px solid rgba(255,255,255,0.08)' },

  header:  { display:'flex', alignItems:'center', gap:8, padding:'13px 16px', borderBottom:'1px solid rgba(255,255,255,0.07)', position:'sticky', top:0, zIndex:2, background:'#1e1e1e' },
  backBtn: { background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' },
  backIco: { width:13, height:13, objectFit:'contain', filter:'brightness(2)', opacity:0.8 },
  titleIco:{ width:14, height:14, objectFit:'contain', opacity:0.9 },
  title:   { color:'#fff', fontWeight:600, fontSize:13 },

  body:    { padding:'12px 14px 20px' },

  imgBox:  { display:'flex', alignItems:'center', justifyContent:'center', height:72, background:'rgba(255,255,255,0.04)', borderRadius:10, cursor:'pointer', marginBottom:12, border:'1.5px dashed rgba(255,255,255,0.12)', overflow:'hidden' },
  previewImg: { width:'100%', height:'100%', objectFit:'cover' },
  imgPlaceholder: { display:'flex', flexDirection:'column', alignItems:'center', gap:3 },
  camIcon: { fontSize:18 },
  camTxt:  { color:'#555', fontSize:10 },

  group:    { marginBottom:8 },
  labelRow: { display:'flex', alignItems:'center', gap:5, marginBottom:3 },
  fIco:     { width:12, height:12, objectFit:'contain', opacity:0.8 },
  lbl:      { color:'#A9903C', fontSize:10, fontWeight:500 },
  input:    { width:'100%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:7, padding:'8px 10px', color:'#fff', fontSize:12, outline:'none', boxSizing:'border-box', fontFamily:'inherit' },

  btnRow:    { display:'flex', gap:8, marginTop:14 },
  btnCancel: { flex:1, padding:'10px 0', borderRadius:9, border:'1px solid rgba(255,255,255,0.15)', background:'transparent', color:'#aaa', fontSize:12, cursor:'pointer' },
  btnAdd:    { flex:1, padding:'10px 0', borderRadius:9, border:'none', background:'linear-gradient(90deg,#1a4d1a,#2d7a2d)', color:'#fff', fontSize:12, fontWeight:700, cursor:'pointer' },
  errMsg:    { color:'#ff6b6b', fontSize:11, background:'rgba(255,0,0,0.1)', borderRadius:6, padding:'6px 8px', marginBottom:8 },
};
