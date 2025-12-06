function Log(constructor: Function) {
    console.log(`Se creó la clase: ${constructor.name}`);
}

@Log
class Book {
    title = "Libro simple";
    author = "Autor desconocido";

    describe() {
        return `${this.title} por ${this.author}`;
    }
}

const book = new Book();

// Display in browser
const output08 = document.getElementById('output08');
if (output08) {
    output08.innerHTML = `
        <li>${book.describe()}</li>
    `;
}