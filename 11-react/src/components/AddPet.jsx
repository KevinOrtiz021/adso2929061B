import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import petService from "../services/petService";
import iconBack from "../assets/Flecha.svg";
import iconPaw from "../assets/Huella.svg";
import iconWeight from "../assets/Peso.svg";
import iconCalendar from "../assets/Edad.svg";
import iconRaza from "../assets/Raza.svg";
import iconPin from "../assets/Ubicacion.svg";
import iconDesc from "../assets/Descripcion.svg";

const FIELDS = [
  { label: "Nombre", name: "name", type: "text", icon: iconPaw },
  { label: "Tipo", name: "kind", type: "text", icon: iconPaw },
  { label: "Peso (lbs)", name: "weight", type: "number", icon: iconWeight },
  { label: "Edad (Años)", name: "age", type: "number", icon: iconCalendar },
  { label: "Raza", name: "breed", type: "text", icon: iconRaza },
  { label: "Ubicación", name: "location", type: "text", icon: iconPin },
];

const EMPTY = {
  name: "",
  kind: "",
  weight: "",
  age: "",
  breed: "",
  location: "",
  description: "",
  image: null,
};

export default function AddPet() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((f) => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
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
      
      await petService.create(formData);
      
      Swal.fire({
        title: '¡Creada!',
        text: 'La mascota se ha creado correctamente',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#121116',
        color: '#e0e0e0',
      });
      
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 500);
    } catch (err) {
      setError(
        err.response?.data?.message ?? err.message ?? "Error al agregar",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="addpet-card">
        <div className="addpet-header">
          <button className="addpet-backBtn" onClick={() => navigate('/dashboard')}>
            <img src={iconBack} alt="←" className="addpet-backIco" />
          </button>
          <div className="addpet-titleContainer">
            <img src={iconPaw} alt="🐾" className="addpet-titleIco" />
            <span className="addpet-title">Agregar mascota</span>
          </div>
        </div>

        <div className="addpet-body">
          <label htmlFor="add-img" className="addpet-imgBox">
            {preview ? (
              <img src={preview} alt="preview" className="addpet-previewImg" />
            ) : (
              <div className="addpet-imgPlaceholder">
                <span className="addpet-camTxt">Agregar foto</span>
              </div>
            )}
          </label>
          <input
            id="add-img"
            type="file"
            name="image"
            accept="image/*"
            style={{ display: "none" }}
            onChange={onChange}
          />

          {error && <p className="addpet-errMsg">{error}</p>}

          <form onSubmit={onSubmit}>
            {FIELDS.map(({ label, name, type, icon }) => (
              <div key={name} className="addpet-group">
                <div className="addpet-labelRow">
                  <img src={icon} alt={label} className="addpet-fIco" />
                  <span className="addpet-lbl">{label}</span>
                </div>
                <input
                  className="addpet-input"
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={onChange}
                  required
                />
              </div>
            ))}

            <div className="addpet-group">
              <div className="addpet-labelRow">
                <img src={iconDesc} alt="desc" className="addpet-fIco" />
                <span className="addpet-lbl">Descripción</span>
              </div>
              <textarea
                className="addpet-input"
                style={{ minHeight: 55, resize: "vertical" }}
                name="description"
                value={form.description}
                onChange={onChange}
                required
              />
            </div>

            <div className="addpet-btnRow">
              <button type="button" className="addpet-btnCancel" onClick={() => navigate('/dashboard')}>
                Cancelar
              </button>
              <button type="submit" className="addpet-btnAdd" disabled={loading}>
                {loading ? "..." : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}