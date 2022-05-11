import { Student } from "./Student.js";
import { StudentUI } from "./StudentUI.js";

export class StudentsController {
    constructor() {
        this.getStudents = async () => await this.getArrOfStudents();
        this.studentUI = new StudentUI();
    }

    getFetchedData = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    getArrOfStudents = async () => {
        try {
            const data = await this.getFetchedData(
                "https://capsules-asb6.herokuapp.com/api/teacher/mordi"
            );
            const specificData = await Promise.all(
                data.map(async (person) => {
                    const studentData = await this.getFetchedData(
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
    sortCol = async (title, isAscending, students) => {
        if (!isAscending) {
            (await this.getStudents()).sort(
                this.sortByProperty(students[a], students[b], title)
            );
        }
        (await this.getStudents()).sort(
            this.sortByProperty(students[b], students[a], title)
        );
    };
}
