enum DayOfWeek {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}
const today = DayOfWeek.Wednesday;

// Display in browser
const output06 = document.getElementById('output06');
if (output06) {
    output06.innerHTML = `
        <li><strong>Day:</strong> ${DayOfWeek[today]}</li>
        <li><strong>Value:</strong> ${today}</li>
    `;
}