import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/AuthContext";
import { usePets } from "../hooks/useQueries";
import PetRow from "./PetRow";
import petService from "../services/petService";
import iconGrid from "../assets/Vector__1_.svg";
import iconBell from "../assets/Vector__1_.png";
import iconPlus from "../assets/Vector_2.svg";
import iconX from "../assets/Vector_3.svg";
import iconPeople from "../assets/Mask_group__1_.png";

const PAGE_SIZE = 12;

export default function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { pets, loading, error, reload } = usePets();
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(pets.length / PAGE_SIZE);
  const pagePets = pets.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleDelete = async (pet) => {
    const r = await Swal.fire({
      title: `¿Eliminar a ${pet.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      cancelButtonColor: "#444",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#121116",
      color: "#e0e0e0",
    });
    if (!r.isConfirmed) return;
    try {
      await petService.remove(pet.id);
      if (pagePets.length === 1 && page > 0) setPage((p) => p - 1);
      reload();
      Swal.fire({
        title: "Eliminado",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
        background: "#121116",
        color: "#e0e0e0",
      });
    } catch {
      Swal.fire({
        title: "Error al eliminar",
        icon: "error",
        background: "#121116",
        color: "#e0e0e0",
      });
    }
  };

  const handleLogout = async () => {
    const r = await Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#A69459",
      cancelButtonColor: "#444",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      background: "#121116",
      color: "#e0e0e0",
    });
    if (r.isConfirmed) {
      await logout();
      navigate('/login');
    }
  };

  return (
    <div className="page">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="dashboard-hLeft">
            <img src={iconGrid} alt="grid" className="dashboard-hIcon" />
            <span className="dashboard-hTitle">Dashboard</span>
          </div>
          <img src={iconBell} alt="bell" className="dashboard-hIcon" />
        </div>

        <div className="dashboard-pills">
          <button className="dashboard-pillGreen" onClick={() => navigate('/challenge/add')}>
            <img src={iconPlus} alt="+" className="dashboard-pillIco" />
            <span>Mascotas</span>
          </button>
          <button className="dashboard-pillGray" onClick={handleLogout}>
            <img src={iconX} alt="x" className="dashboard-pillIco" />
            <span>Cerrar sesión</span>
          </button>
        </div>

        <div className="dashboard-listHead">
          <img src={iconPeople} alt="list" className="dashboard-listIco" />
          <span className="dashboard-listTitle">Lista de mascotas</span>
          {user && <span className="dashboard-badge">{user.role}</span>}
        </div>

        <div className="dashboard-listBody">
          {loading && <p className="dashboard-hint">Cargando...</p>}
          {error && <p className="dashboard-errMsg">{error}</p>}
          {!loading && !error && pets.length === 0 && (
            <p className="dashboard-hint">Sin mascotas registradas.</p>
          )}
          {pagePets.map((pet) => (
            <PetRow
              key={pet.id}
              pet={pet}
              onView={() => navigate(`/challenge/show/${pet.id}`)}
              onEdit={() => navigate(`/challenge/edit/${pet.id}`)}
              onDelete={() => handleDelete(pet)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="dashboard-pagination">
            <button
              className="dashboard-pgBtn"
              style={{ opacity: page === 0 ? 0.3 : 1 }}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              ◀
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`dashboard-pgBtn ${i === page ? 'dashboard-pgActive' : ''}`}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="dashboard-pgBtn"
              style={{ opacity: page === totalPages - 1 ? 0.3 : 1 }}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
            >
              ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
}