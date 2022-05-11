export class StudentUI {
    constructor() {}

    addRow = (student, container) => {
        const studentArr = Object.entries(student);
        const row = document.createElement("div");
        row.classList.add("row");
        studentArr.forEach((e) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = e[1];
            row.appendChild(cell);
        });
        container.appendChild(row);
    };
}
