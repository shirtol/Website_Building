import { StudentsController } from "./StudentsController.js";

export const studentController = await StudentsController.build();

const studentsArr = studentController.students;

const globalListener = () => {
    document.querySelector(".container").addEventListener("click", (e) => {
        const childrenArr = [...e.target.parentElement.parentElement.children];
        if (e.target.classList.contains("editBtn")) {
            convertToInput(childrenArr, e.target);
        }else if (
            e.target.classList.contains("cancelBtn") ||
            e.target.classList.contains("confirmBtn")
        ) {
            cancelOrConfirm(childrenArr, e.target);
        } else {
            checkDelete(e.target);
        }
    });
};

const checkDelete = (target) => {
    if (target.classList.contains("deleteBtn")){
        target.parentElement.parentElement.remove();
    }
}

const cancelOrConfirm = (rowChildren, target) => {
    document.querySelector(`#cancelBtn${target.idNum}`).style.display = "none";
    document.querySelector(`#deleteBtn${target.idNum}`).style.display = "block";
    document.querySelector(`#confirmBtn${target.idNum}`).style.display = "none";
    document.querySelector(`#editBtn${target.idNum}`).style.display = "block";
    rowChildren.forEach((child) => {
        if (child.classList.contains("cell")) {
            if (target.classList.contains("cancelBtn")) {
                child.textContent = child.firstChild.getAttribute("data-value");
            } else {
                child.textContent = child.firstChild.value;
            }
        }
    });
};

const convertToInput = (rowChildren, target) => {
    target.nextSibling.style.display = "none";
    target.nextSibling.nextSibling.style.display = "block";
    target.nextSibling.nextSibling.nextSibling.style.display =
                "block";
    target.style.display = "none";
    rowChildren.forEach((child) => {
        if (child.classList.contains("cell")) {
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("data-value", child.textContent);
            input.value = child.textContent;
            child.textContent = "";
            input.classList.add("inpCell");
            child.appendChild(input);
        }
    });
};

const searchListener = () => {
    const input = document.querySelector("#search");
    const select = document.querySelector("#searchBy");
    input.addEventListener("input", (e)=>{
        searchStudents(e.target.value, select.value);
    })
}

const searchStudents = (value, searchType) => {
    studentsArr.forEach((student) => {
        let isVisible = false;
        if(searchType === "everything"){
            Object.values(student).forEach((prop) => {
                if(!isVisible){
                    isVisible = prop.toLowerCase().includes(value.toLowerCase());
                }
            })
        } else {
            isVisible = student[searchType].toLowerCase().includes(value.toLowerCase());
        }
        document.querySelector(`[data-number-${student.id}]`).classList.toggle("hide", !isVisible);
    })
}

studentController.createTable();

globalListener();
searchListener();

studentController.sortCol("id", false);

studentController.addEventToAllRowsTitle();
