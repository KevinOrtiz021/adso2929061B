// Funtion with typed parameters & return type
function calculateAttack(baseDamage: number, multiplier: number): number {
    return baseDamage * multiplier;
}

const attack = calculateAttack(15, 2);
const output03 = document.getElementById('output03');

if(output03) {
    output03.innerHTML = `
        <li><strong>Base Damage: </strong>15</li>
        <li><strong>Multiplier: </strong>3X</li>
        <li><strong>Total Attack: </strong>${attack}</li>`
}