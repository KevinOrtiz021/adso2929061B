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
        <div style={s.page}>
            <div style={s.card}>
                <div style={s.header}>
                    <div style={s.hLeft}>
                        <img src={iconGrid} alt="grid" style={s.hIcon} />
                        <span style={s.hTitle}>Dashboard</span>
                    </div>
                    <img src={iconBell} alt="bell" style={s.hIcon} />
                </div>

                <div style={s.pills}>
                    <button style={s.pillGreen} onClick={() => navigate('/challenge/add')}>
                        <img src={iconPlus} alt="+" style={s.pillIco} />
                        <span>Mascotas</span>
                    </button>
                    <button style={s.pillGray} onClick={handleLogout}>
                        <img src={iconX} alt="x" style={s.pillIco} />
                        <span>Cerrar sesión</span>
                    </button>
                </div>

                <div style={s.listHead}>
                    <img src={iconPeople} alt="list" style={s.listIco} />
                    <span style={s.listTitle}>Lista de mascotas</span>
                    {user && <span style={s.badge}>{user.role}</span>}
                </div>

                <div style={s.listBody}>
                    {loading && <p style={s.hint}>Cargando...</p>}
                    {error && <p style={s.errMsg}>{error}</p>}
                    {!loading && !error && pets.length === 0 && (
                        <p style={s.hint}>Sin mascotas registradas.</p>
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
                    <div style={s.pagination}>
                        <button
                            style={{ ...s.pgBtn, opacity: page === 0 ? 0.3 : 1 }}
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                        >
                            ◀
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                style={{ ...s.pgBtn, ...(i === page ? s.pgActive : {}) }}
                                onClick={() => setPage(i)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            style={{ ...s.pgBtn, opacity: page === totalPages - 1 ? 0.3 : 1 }}
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

const s = {
    page: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0",
        background: "transparent",
    },
    card: {
        width: 380,
        borderRadius: 30,
        overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
        background: "#121116",
        border: "2px solid #2d5a2d",
    },

    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "13px 16px",
    },
    hLeft: { display: "flex", alignItems: "center", gap: 8 },
    hTitle: { color: "#A7A4A4", fontWeight: 600, fontSize: 18 },
    hIcon: {
        width: 16,
        height: 16,
        objectFit: "contain",
        filter: "brightness(2)",
        opacity: 0.85,
    },

    pills: {
        display: "flex",
        gap: 10,
        padding: "12px 16px",
    },
    
    pillGreen: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "20px 20px",
        borderRadius: 24,
        border: "2px solid #264A30",
        background: "#264A30",
        color: "#A7A4A4",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
        flex: 1,
        '&:hover': {
            background: "#2d7a2d",
            borderColor: "#3d8a3d",
            transform: "scale(1.02)",
        }
    },
    
    pillGray: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "20px 20px",
        borderRadius: 24,
        border: "2px solid rgba(100,100,100,0.3)",
        background: "linear-gradient(90deg, #4c4c4c 0%, #bdbdbd 60%, #4c4c4c 100%)",
        color: "#ffff",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s",
        flex: 1,
        '&:hover': {
            background: "#555555",
            borderColor: "rgba(100,100,100,0.5)",
            transform: "scale(1.02)",
        }
    },
    
    pillIco: {
        width: 18,
        height: 18,
        objectFit: "contain",
        filter: "brightness(3)",
    },

    listHead: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "9px 16px 4px",
    },
    listIco: {
        width: 15,
        height: 15,
        objectFit: "contain",
        filter: "brightness(2)",
        opacity: 0.75,
    },
    listTitle: { color: "#A7A4A4", fontWeight: 600, fontSize: 16, flex: 1 },
    badge: { color: "#A69459", fontSize: 12, fontStyle: "italic" },

    listBody: { padding: "4px 10px 10px", maxHeight: 400, overflowY: "auto" },
    hint: { color: "#555", fontSize: 12, textAlign: "center", padding: "16px 0" },
    errMsg: {
        color: "#ff6b6b",
        fontSize: 11,
        background: "rgba(255,0,0,0.1)",
        borderRadius: 6,
        padding: "6px 8px",
        margin: "4px",
    },

    pagination: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "8px 14px",
        borderTop: "1px solid rgba(38,74,48,0.3)",
    },
    pgBtn: {
        width: 28,
        height: 28,
        borderRadius: 7,
        border: "1px solid rgba(166,148,89,0.3)",
        background: "transparent",
        color: "#A69459",
        fontSize: 13,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    pgActive: {
        background: "linear-gradient(135deg,#915921,#F6D25A)",
        color: "#030303",
        border: "1px solid transparent",
    },
};