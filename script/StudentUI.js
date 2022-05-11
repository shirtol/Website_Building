export class StudentUI {
    constructor() {}

    addRow = (student, container) => {
        const studentArr = Object.entries(student);
        // const btn = document.createElement("button");
        // btn.classList.add("btn");
        const row = document.createElement("div");
        row.classList.add("row");
        // btn.textContent = "delete row";
        // row.appendChild(btn);
        studentArr.forEach((e) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = e[1];
            row.appendChild(cell);
        });
        container.appendChild(row);
    };
}
