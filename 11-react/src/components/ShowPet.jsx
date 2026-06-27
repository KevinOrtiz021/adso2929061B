// ShowPet — Foto grande, campos con iconos, valores en dorado
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import petService from '../services/petService';
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
                console.log('📥 Datos de mascota:', data);
            } catch (err) {
                console.error('❌ Error:', err);
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
        
        if (pet.image.startsWith('http') || pet.image.startsWith('data:')) {
            return pet.image;
        }
        
        if (pet.imageUrl) {
            return pet.imageUrl;
        }
        
        if (pet.image !== 'no-image.png' && pet.image !== 'no-photo.png') {
            return `${IMAGE_BASE}${pet.image}`;
        }
        
        return DEFAULT_IMAGE;
    };

    if (loading) {
        return (
            <div style={s.page}>
                <div style={s.card}>
                    <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>
                        Cargando...
                    </div>
                </div>
            </div>
        );
    }

    if (error || !pet) {
        return (
            <div style={s.page}>
                <div style={s.card}>
                    <div style={{ textAlign: 'center', padding: '40px', color: '#ff6b6b' }}>
                        {error || 'Mascota no encontrada'}
                        <br />
                        <button onClick={() => navigate('/dashboard')} style={s.atrasBtn}>
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
                <div style={s.header}>
                    <button style={s.backBtn} onClick={() => navigate('/dashboard')}>
                        <img src={iconBack} alt="←" style={s.backIco}/>
                    </button>
                    <div style={s.titleContainer}>
                        <img src={iconSearch} alt="🔍" style={s.titleIco}/>
                        <span style={s.title}>Ver mascota</span>
                    </div>
                </div>

                <img 
                    src={imgSrc} 
                    alt={pet.name} 
                    style={s.photo}
                    onError={(e) => {
                        console.log('❌ Error cargando imagen, usando placeholder');
                        e.target.src = DEFAULT_IMAGE;
                    }}
                />

                <div style={s.fields}>
                    {fields.map(({icon,label,value})=>(
                        <div key={label} style={s.row}>
                            <img src={icon} alt={label} style={s.rIco}/>
                            <span style={s.rLabel}>{label}</span>
                            <span style={s.rValue}>{value}</span>
                        </div>
                    ))}

                    <div style={s.descWrap}>
                        <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                            <img src={iconDesc} alt="desc" style={s.rIco}/>
                            <span style={s.rLabel}>Descripcion</span>
                        </div>
                        <p style={s.descTxt}>{pet.description}</p>
                    </div>
                </div>

                <div style={s.footer}>
                    <button style={s.atrasBtn} onClick={() => navigate('/dashboard')}>Atrás</button>
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