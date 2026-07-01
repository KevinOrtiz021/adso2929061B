import iconSearch from "../assets/Search.svg";
import iconPencil from "../assets/Pencil.svg";
import iconDelete from "../assets/Delete.svg";

const IMAGE_BASE = 'http://127.0.0.1:8000/storage/pets/';

export default function PetRow({ pet, onView, onEdit, onDelete }) {
  const getImageSrc = () => {
    if (!pet.image) return null;
    if (pet.image.startsWith('http') || pet.image.startsWith('data:')) return pet.image;
    if (pet.imageUrl) return pet.imageUrl;
    if (pet.image !== 'no-image.png' && pet.image !== 'no-photo.png') {
      return `${IMAGE_BASE}${pet.image}`;
    }
    return null;
  };

  const imgSrc = getImageSrc();
  const initials = (pet.name?.[0] ?? "?").toUpperCase();

  return (
    <div className="petrow-row">
      <div className="petrow-av">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={pet.name}
            className="petrow-avImg"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div className="petrow-avLetter" style={{ display: imgSrc ? "none" : "flex" }}>
          {initials}
        </div>
      </div>

      <div className="petrow-info">
        <p className="petrow-name">{pet.name}</p>
        <p className="petrow-sub">
          {pet.kind} – {pet.breed || pet.bread}
        </p>
      </div>

      <div className="petrow-btns">
        <button className="petrow-btn" onClick={onView} title="Ver">
          <img src={iconSearch} alt="ver" className="petrow-bico" />
        </button>
        <button className="petrow-btn" onClick={onEdit} title="Editar">
          <img src={iconPencil} alt="editar" className="petrow-bico" />
        </button>
        <button className="petrow-btn" onClick={onDelete} title="Eliminar">
          <img src={iconDelete} alt="eliminar" className="petrow-bico" />
        </button>
      </div>
    </div>
  );
}