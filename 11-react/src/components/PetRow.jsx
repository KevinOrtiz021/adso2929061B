// PetRow — Avatar cuadrado, nombre/subtítulo, 3 botones icono
import iconSearch from "../assets/Search.svg";
import iconPencil from "../assets/Pencil.svg";
import iconDelete from "../assets/Delete.svg";

const IMAGE_BASE = 'http://127.0.0.1:8000/storage/pets/';
const DEFAULT_IMAGE = 'https://placehold.co/44x44/1a1a1a/444?text=?';

export default function PetRow({ pet, onView, onEdit, onDelete }) {
  // Función para obtener la URL de la imagen
  const getImageSrc = () => {
    if (!pet.image) return null;
    
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
    
    return null;
  };

  const imgSrc = getImageSrc();
  const initials = (pet.name?.[0] ?? "?").toUpperCase();

  return (
    <div style={s.row}>
      {/* Avatar */}
      <div style={s.av}>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={pet.name}
            style={s.avImg}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div style={{ ...s.avLetter, display: imgSrc ? "none" : "flex" }}>
          {initials}
        </div>
      </div>

      {/* Info */}
      <div style={s.info}>
        <p style={s.name}>{pet.name}</p>
        <p style={s.sub}>
          {pet.kind} – {pet.breed || pet.bread}
        </p>
      </div>

      {/* Botones */}
      <div style={s.btns}>
        <button style={s.btn} onClick={onView} title="Ver">
          <img src={iconSearch} alt="ver" style={s.bico} />
        </button>
        <button style={s.btn} onClick={onEdit} title="Editar">
          <img src={iconPencil} alt="editar" style={s.bico} />
        </button>
        <button style={s.btn} onClick={onDelete} title="Eliminar">
          <img src={iconDelete} alt="eliminar" style={s.bico} />
        </button>
      </div>
    </div>
  );
}

const s = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(50,50,50,0.4)",
    borderRadius: 10,
    padding: "7px 8px",
    marginBottom: 5,
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "background 0.2s",
  },
  av: { 
    position: "relative", 
    width: 44, 
    height: 44, 
    flexShrink: 0 
  },
  avImg: {
    width: 44,
    height: 44,
    borderRadius: 8,
    objectFit: "cover",
    display: "block",
  },
  avLetter: {
    width: 44,
    height: 44,
    borderRadius: 8,
    background: "rgba(166,148,89,0.15)",
    border: "1px solid rgba(166,148,89,0.2)",
    alignItems: "center",
    justifyContent: "center",
    color: "#A69459",
    fontWeight: 700,
    fontSize: 17,
  },
  info: { 
    flex: 1, 
    minWidth: 0 
  },
  name: {
    margin: 0,
    color: "#fff",
    fontWeight: 600,
    fontSize: 12,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  sub: {
    margin: "2px 0 0",
    color: "#777",
    fontSize: 10,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  btns: { 
    display: "flex", 
    gap: 4, 
    flexShrink: 0 
  },
  btn: {
    width: 28,
    height: 28,
    borderRadius: 7,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    transition: "all 0.2s",
  },
  bico: {
    width: 14,
    height: 14,
    objectFit: "contain",
    display: "block",
  },
};