// EditPet — Cuadro lápiz dorado, campos con iconos, foto editable
import { useState } from 'react';
import petService from '../services/petService';
import iconBack     from '../assets/Vector__4_.png';
import iconPencil   from '../assets/Pencil__2_.png';
import iconPaw      from '../assets/Mask_group.png';
import iconWeight   from '../assets/Mask_group__3_.png';
import iconCalendar from '../assets/Mask_group__4_.png';
import iconRaza     from '../assets/Mask_group__5_.png';
import iconPin      from '../assets/Mask_group__6_.png';
import iconDesc     from '../assets/Mask_group__7_.png';

const FIELDS = [
  { label:'Nombre',      name:'name',     type:'text',   icon:iconPaw      },
  { label:'Tipo',        name:'kind',     type:'text',   icon:iconPaw      },
  { label:'Peso (lbs)',  name:'weight',   type:'number', icon:iconWeight   },
  { label:'Edad (Años)', name:'age',      type:'number', icon:iconCalendar },
  { label:'Raza',        name:'breed',    type:'text',   icon:iconRaza     },
  { label:'Ubicación',   name:'location', type:'text',   icon:iconPin      },
];

const IMAGE_BASE = 'http://127.0.0.1:8000/storage/pets/';

export default function EditPet({ pet, onBack, onUpdated }) {
  const [form, setForm] = useState({
    name:        pet?.name        ?? '',
    kind:        pet?.kind        ?? '',
    weight:      pet?.weight      ?? '',
    age:         pet?.age         ?? '',
    breed:       pet?.breed ?? pet?.bread ?? '',
    location:    pet?.location    ?? '',
    description: pet?.description ?? '',
    image:       null,
  });
  
  // Construir la URL de la imagen para preview
  const getInitialPreview = () => {
    if (!pet?.image) return null;
    if (pet.imageUrl) return pet.imageUrl;
    if (pet.image.startsWith('http') || pet.image.startsWith('data:')) return pet.image;
    return `${IMAGE_BASE}${pet.image}`;
  };
  
  const [preview, setPreview] = useState(getInitialPreview());
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const onChange = e => {
    const {name, value, files} = e.target;
    if (name==='image' && files && files[0]) {
      setForm(f=>({...f, image: files[0]}));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f=>({...f, [name]:value}));
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
      
      await petService.update(pet.id, formData);
      onUpdated?.();
    } catch(err) {
      setError(err.response?.data?.message ?? err.message ?? 'Error al guardar');
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header */}
        <div style={s.header}>
          <button style={s.backBtn} onClick={onBack}>
            <img src={iconBack} alt="←" style={s.backIco}/>
          </button>
          <div style={s.titleContainer}>
            <img src={iconPencil} alt="✏️" style={s.titleIco}/>
            <span style={s.title}>Editar mascota</span>
          </div>
        </div>

        <div style={s.body}>
          {/* Cuadro de imagen — lápiz dorado si no hay foto */}
          <label htmlFor="edit-img" style={s.imgBox}>
            {preview ? (
              <img src={preview} alt="preview" style={s.previewImg} />
            ) : (
              <div style={{...s.pencilBox, display: 'flex'}}>
                <img src={iconPencil} alt="✏️" style={s.pencilIco}/>
              </div>
            )}
          </label>
          <input 
            id="edit-img" 
            type="file" 
            name="image" 
            accept="image/*"
            style={{display:'none'}} 
            onChange={onChange}
          />

          {preview && (
            <p style={s.changePhoto} onClick={()=>document.getElementById('edit-img').click()}>
              Cambiar foto
            </p>
          )}

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
              <button type="submit"  style={s.btnSave}   disabled={loading}>
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
  page: { 
    minHeight:'100vh', 
    display:'flex', 
    alignItems:'center', 
    justifyContent:'center', 
    padding:'20px 0',
    background: 'transparent',
  },
  card: { 
    width: 380,
    borderRadius: 30,
    overflow:'hidden', 
    maxHeight:'93vh', 
    overflowY:'auto', 
    boxShadow:'0 24px 64px rgba(0,0,0,0.7)', 
    background:'#141313', 
    border:'2px solid #2d5a2d',
  },

  header: { 
    display:'flex', 
    alignItems:'center', 
    justifyContent:'center',
    padding:'13px 16px', 
    borderBottom:'1px solid rgba(38,74,48,0.4)', 
    position:'sticky', 
    top:0, 
    zIndex:2, 
    background:'#141313',
    position:'relative'
  },
  
  backBtn: { 
    background:'none', 
    border:'none', 
    cursor:'pointer', 
    padding:0, 
    display:'flex', 
    alignItems:'center',
    position:'absolute',
    left:16,
    top:'50%',
    transform:'translateY(-50%)'
  },
  
  backIco: { 
    width:13, 
    height:13, 
    objectFit:'contain', 
    filter:'brightness(2)', 
    opacity:0.8 
  },
  
  titleContainer: {
    display:'flex',
    alignItems:'center',
    gap:8,
  },
  
  titleIco:{ 
    width:14, 
    height:14, 
    objectFit:'contain', 
    opacity:0.9 
  },
  
  title: { 
    color:'#fff', 
    fontWeight:600, 
    fontSize:13 
  },

  body: { padding:'14px 14px 20px' },

  imgBox: { 
    display:'flex', 
    alignItems:'center', 
    justifyContent:'center', 
    height:86, 
    background:'rgba(255,255,255,0.03)', 
    borderRadius:12, 
    cursor:'pointer', 
    marginBottom:6, 
    border:'1px solid rgba(255,255,255,0.07)', 
    overflow:'hidden' 
  },
  
  previewImg: { 
    width:'100%', 
    height:'100%', 
    objectFit:'cover' 
  },
  
  pencilBox: { 
    width:54, 
    height:54, 
    borderRadius:14, 
    background:'linear-gradient(135deg,#8B4A00,#C29500,#8B4A00)', 
    display:'flex', 
    alignItems:'center', 
    justifyContent:'center', 
    boxShadow:'0 4px 18px rgba(194,149,0,0.35)' 
  },
  
  pencilIco: { 
    width:26, 
    height:26, 
    objectFit:'contain', 
    filter:'brightness(10)' 
  },

  changePhoto: { 
    color:'#A9903C', 
    fontSize:10, 
    textAlign:'center', 
    cursor:'pointer', 
    margin:'0 0 10px' 
  },

  group: { 
    marginBottom:8 
  },
  
  labelRow: { 
    display:'flex', 
    alignItems:'center', 
    gap:5, 
    marginBottom:3 
  },
  
  fIco: { 
    width:12, 
    height:12, 
    objectFit:'contain', 
    opacity:0.8 
  },
  
  lbl: { 
    color:'#A9903C', 
    fontSize:10, 
    fontWeight:500 
  },
  
  input: { 
    width:'100%', 
    background:'rgba(51,51,51,0.5)', 
    border:'1px solid rgba(167,164,164,0.12)', 
    borderRadius:7, 
    padding:'8px 10px', 
    color:'#fff', 
    fontSize:12, 
    outline:'none', 
    boxSizing:'border-box', 
    fontFamily:'inherit' 
  },

  btnRow: { 
    display:'flex', 
    gap:8, 
    marginTop:14 
  },
  
  btnCancel: { 
    flex:1, 
    padding:'10px 0', 
    borderRadius:9, 
    border:'1px solid rgba(167,164,164,0.25)', 
    background:'transparent', 
    color:'#aaa', 
    fontSize:12, 
    cursor:'pointer' 
  },
  
  btnSave: { 
    flex:1, 
    padding:'10px 0', 
    borderRadius:9, 
    border:'none', 
    background:'linear-gradient(90deg,#915921,#F6D25A,#915921)', 
    color:'#030303', 
    fontSize:12, 
    fontWeight:700, 
    cursor:'pointer' 
  },
  
  errMsg: { 
    color:'#ff6b6b', 
    fontSize:11, 
    background:'rgba(255,0,0,0.1)', 
    borderRadius:6, 
    padding:'6px 8px', 
    marginBottom:8 
  },
};