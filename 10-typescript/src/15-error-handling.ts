// 15 - Error Handling: manejo de errores con try/catch

function calculateDivision(a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero is not allowed");
    return a / b;
}

let message: string;

try {
    const result = calculateDivision(10, 2);
    message = `Result: ${result}`;
} catch (error: any) {
    message = `Error: ${error.message}`;
}

// Display in browser
const output15 = document.getElementById('output15');
if (output15) {
    output15.innerHTML = `<li>${message}</li>`;
}