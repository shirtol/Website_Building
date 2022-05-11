import { studentController } from "./script.js";
import { Student } from "./Student.js";

export class StudentUI {
    constructor() {
        this.titleRowEl = document.querySelector(".row");
    }

    addButtons = (row) => {
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btnContainer");
        this.addEditBtn(btnContainer);
        this.addDeleteBtn(btnContainer);
        this.addCancelBtn(btnContainer);
        this.addConfirmBtn(btnContainer);
        row.appendChild(btnContainer);
    };

    addRow = (student, container) => {
        const properties = Student.props;
        const row = document.createElement("div");
        row.classList.add("row");
        row.setAttribute(`data-number-${student.id}`,"");
        properties.forEach((prop) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = student[prop];
            row.appendChild(cell);
        });
        this.addButtons(row);
        container.appendChild(row);
        studentController.rowCounter++;
    };

    addConfirmBtn = (container) => {
        const confirmBtn = document.createElement("button");
        confirmBtn.textContent = "Confirm";
        confirmBtn.id = `confirmBtn${studentController.rowCounter}`;
        confirmBtn.idNum = studentController.rowCounter;
        confirmBtn.classList.add("confirmBtn");
        confirmBtn.style.display = "none";
        container.appendChild(confirmBtn);
    };

    addCancelBtn = (container) => {
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.id = `cancelBtn${studentController.rowCounter}`;
        cancelBtn.idNum = studentController.rowCounter;
        cancelBtn.classList.add("cancelBtn");
        cancelBtn.style.display = "none";
        container.appendChild(cancelBtn);
    };

    addDeleteBtn = (container) => {
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = `deleteBtn${studentController.rowCounter}`;
        deleteBtn.idNum = studentController.rowCounter;
        deleteBtn.classList.add("deleteBtn");
        container.appendChild(deleteBtn);
    };

    addEditBtn = (container) => {
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.id = `editBtn${studentController.rowCounter}`;
        editBtn.idNum = studentController.rowCounter;
        editBtn.classList.add("editBtn");
        container.appendChild(editBtn);
    };

    createTable = (studentsArr) => {
        const studentsContainer = document.createElement("div");
        studentsContainer.classList.add("container");
        studentsArr.forEach((student) =>
            this.addRow(student, studentsContainer)
        );
        document.querySelector(".container").appendChild(studentsContainer);
    };
}
