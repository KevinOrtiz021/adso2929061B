import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import { usePets } from '../hooks/useQueries';
import PetRow   from './PetRow';
import ShowPet  from './ShowPet';
import AddPet   from './AddPet';
import EditPet  from './EditPet';
import petService from '../services/petService';

import iconGrid   from '../assets/Vector__2_.png';
import iconBell   from '../assets/Vector__4_.png';
import iconAdd    from '../assets/Vector__3_.png';
import iconClose  from '../assets/Vector__1_.png';
import iconPeople from '../assets/Mask_group__1_.png';

// Colores Figma Dashboard:
// Card bg: #121116  border: #264A30 (verde oscuro sutil)
// Header bg: #121116
// Pill Mascotas borde: #264A30
// Pill CerrarSesión borde: rgba(180,60,60,0.4)
// Texto labels: #FFFFFF / #A69459
// Lista fila: #333333 20% opacity
// Iconos btn: verde #2a4a2a / dorado #4a3800 / rojo #5a1500

const PAGE_SIZE = 12;

export default function Dashboard() {
  const { logout, user } = useAuth();
  const { pets, loading, error, reload } = usePets();
  const [view,      setView]      = useState('list');
  const [activePet, setActivePet] = useState(null);
  const [page,      setPage]      = useState(0);

  const goList = ()  => { setView('list'); };
  const goView = (p) => { setActivePet(p); setView('show'); };
  const goEdit = (p) => { setActivePet(p); setView('edit'); };

  const totalPages = Math.ceil(pets.length / PAGE_SIZE);
  const pagePets   = pets.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleDelete = async (pet) => {
    const r = await Swal.fire({
      title: `¿Eliminar a ${pet.name}?`, icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c0392b', cancelButtonColor: '#444',
      confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar',
      background: '#121116', color: '#e0e0e0',
    });
    if (!r.isConfirmed) return;
    try {
      await petService.remove(pet.id);
      if (pagePets.length === 1 && page > 0) setPage(p => p - 1);
      reload();
      Swal.fire({ title:'Eliminado', icon:'success', timer:1400, showConfirmButton:false, background:'#121116', color:'#e0e0e0' });
    } catch {
      Swal.fire({ title:'Error al eliminar', icon:'error', background:'#121116', color:'#e0e0e0' });
    }
  };

  const handleLogout = async () => {
    const r = await Swal.fire({
      title: '¿Cerrar sesión?', icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#A69459', cancelButtonColor: '#444',
      confirmButtonText: 'Sí, salir', cancelButtonText: 'Cancelar',
      background: '#121116', color: '#e0e0e0',
    });
    if (r.isConfirmed) await logout();
  };

  /* Sub-vistas — sin bgImg (fondo de olas del body) */
  if (view === 'show') return <ShowPet pet={activePet} onBack={goList} />;
  if (view === 'add')  return <AddPet  onBack={goList} onCreated={() => { reload(); goList(); }} />;
  if (view === 'edit') return <EditPet pet={activePet} onBack={goList} onUpdated={() => { reload(); goList(); }} />;

  return (
    /* Sin backgroundImage — hereda fondo de olas del body */
    <div style={s.page}>
      <div style={s.card}>

        {/* HEADER */}
        <div style={s.header}>
          <div style={s.headerLeft}>
            <img src={iconGrid} alt="menu" style={s.iconSm} />
            <span style={s.headerTitle}>Dashboard</span>
          </div>
          <img src={iconBell} alt="notif" style={{ ...s.iconSm, cursor:'pointer' }} />
        </div>

        {/* BARRA ACCIONES */}
        <div style={s.actionBar}>
          <button style={s.pillGreen} onClick={() => setView('add')}>
            <img src={iconAdd} alt="add" style={s.pillIcon} />
            <span style={s.pillText}>Mascotas</span>
          </button>
          <button style={s.pillRed} onClick={handleLogout}>
            <img src={iconClose} alt="logout" style={s.pillIcon} />
            <span style={s.pillText}>Cerrar sesión</span>
          </button>
        </div>

        {/* TÍTULO LISTA */}
        <div style={s.listHeader}>
          <img src={iconPeople} alt="lista" style={s.listIcon} />
          <span style={s.listTitle}>Lista de mascotas</span>
          {user && <span style={s.badge}>{user.role}</span>}
        </div>

        {/* LISTA — paginada de 12 en 12 */}
        <div style={s.listBody}>
          {loading && <p style={s.hint}>Cargando mascotas...</p>}
          {error   && <p style={s.errMsg}>{error}</p>}
          {!loading && !error && pets.length === 0 && (
            <p style={s.hint}>No hay mascotas registradas.</p>
          )}
          {pagePets.map(pet => (
            <PetRow
              key={pet.id}
              pet={pet}
              onView={()   => goView(pet)}
              onEdit={()   => goEdit(pet)}
              onDelete={() => handleDelete(pet)}
            />
          ))}
        </div>

        {/* PAGINACIÓN */}
        {totalPages > 1 && (
          <div style={s.pagination}>
            <button
              style={{ ...s.pageBtn, opacity: page === 0 ? 0.3 : 1 }}
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
            >‹</button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                style={{ ...s.pageBtn, ...(i === page ? s.pageBtnActive : {}) }}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}

            <button
              style={{ ...s.pageBtn, opacity: page === totalPages - 1 ? 0.3 : 1 }}
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
            >›</button>
          </div>
        )}

        {/* Info página */}
        {totalPages > 1 && (
          <p style={s.pageInfo}>
            Página {page + 1} de {totalPages} · {pets.length} mascotas
          </p>
        )}

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
    background: 'transparent',   /* hereda fondo de olas del body */
  },

  /* Card: color #121116 del Figma, borde verde oscuro #264A30 */
  card: {
    width: 360,
    borderRadius: 22,
    overflow: 'hidden',
    boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
    background: '#121116',
    border: '1px solid #264A30',
  },

  /* Header */
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 18px',
    borderBottom: '1px solid rgba(38,74,48,0.6)',
  },
  headerLeft:  { display:'flex', alignItems:'center', gap:8 },
  headerTitle: { color:'#FFFFFF', fontWeight:600, fontSize:15 },
  iconSm:      { width:17, height:17, objectFit:'contain', opacity:0.85, filter:'brightness(2)' },

  /* Pills */
  actionBar: {
    display: 'flex', gap:10, padding:'11px 14px',
    borderBottom: '1px solid rgba(38,74,48,0.3)',
  },
  pillGreen: {
    display:'flex', alignItems:'center', gap:6,
    padding:'6px 16px', borderRadius:20,
    border:'1px solid #264A30',
    background:'transparent', cursor:'pointer',
  },
  pillRed: {
    display:'flex', alignItems:'center', gap:6,
    padding:'6px 16px', borderRadius:20,
    border:'1px solid rgba(180,60,60,0.5)',
    background:'transparent', cursor:'pointer',
  },
  pillIcon: { width:14, height:14, objectFit:'contain', filter:'brightness(2)', opacity:0.9 },
  pillText: { color:'#FFFFFF', fontSize:12, fontWeight:500 },

  /* Lista */
  listHeader: {
    display:'flex', alignItems:'center', gap:7,
    padding:'10px 18px 5px',
  },
  listIcon:  { width:15, height:15, objectFit:'contain', opacity:0.75, filter:'brightness(2)' },
  listTitle: { color:'#FFFFFF', fontWeight:600, fontSize:13, flex:1 },
  badge:     { color:'#A69459', fontSize:11, fontStyle:'italic' },

  listBody: { padding:'4px 12px 8px' },
  hint:     { color:'#666', fontSize:12, textAlign:'center', padding:'16px 0' },
  errMsg:   { color:'#ff6b6b', fontSize:11, margin:'4px', background:'rgba(255,0,0,0.1)', borderRadius:6, padding:'5px 8px' },

  /* Paginación */
  pagination: {
    display:'flex', alignItems:'center', justifyContent:'center', gap:4,
    padding:'8px 14px',
    borderTop:'1px solid rgba(38,74,48,0.3)',
  },
  pageBtn: {
    width:30, height:30, borderRadius:8,
    border:'1px solid rgba(166,148,89,0.3)',
    background:'transparent', color:'#A69459',
    fontSize:13, cursor:'pointer', fontWeight:600,
    display:'flex', alignItems:'center', justifyContent:'center',
    transition:'background 0.15s',
  },
  pageBtnActive: {
    background:'linear-gradient(135deg,#915921,#F6D25A)',
    color:'#030303',
    border:'1px solid transparent',
  },
  pageInfo: {
    textAlign:'center', color:'#666', fontSize:10,
    padding:'4px 0 10px',
  },
};
