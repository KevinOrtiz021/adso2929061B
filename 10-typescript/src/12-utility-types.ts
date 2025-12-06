// 12 - Utility Types: Partial, Readonly, Pick

interface Movie {
    title: string;
    director: string;
    year: number;
}

const original: Readonly<Movie> = {
    title: "Interstellar",
    director: "Christopher Nolan",
    year: 2014
};

const partial: Partial<Movie> = { title: "Dune" };
const selected: Pick<Movie, "title" | "year"> = { title: "Avatar", year: 2009 };

// Display in browser
const output12 = document.getElementById('output12');
if (output12) {
    output12.innerHTML = `
        <li><strong>Original:</strong> ${original.title}</li>
        <li><strong>Partial:</strong> ${partial.title}</li>
        <li><strong>Picked:</strong> ${selected.title} (${selected.year})</li>
    `;
}