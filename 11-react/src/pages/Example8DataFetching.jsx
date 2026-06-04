import { useState, useEffect } from "react";
import BtnBack from "../components/BtnBack";

const s = {
  /* Wrapper sin fondo propio */
  bg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },

  /* Tarjeta principal — tamaño fijo igual al screenshot */
  card: {
    width: "100%",
    maxWidth: 1100,
    background: "rgba(0, 0, 0, 0.57)",
    border: "1.5px solid rgba(114, 170, 194, 0.06)",
    borderRadius: 18,
    padding: "28px 32px 32px",
    position: "relative",
    backdropFilter: "blur(8px)",
    boxShadow:
      "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
  },

  h2: {
    margin: "0 0 2px 6px",
    fontSize: 22,
    fontWeight: 700,
    color: "#E2EEF9",
  },

  p: {
    margin: "0 0 22px 6px",
    fontSize: 14,
    color: "#ffffff",
  },

  /* Fila: lista + detalle */
  body: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },

  /* ─ Panel lista ─ */
  listPanel: {
    flex: "0 0 600px",
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(26,175,238,0.15)",
    borderRadius: 14,
    padding: "16px 16px 14px",
    overflow: "hidden",
  },

  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  pageLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    letterSpacing: 0.3,
  },

  pageBtn: {
    background: "rgba(27, 172, 235, 0.77)",
    border: "1px solid rgba(205, 217, 223, 0.94)",
    color: "#ffffff",
    borderRadius: 7,
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },

  /* Zona con scroll — muestra exactamente el alto del screenshot */
  scrollArea: {
    maxHeight: 480,
    overflowY: "auto",
  },

  /* Grid exactamente 4 columnas */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 10,
  },

  pokeBtn: {
    borderRadius: 9,
    padding: "12px 8px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    transition: "background 0.15s, transform 0.12s",
    fontFamily: "inherit",
  },

  pokeNum: {
    fontSize: 12,
    fontWeight: 600,
  },

  pokeName: {
    fontSize: 13,
    fontWeight: 700,
    textTransform: "Arial",
    lineHeight: 1.2,
  },

  msg: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 13,
    padding: "28px 0",
    margin: 0,
  },

  /* ─ Panel detalle ─ */
  detailPanel: {
    flex: 1,
    minWidth: 0,
  },

  detailTitle: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "#8BA0B4",
    letterSpacing: 0.4,
    marginBottom: 8,
  },

  detailBox: {
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(26,175,238,0.15)",
    borderRadius: 14,
    padding: "20px 18px",
    minHeight: 480,
  },

  detailImg: {
    width: 140,
    height: 140,
    objectFit: "contain",
    display: "block",
    margin: "4px auto 10px",
    filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.55))",
  },

  detailName: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 800,
    textTransform: "capitalize",
    color: "#E2EEF9",
    margin: "0 0 12px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    padding: "7px 0",
    borderBottom: "1px solid rgba(255,255,255,0.055)",
  },

  infoLabel: {
    color: "#8BA0B4",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  infoValue: {
    color: "#C8DFF0",
    textTransform: "capitalize",
    textAlign: "right",
    marginLeft: 8,
    fontSize: 14,
  },

  badge: {
    fontSize: 12,
    fontWeight: 700,
    color: "#fff",
    padding: "4px 12px",
    borderRadius: 20,
    textTransform: "capitalize",
    letterSpacing: 0.4,
  },
};

const TYPE_COLORS = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#F0B6BC",
};

const POKEMON_PER_PAGE = 20;

