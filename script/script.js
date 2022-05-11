import { StudentsController } from "./StudentsController.js";

export const studentController = await StudentsController.build();

// export const studentController = new StudentsController();

// studentController.studentUI.addRow(
//     {
//         0: "id",
//         1: "name",
//         2: "last name",
//         3: "capsule",
//         4: "age",
//         5: "city",
//         6: "gender",
//         7: "hobby",
//     },
//     document.querySelector(".container")
// );

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

// const studentsArr = await studentController.getStudents();

studentsArr.forEach((student) => [
    studentController.studentUI.addRow(
        student,
        document.querySelector(".container")
    ),
]);

globalListener();

// const buttons = document.querySelectorAll('.btn')
// buttons.forEach(function(currentBtn) {
//     currentBtn.addEventListener('click', deleteRow)
// })

// function deleteRow(e) {
//     e.target.parentElement.remove()
// };

studentController.sortCol("id", false);

console.log(studentsArr);
