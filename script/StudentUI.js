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

    createWeatherDiv = (cell) => {
        const weatherContainer = document.createElement("div");
        const cityContainer = document.createElement("div");
        const cityWeather = document.createElement("div");
        weatherContainer.classList.add("weather-box");

        weatherContainer.appendChild(cityContainer);
        weatherContainer.appendChild(cityWeather);
        cell.appendChild(weatherContainer);
    };

    addRow = (student, container) => {
        const properties = Student.props;
        const row = document.createElement("div");
        if (!student.visibility) {
            row.classList.add("hide");
        }
        row.classList.add("row");
        row.setAttribute(`data-number-${student.id}`, "");
        properties.forEach((prop) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-type", prop);
            cell.textContent = student[prop];
            if (prop === "city") {
                console.log(prop);
                this.createWeatherDiv(cell);
            }
            row.appendChild(cell);
        });
        this.addButtons(row);
        container.appendChild(row);
        studentController.rowCounter++;
    };

    addConfirmBtn = (container) => {
        const confirmBtn = document.createElement("div");
        confirmBtn.textContent = "Confirm";
        confirmBtn.id = `confirmBtn${studentController.rowCounter}`;
        confirmBtn.idNum = studentController.rowCounter;
        confirmBtn.classList.add("confirmBtn");
        confirmBtn.classList.add("btn");
        confirmBtn.classList.add("tbBtn");
        confirmBtn.style.display = "none";
        container.appendChild(confirmBtn);
    };

    addCancelBtn = (container) => {
        const cancelBtn = document.createElement("div");
        cancelBtn.textContent = "Cancel";
        cancelBtn.id = `cancelBtn${studentController.rowCounter}`;
        cancelBtn.idNum = studentController.rowCounter;
        cancelBtn.classList.add("cancelBtn");
        cancelBtn.classList.add("btn");
        cancelBtn.classList.add("tbBtn");
        cancelBtn.style.display = "none";
        container.appendChild(cancelBtn);
    };

    addDeleteBtn = (container) => {
        const deleteBtn = document.createElement("div");
        deleteBtn.textContent = "Delete";
        deleteBtn.id = `deleteBtn${studentController.rowCounter}`;
        deleteBtn.idNum = studentController.rowCounter;
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.classList.add("btn");
        deleteBtn.classList.add("tbBtn");
        container.appendChild(deleteBtn);
    };

    addEditBtn = (container) => {
        const editBtn = document.createElement("div");
        editBtn.textContent = "Edit";
        editBtn.id = `editBtn${studentController.rowCounter}`;
        editBtn.idNum = studentController.rowCounter;
        editBtn.classList.add("editBtn");
        editBtn.classList.add("btn");
        editBtn.classList.add("tbBtn");
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
