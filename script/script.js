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
    container.appendChild(row);
};

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
