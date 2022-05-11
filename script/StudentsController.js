import { Student } from "./Student.js";
import { StudentUI } from "./StudentUI.js";

export class StudentsController {
    static async build() {
        const data = await StudentsController.getArrOfStudents();
        return new StudentsController(data);
    }

    static getFetchedData = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    static getArrOfStudents = async () => {
        try {
            const data = await StudentsController.getFetchedData(
                "https://capsules-asb6.herokuapp.com/api/teacher/mordi"
            );
            const specificData = await Promise.all(
                data.map(async (person) => {
                    const studentData = await StudentsController.getFetchedData(
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

    constructor(studentsArr) {
        this.students = studentsArr;
        this.studentUI = new StudentUI();
        this.rowCounter = 0;
    }

    sortByProperty = (a, b, property) => {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    };

    /**
     * @description This function will invoke every time we click on a column name
     * @param {string} title
     * @param {boolean} isAscending
     */
    sortCol = async (title, isAscending) => {
        if (!isAscending) {
            this.students.sort((a, b) => this.sortByProperty(a, b, title));
        } else {
            this.students.sort((a, b) => this.sortByProperty(b, a, title));
        }
    };
}
