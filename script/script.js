import { StudentsController } from "./StudentsController.js";

const studentController = await StudentsController.build();

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

studentsArr.forEach((student) => [
    studentController.studentUI.addRow(
        student,
        document.querySelector(".container")
    ),
]);

// const buttons = document.querySelectorAll('.btn')
// buttons.forEach(function(currentBtn) {
//     currentBtn.addEventListener('click', deleteRow)
// })

// function deleteRow(e) {
//     e.target.parentElement.remove()
// };

studentController.sortCol("id", false);

console.log(studentsArr);