function Example8DataFetching() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [detail, setDetail] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSelected(null);
    setDetail(null);
    const offset = (page - 1) * POKEMON_PER_PAGE;
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_PER_PAGE}&offset=${offset}`,
    )
      .then((r) => r.json())
      .then((data) => {
        setTotalCount(data.count);
        const list = data.results.map((p) => ({
          id: parseInt(p.url.split("/").filter(Boolean).pop()),
          name: p.name,
        }));
        setPokemonList(list);
        setLoading(false);
        loadDetail(list[0]);
      });
  }, [page]);

  const loadDetail = async (poke) => {
    if (!poke) return;
    setSelected(poke.id);
    setDetailLoading(true);
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${poke.id}`,
    ).then((r) => r.json());
    setDetail({
      id: data.id,
      name: data.name,
      image: data.sprites?.other?.["official-artwork"]?.front_default,
      height: (data.height / 10).toFixed(1) + " m",
      weight: (data.weight / 10).toFixed(1) + " kg",
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => a.ability.name).join(", "),
    });
    setDetailLoading(false);
  };

  const totalPages = Math.ceil(totalCount / POKEMON_PER_PAGE);

  return (
    <div style={s.bg}>
      {/* Tarjeta centrada — igual al screenshot */}
      <div style={s.card}>
        {/* ── Botón back ── */}
        <BtnBack />
        {/* ── Encabezado ── */}
        <h2 style={s.h2}>Example 8: Data Fetching</h2>
        <p style={s.p}>Connect with external APIs to get real data.</p>

        {/* ── Cuerpo: lista + detalle ── */}
        <div style={s.body}>
          {/* ═══ LISTA IZQUIERDA ═══ */}
          <div style={s.listPanel}>
            {/* Header con paginación */}
            <div style={s.listHeader}>
              <span style={s.pageLabel}>Pokémon (Page {page})</span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  style={{ ...s.pageBtn, opacity: page === 1 ? 0.35 : 1 }}
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  ←
                </button>
                <button
                  style={{
                    ...s.pageBtn,
                    opacity: page === totalPages ? 0.35 : 1,
                  }}
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  →
                </button>
              </div>
            </div>

            {/* Grid 4 columnas con scroll vertical */}
            <div style={s.scrollArea}>
              {loading ? (
                <p style={s.msg}>Loading Pokémon...</p>
              ) : (
                <div style={s.grid}>
                  {pokemonList.map((poke) => {
                    const isSel = selected === poke.id;
                    return (
                      <button
                        key={poke.id}
                        onClick={() => loadDetail(poke)}
                        style={{
                          ...s.pokeBtn,
                          background: isSel
                            ? "#1AAFEE"
                            : "rgb(255, 255, 255)",
                          border: isSel
                            ? "2px solid #1AAFEE"
                            : "2px solid rgba(255,255,255,0.12)",
                          color: isSel ? "#2e2e2e" : "#414141",
                        }}
                      >
                        <span
                          style={{
                            ...s.pokeNum,
                            color: isSel ? "rgba(41, 41, 41, 0.75)" : "#525252",
                          }}
                        >
                          #{String(poke.id).padStart(3, "0")}
                        </span>
                        <span style={s.pokeName}>{poke.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {/* ═══ DETALLE DERECHO ═══ */}
          <div style={s.detailPanel}>
            <span style={s.detailTitle}>Details</span>
            <div style={s.detailBox}>
              {detailLoading ? (
                <p style={s.msg}>Loading...</p>
              ) : !detail ? (
                <p style={s.msg}>Select a Pokémon</p>
              ) : (
                <>
                  <img
                    src={detail.image}
                    alt={detail.name}
                    style={s.detailImg}
                  />
                  <p style={s.detailName}>{detail.name}</p>
                  {[
                    { label: "Height:", value: detail.height },
                    { label: "Weight:", value: detail.weight },
                    { label: "Types:", value: detail.types.join(", ") },
                    { label: "Abilities:", value: detail.abilities },
                  ].map(({ label, value }) => (
                    <div key={label} style={s.infoRow}>
                      <span style={s.infoLabel}>{label}</span>
                      <span style={s.infoValue}>{value}</span>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      marginTop: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    {detail.types.map((t) => (
                      <span
                        key={t}
                        style={{
                          ...s.badge,
                          background: TYPE_COLORS[t] || "#888",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example8DataFetching;
