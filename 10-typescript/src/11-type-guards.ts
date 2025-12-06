// 11 - Type Guards: verificar tipos en tiempo de ejecución

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

const data: unknown = 42;
let result: string;

if (isNumber(data)) {
    result = `It is a number: ${data}`;
} else {
    result = "Not a number.";
}

// Display in browser
const output11 = document.getElementById('output11');
if (output11) {
    output11.innerHTML = `<li>${result}</li>`;
}