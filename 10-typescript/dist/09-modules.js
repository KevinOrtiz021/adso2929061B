"use strict";
// 09 - Modules: ejemplo conceptual (sin imports reales)
class Student {
    constructor(name, grade) {
        this.name = name;
        this.grade = grade;
    }
}
const student = new Student("Laura", 95);
// Display in browser
const output09 = document.getElementById('output09');
if (output09) {
    output09.innerHTML = `
        <li><strong>Student:</strong> ${student.name}</li>
        <li><strong>Grade:</strong> ${student.grade}</li>
    `;
}
