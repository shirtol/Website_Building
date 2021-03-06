import { SortOptions } from "./SortOptions.js";
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
        this.sortOptions = new SortOptions("id");
    }

    createTable = () => this.studentUI.createTable(this.students);

    sortByProperty = (a, b, property) => {
        if (property === "name" || property === "last-name") {
            return a[property].localeCompare(b[property], "heb");
        } else if (property === "hobby") {
            if (a[property].toLowerCase() < b[property].toLowerCase())
                return -1;
            if (a[property].toLowerCase() > b[property].toLowerCase()) return 1;
            return 0;
        } else {
            if (a[property] < b[property]) return -1;
            if (a[property] > b[property]) return 1;
            return 0;
        }
    };

    /**
     * @description This function will invoke every time we click on a column name
     */
    sortCol = () => {
        if (this.sortOptions.isAscending) {
            this.students.sort((a, b) =>
                this.sortByProperty(a, b, this.sortOptions.title)
            );
        } else {
            this.students.sort((a, b) =>
                this.sortByProperty(b, a, this.sortOptions.title)
            );
        }
    };

    addEventToAllRowsTitle = () => {
        [...this.studentUI.titleRowEl.children].forEach((cell) => {
            if (cell.id === "buttons") {
                return;
            }
            cell.addEventListener("click", (e) => {
                if (this.sortOptions.title !== e.target.getAttribute("id")) {
                    this.sortOptions = new SortOptions(
                        e.target.getAttribute("id")
                    );
                } else {
                    this.sortOptions.isAscending =
                        !this.sortOptions.isAscending;
                }
                this.sortCol();
                document.querySelector(".container").lastChild.remove();
                this.createTable();
            });
        });
    };
}
