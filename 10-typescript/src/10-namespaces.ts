// 10 - Namespaces: organizar código dentro de un contenedor lógico

namespace Space {
    export class Planet {
        constructor(public name: string, public size: number) {}
    }

    export function describe(planet: Planet): string {
        return `${planet.name} is ${planet.size} km in diameter.`;
    }
}

const mars = new Space.Planet("Mars", 6779);
const info = Space.describe(mars);

// Display in browser
const output10 = document.getElementById('output10');
if (output10) {
    output10.innerHTML = `
        <li>${info}</li>
    `;
}