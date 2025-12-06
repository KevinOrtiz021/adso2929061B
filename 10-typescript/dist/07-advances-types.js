"use strict";
// 07 - Advanced Types: uso de unión e intersección de tipos
const item = { title: "1984", author: "George Orwell", copies: 5 };
const availability = "New";
// Display in browser
const output07 = document.getElementById('output07');
if (output07) {
    output07.innerHTML = `
        <li><strong>Title:</strong> ${item.title}</li>
        <li><strong>Author:</strong> ${item.author}</li>
        <li><strong>Copies:</strong> ${item.copies}</li>
        <li><strong>Condition:</strong> ${availability}</li>
    `;
}
