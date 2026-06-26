// ShowPet — Foto grande, campos con iconos, valores en dorado
import iconBack     from '../assets/Vector__4_.png';
import iconSearch   from '../assets/Mask_group.svg';
import iconPaw      from '../assets/Mask_group.png';
import iconWeight   from '../assets/Mask_group__3_.png';
import iconCalendar from '../assets/Mask_group__4_.png';
import iconRaza     from '../assets/Mask_group__5_.png';
import iconPin      from '../assets/Mask_group__6_.png';
import iconDesc     from '../assets/Mask_group__7_.png';

const IMAGE_BASE = 'http://127.0.0.1:8000/storage/pets/';
const DEFAULT_IMAGE = 'https://placehold.co/320x170/1a1a1a/444?text=Sin+foto';

export default function ShowPet({ pet, onBack }) {
  if (!pet) return null;
  
  // Función para obtener la URL de la imagen
  const getImageSrc = () => {
    if (!pet.image) return DEFAULT_IMAGE;
    
    // 1. Si ya es una URL completa (http, https, data:)
    if (pet.image.startsWith('http') || pet.image.startsWith('data:')) {
      return pet.image;
    }
    
    // 2. Si hay imageUrl, usarla
    if (pet.imageUrl) {
      return pet.imageUrl;
    }
    
    // 3. Si es un nombre de archivo, construir URL de Laravel
    if (pet.image !== 'no-image.png' && pet.image !== 'no-photo.png') {
      return `${IMAGE_BASE}${pet.image}`;
    }
    
    return DEFAULT_IMAGE;
  };

  const imgSrc = getImageSrc();
  const raza = pet.breed || pet.bread || '—';

  const fields = [
    { icon:iconPaw,      label:'Nombre',      value:pet.name         },
    { icon:iconPaw,      label:'Tipo',        value:pet.kind         },
    { icon:iconWeight,   label:'Peso (lbs)',  value:`${pet.weight} lbs` },
    { icon:iconCalendar, label:'Edad (Años)', value:`${pet.age} Años`   },
    { icon:iconRaza,     label:'Raza',        value:raza             },
    { icon:iconPin,      label:'Ubicación',   value:pet.location     },
  ];

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Header con título centrado */}
        <div style={s.header}>
          <button style={s.backBtn} onClick={onBack}>
            <img src={iconBack} alt="←" style={s.backIco}/>
          </button>
          <div style={s.titleContainer}>
            <img src={iconSearch} alt="🔍" style={s.titleIco}/>
            <span style={s.title}>Ver mascota</span>
          </div>
        </div>

        {/* Foto */}
        <img 
          src={imgSrc} 
          alt={pet.name} 
          style={s.photo}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
        />

        {/* Campos */}
        <div style={s.fields}>
          {fields.map(({icon,label,value})=>(
            <div key={label} style={s.row}>
              <img src={icon} alt={label} style={s.rIco}/>
              <span style={s.rLabel}>{label}</span>
              <span style={s.rValue}>{value}</span>
            </div>
          ))}

          {/* Descripción */}
          <div style={s.descWrap}>
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
              <img src={iconDesc} alt="desc" style={s.rIco}/>
              <span style={s.rLabel}>Descripcion</span>
            </div>
            <p style={s.descTxt}>{pet.description}</p>
          </div>
        </div>

        {/* Footer */}
        <div style={s.footer}>
          <button style={s.atrasBtn} onClick={onBack}>Atrás</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { 
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: '20px 0',
    background: 'transparent',
  },
  
  card: { 
    width: 380,
    borderRadius: 30,
    overflow: 'hidden', 
    boxShadow: '0 24px 64px rgba(0,0,0,0.7)', 
    background: '#141313', 
    border: '2px solid #2d5a2d',
  },

  header: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: '13px 16px', 
    borderBottom: '1px solid #3B3A3A',
    position: 'relative'
  },
  
  backBtn: { 
    background: 'none', 
    border: 'none', 
    cursor: 'pointer', 
    padding: 0, 
    display: 'flex', 
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: 'translateY(-50%)'
  },
  
  backIco: { 
    width: 13, 
    height: 13, 
    objectFit: 'contain', 
    filter: 'brightness(2)', 
    opacity: 0.8 
  },
  
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  
  titleIco: { 
    width: 20,
    height: 20,
    objectFit: 'contain', 
    filter: 'brightness(2)', 
    opacity: 0.8 
  },
  
  title: { 
    color: '#fff', 
    fontWeight: 600, 
    fontSize: 13 
  },

  photo: { 
    width: '100%', 
    height: 170, 
    objectFit: 'cover', 
    display: 'block' 
  },

  fields: { 
    padding: '11px 16px 4px' 
  },
  
  row: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: 8, 
    marginBottom: 8 
  },
  
  rIco: { 
    width: 13, 
    height: 13, 
    objectFit: 'contain', 
    flexShrink: 0, 
    opacity: 0.8 
  },
  
  rLabel: { 
    color: '#B3AEAE', 
    fontSize: 11, 
    width: 80, 
    flexShrink: 0 
  },
  
  rValue: { 
    color: '#A69459', 
    fontSize: 11, 
    fontWeight: 600, 
    flex: 1 
  },

  descWrap: { 
    marginTop: 6, 
    paddingTop: 7, 
    borderTop: '1px solid rgba(255,255,255,0.05)' 
  },
  
  descTxt: { 
    color: '#B3AEAE', 
    fontSize: 11, 
    lineHeight: 1.6, 
    margin: 0, 
    background: 'rgba(255,255,255,0.03)', 
    borderRadius: 7, 
    padding: '8px 10px' 
  },

  footer: { 
    padding: '10px 16px 16px', 
    display: 'flex', 
    justifyContent: 'center' 
  },
  
  atrasBtn: { 
    padding: '9px 44px', 
    borderRadius: 11, 
    border: '1px solid rgba(255,255,255,0.12)', 
    background: 'rgba(51,51,51,0.5)', 
    color: '#fff', 
    fontSize: 12, 
    cursor: 'pointer', 
    fontWeight: 500 
  },
};