// ShowPet — Colores Figma "Ver mascota":
// Card bg: #141313  borde: linear gris #4C4C4C→#BDBDBD→#4C4C4C
// Header: #141313
// Labels: #FFFFFF  Valores: #A69459
// Foto: ocupa todo el ancho
// Botón Atrás: fondo #333333 20% / borde gris

import iconBack     from '../assets/Vector__1_.png';
import iconSearch   from '../assets/Search__1_.png';
import iconPaw      from '../assets/Mask_group.png';
import iconWeight   from '../assets/Mask_group__3_.png';
import iconCalendar from '../assets/Mask_group__4_.png';
import iconBreed    from '../assets/Mask_group__5_.png';
import iconLocation from '../assets/Mask_group__6_.png';
import iconDesc     from '../assets/Mask_group__7_.png';

export default function ShowPet({ pet, onBack }) {
  if (!pet) return null;

  const imgSrc = pet.image
    ? pet.image
    : 'https://placehold.co/360x190/1a1a1a/555?text=Sin+foto';

  const fields = [
    { icon: iconPaw,      label: 'Nombre',      value: pet.name        },
    { icon: iconPaw,      label: 'Tipo',        value: pet.kind        },
    { icon: iconWeight,   label: 'Peso (lbs)',  value: `${pet.weight} lbs` },
    { icon: iconCalendar, label: 'Edad (Años)', value: `${pet.age} Años`   },
    { icon: iconBreed,    label: 'Raza',        value: pet.breed       },
    { icon: iconLocation, label: 'Ubicación',   value: pet.location    },
  ];

  return (
    /* Sin bgImg — hereda fondo de olas del body */
    <div style={s.page}>
      <div style={s.card}>

        {/* Header */}
        <div style={s.header}>
          <button style={s.backBtn} onClick={onBack}>
            <img src={iconBack} alt="back" style={s.backIcon} />
          </button>
          <img src={iconSearch} alt="ver" style={s.titleIcon} />
          <span style={s.title}>Ver mascota</span>
        </div>

        {/* Foto */}
        <img
          src={imgSrc} alt={pet.name} style={s.photo}
          onError={e => { e.target.src='https://placehold.co/360x190/1a1a1a/555?text=Sin+foto'; }}
        />

        {/* Campos */}
        <div style={s.fields}>
          {fields.map(({ icon, label, value }) => (
            <div key={label} style={s.row}>
              <img src={icon} alt={label} style={s.rowIcon} />
              <span style={s.rowLabel}>{label}</span>
              <span style={s.rowValue}>{value}</span>
            </div>
          ))}

          {/* Descripción */}
          <div style={s.descBlock}>
            <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:5 }}>
              <img src={iconDesc} alt="desc" style={s.rowIcon} />
              <span style={s.rowLabel}>Descripcion</span>
            </div>
            <p style={s.descText}>{pet.description}</p>
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
  page:   { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 0', background:'transparent' },

  /* Card: #141313 del Figma, borde gradiente gris */
  card:   {
    width:360, borderRadius:22, overflow:'hidden',
    boxShadow:'0 24px 64px rgba(0,0,0,0.7)',
    background:'#141313',
    border:'1px solid #3B3A3A',
  },

  header: { display:'flex', alignItems:'center', gap:8, padding:'14px 18px', borderBottom:'1px solid #3B3A3A' },
  backBtn:{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center' },
  backIcon:{ width:14, height:14, objectFit:'contain', filter:'brightness(2)', opacity:0.75 },
  titleIcon:{ width:15, height:15, objectFit:'contain', filter:'brightness(2)', opacity:0.8 },
  title:  { color:'#FFFFFF', fontWeight:600, fontSize:14 },

  photo:  { width:'100%', height:190, objectFit:'cover', display:'block' },

  fields: { padding:'12px 18px 4px' },
  row:    { display:'flex', alignItems:'center', gap:9, marginBottom:9 },
  rowIcon:{ width:14, height:14, objectFit:'contain', flexShrink:0, opacity:0.8 },
  rowLabel:{ color:'#B3AEAE', fontSize:12, width:92, flexShrink:0 },
  rowValue:{ color:'#A69459', fontSize:12, fontWeight:600, flex:1 },

  descBlock:{ marginTop:6, paddingTop:8, borderTop:'1px solid rgba(255,255,255,0.06)' },
  descText: { color:'#B3AEAE', fontSize:12, lineHeight:1.65, margin:0, background:'rgba(255,255,255,0.03)', borderRadius:8, padding:'9px 11px' },

  footer: { padding:'10px 18px 18px', display:'flex', justifyContent:'center' },
  atrasBtn:{ padding:'10px 50px', borderRadius:12, border:'1px solid rgba(255,255,255,0.12)', background:'rgba(51,51,51,0.5)', color:'#FFFFFF', fontSize:13, cursor:'pointer', fontWeight:500 },
};
