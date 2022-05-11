import { Student } from "./Student.js";

const getFetchedData = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};

const getArrOfStudents = async () => {
    try {
        const data = await getFetchedData(
            "https://capsules-asb6.herokuapp.com/api/teacher/mordi"
        );
        const specificData = await Promise.all(
            data.map(async (person) => {
                const studentData = await getFetchedData(
                    `https://capsules-asb6.herokuapp.com/api/user/${person.id}`
                );
                const student = new Student(studentData);
                return student;
            })
        );
        return specificData;
    } catch (err) {
        console.log(err);
    }
};

const students = await getArrOfStudents();

const addRow = (student, container) => {
    const studentArr = Object.entries(student);
    const row = document.createElement("div");
    row.classList.add("row");
    studentArr.forEach((e) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = e[1];
        row.appendChild(cell);
    });
    addButtons(row);
    container.appendChild(row);
    counter++;
};

const addButtons = (row) => {
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btnContainer");
    addEditBtn(btnContainer);
    addCancelBtn(btnContainer);
    addConfirmBtn(btnContainer);
    row.appendChild(btnContainer);
};

const addConfirmBtn = (container) =>{
    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Confrim";
    confirmBtn.id = `confirmBtn${counter}`;
    confirmBtn.idNum = counter;
    confirmBtn.classList.add("confirmBtn");
    confirmBtn.style.display = "none";
    container.appendChild(confirmBtn);
}

const addCancelBtn = (container) =>{
    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.id = `cancelBtn${counter}`;
    cancelBtn.idNum = counter;
    cancelBtn.classList.add("cancelBtn");
    cancelBtn.style.display = "none";
    container.appendChild(cancelBtn);
}

const addEditBtn = (container) =>{
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.id = `editBtn${counter}`;
    editBtn.idNum = counter;
    editBtn.classList.add("editBtn");
    if(counter === 0){
        editBtn.style.visibility = "hidden";
    }
    container.appendChild(editBtn);
}

const globalListener = () =>{
    document.querySelector(".container").addEventListener("click", (e)=>{
        const childrenArr = [...e.target.parentElement.parentElement.children];
        if(e.target.classList.contains("editBtn")){
            e.target.nextSibling.style.display = "block";
            e.target.nextSibling.nextSibling.style.display = "block";
            e.target.style.display = "none";
            convertToInput(childrenArr);
        }
        if(e.target.classList.contains("cancelBtn") || e.target.classList.contains("confirmBtn")){
            cancelOrConfirm(childrenArr, e.target);
        }
    })
}

const cancelOrConfirm = (rowChildren, target) =>{
    document.querySelector(`#cancelBtn${target.idNum}`).style.display = "none";;
    document.querySelector(`#confirmBtn${target.idNum}`).style.display = "none";;
    document.querySelector(`#editBtn${target.idNum}`).style.display = "block";;
    rowChildren.forEach((child) =>{
        if(child.classList.contains("cell")){
            if(target.classList.contains("cancelBtn")){
                child.textContent = child.firstChild.getAttribute("data-value");
            } else{
                child.textContent = child.firstChild.value;
            }
        }
    })
}

const convertToInput = (rowChildren) =>{
    rowChildren.forEach((child) =>{
        if(child.classList.contains("cell")){
            const input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("data-value", child.textContent);
            input.value = child.textContent;
            child.textContent = "";
            input.classList.add("inpCell");
            child.appendChild(input);
        }
    })
}

let counter = 0;

addRow(
    {
        0: "id",
        1: "name",
        2: "last name",
        3: "capsule",
        4: "age",
        5: "city",
        6: "gender",
        7: "hobby",
    },
    document.querySelector(".container")
);

students.forEach((student) => [
    addRow(student, document.querySelector(".container")),
]);

globalListener();