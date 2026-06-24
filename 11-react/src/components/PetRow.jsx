// PetRow — Colores Figma Dashboard:
// Fila bg: #333333 20%  borde: rgba(255,255,255,0.05)
// Nombre: #FFFFFF  Sub: #8D8D8D
// Btn Ver: bg #2a4a2a (verde oscuro)
// Btn Edit: bg #4a3800 (dorado oscuro)
// Btn Delete: bg #5a1500 (rojo oscuro)

import iconSearch from '../assets/Search__1_.png';
import iconPencil from '../assets/Pencil__1_.png';
import iconDelete from '../assets/Delete.png';

export default function PetRow({ pet, onView, onEdit, onDelete }) {
  const imgSrc = pet.image
    ? pet.image
    : null;

  return (
    <div style={s.row}>
      {/* Avatar o letra */}
      <div style={s.avatarWrap}>
        {imgSrc
          ? <img src={imgSrc} alt={pet.name} style={s.avatar}
              onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
          : null}
        <div style={{ ...s.avatarLetter, display: imgSrc ? 'none' : 'flex' }}>
          {(pet.name?.[0] ?? '?').toUpperCase()}
        </div>
      </div>

      {/* Info */}
      <div style={s.info}>
        <p style={s.name}>{pet.name}</p>
        <p style={s.sub}>{pet.kind} – {pet.breed}</p>
      </div>

      {/* Acciones */}
      <div style={s.actions}>
        <button style={{ ...s.btn, background:'#2a4a2a' }} onClick={onView} title="Ver">
          <img src={iconSearch} alt="ver" style={s.btnIcon} />
        </button>
        <button style={{ ...s.btn, background:'#4a3800' }} onClick={onEdit} title="Editar">
          <img src={iconPencil} alt="editar" style={s.btnIcon} />
        </button>
        <button style={{ ...s.btn, background:'#5a1500' }} onClick={onDelete} title="Eliminar">
          <img src={iconDelete} alt="eliminar" style={s.btnIcon} />
        </button>
      </div>
    </div>
  );
}

const s = {
  row:         { display:'flex', alignItems:'center', gap:9, background:'rgba(51,51,51,0.35)', borderRadius:10, padding:'8px 9px', marginBottom:5, border:'1px solid rgba(255,255,255,0.05)' },
  avatarWrap:  { position:'relative', width:46, height:46, flexShrink:0 },
  avatar:      { width:46, height:46, borderRadius:8, objectFit:'cover', display:'block' },
  avatarLetter:{ width:46, height:46, borderRadius:8, background:'rgba(166,148,89,0.18)', border:'1px solid rgba(166,148,89,0.25)', alignItems:'center', justifyContent:'center', color:'#A69459', fontWeight:700, fontSize:18 },
  info:        { flex:1, minWidth:0 },
  name:        { margin:0, color:'#FFFFFF', fontWeight:600, fontSize:13, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' },
  sub:         { margin:'2px 0 0', color:'#8D8D8D', fontSize:10, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' },
  actions:     { display:'flex', gap:5, flexShrink:0 },
  btn:         { width:30, height:30, borderRadius:7, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', padding:0 },
  btnIcon:     { width:14, height:14, objectFit:'contain', filter:'brightness(3)' },
};
