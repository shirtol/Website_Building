const getData = async() => {
    const res = await fetch(
        "https://capsules-asb6.herokuapp.com/api/teacher/mordi"
    );
    const data = await res.json();
    console.table(data);
};
getData();


const students = [{
        name: "Tofik",
        lastName: "Saliba",
        id: "1",
    },
    {
        name: "Ari",
        lastName: "Wolf",
        id: "2",
    },
    {
        name: "Shir",
        lastName: "Toledano",
        id: "3",
    },
];

const addRow = (student, container) => {
    const studentArr = Object.entries(student);
    console.log("array", studentArr);
    const btn = document.createElement("button");
    btn.classList.add("btn");
    const row = document.createElement("div");
    row.classList.add("row");
    btn.textContent = "delete row"
    row.appendChild(btn)
    studentArr.forEach((e) => {
        console.log("key", e);
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = e[1];
        row.appendChild(cell);
    });

    container.appendChild(row);
};

addRow({ 0: "name", 1: "last name", 2: "ID" },
    document.querySelector(".container")
);

students.forEach((student) => [
    addRow(student, document.querySelector(".container")),
]);
const buttons = document.querySelectorAll('.btn')
buttons.forEach(function(currentBtn) {
    currentBtn.addEventListener('click', deleteRow)
})

function deleteRow(e) {
    e.target.parentElement.remove()
};