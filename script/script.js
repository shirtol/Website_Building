import { StudentsController } from "./StudentsController.js";

const studentController = new StudentsController();

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

const studentsArr = await studentController.getStudents();

studentsArr.forEach((student) => [
    studentController.studentUI.addRow(
        student,
        document.querySelector(".container")
    ),
]);

console.log(studentsArr);

studentController.sortCol("id", true);

console.log(studentsArr);
