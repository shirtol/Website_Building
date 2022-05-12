import { StudentsController } from "./StudentsController.js";
import { Student } from "./Student.js";

export const studentController = await StudentsController.build();

const studentsArr = studentController.students;

const globalListener = () => {
    document.querySelector(".container").addEventListener("click", (e) => {
        const childrenArr = [...e.target.parentElement.parentElement.children];
        if (e.target.classList.contains("editBtn")) {
            convertToInput(childrenArr, e.target);
        } else if (
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
    if (target.classList.contains("deleteBtn")) {
        const id = target.parentElement.parentElement.firstChild.textContent;
        for (let i = 0; i < studentsArr.length; i++) {
            if (studentsArr[i].id === id) {
                studentsArr.splice(i, 1);
                break;
            }
        }
        target.parentElement.parentElement.remove();
    }
};

const cancelOrConfirm = (rowChildren, target) => {
    document.querySelector(`#cancelBtn${target.idNum}`).style.display = "none";
    document.querySelector(`#deleteBtn${target.idNum}`).style.display = "block";
    document.querySelector(`#confirmBtn${target.idNum}`).style.display = "none";
    document.querySelector(`#editBtn${target.idNum}`).style.display = "block";
    rowChildren.forEach((child, idx) => {
        if (child.classList.contains("cell") && idx > 0) {
            if (
                target.classList.contains("cancelBtn") ||
                child.firstChild.value ===
                    child.firstChild.getAttribute("data-value")
            ) {
                child.textContent = child.firstChild.getAttribute("data-value");
            } else {
                child.textContent = child.firstChild.value;
                updateStudentsArr(
                    rowChildren[0].textContent,
                    idx,
                    child.textContent
                );
            }
        }
    });
};

const updateStudentsArr = (studentId, propIndex, value) => {
    const props = Student.props;
    for (let student of studentsArr) {
        if (student.id === studentId) {
            student[props[propIndex]] = value;
            break;
        }
    }
};

const convertToInput = (rowChildren, target) => {
    target.nextSibling.style.display = "none";
    target.nextSibling.nextSibling.style.display = "block";
    target.nextSibling.nextSibling.nextSibling.style.display = "block";
    target.style.display = "none";
    rowChildren.forEach((child, idx) => {
        if (child.classList.contains("cell") && idx > 0) {
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

const enterListener = () => {
    document.querySelector(".table").addEventListener("keyup", (e) => {
        const childrenArr = [...e.target.parentElement.parentElement.children];
        if (e.key === "Enter" || e.key === "Escape") {
            let idx = e.key === "Enter" ? 3 : 2;
            const btn =
                e.target.parentElement.parentElement.lastChild.children[idx];
            cancelOrConfirm(childrenArr, btn);
        }
    });
};

const searchListener = () => {
    const input = document.querySelector("#search");
    const select = document.querySelector("#searchBy");
    input.addEventListener("input", (e) => {
        searchStudents(e.target.value, select.value);
    });
};

const searchStudents = (value, searchType) => {
    const props = Student.props;
    studentsArr.forEach((student) => {
        let isVisible = false;
        if (searchType === "everything") {
            props.forEach((prop) => {
                if (!isVisible) {
                    isVisible = student[prop]
                        .toLowerCase()
                        .startsWith(value.toLowerCase());
                }
            });
        } else {
            isVisible = student[searchType]
                .toLowerCase()
                .startsWith(value.toLowerCase());
        }
        student.visibility = isVisible;
        document
            .querySelector(`[data-number-${student.id}]`)
            .classList.toggle("hide", !isVisible);
    });
};

const getWeather = async (cityName) => {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=c7655ed43d404d960e1709cac30f60be`
        );
        const data = await res.json();
        if (data.cod === "404") {
            throw new Error(`${cityName} not found!`);
        }
        const current = data.list[0];
        return new Promise(async (resolve, reject) => {
            resolve({
                city: data.city.name,
                country: data.city.country,
                temp: (current.main.temp - 273.15).toFixed(1) + "°",
                description: current.weather[0].description,
            });
        });
    } catch (err) {
        console.log(err);
    }
};

const addEventToWeather = () => {
    let timeoutId = 0;
    document.querySelector(".table").addEventListener("mouseover", (e) => {
        if (e.target.getAttribute("data-type") === "city") {
            timeoutId = setTimeout(async () => {
                const weatherData = await getWeather(
                    e.target.textContent.toLowerCase()
                );
                e.target.lastChild.firstChild.textContent = `${weatherData.city}, ${weatherData.country}`;
                e.target.lastChild.lastChild.textContent = `${weatherData.temp}, ${weatherData.description}`;
                e.target.lastChild.style.display = "flex";
            }, 1000);
        }
    });
    document.querySelector(".table").addEventListener("mouseout", (e) => {
        if (e.target.getAttribute("data-type") === "city") {
            e.target.lastChild.firstChild.textContent = "";
            e.target.lastChild.lastChild.textContent = "";
            e.target.lastChild.style.display = "none";
            clearTimeout(timeoutId);
        }
    });
};

addEventToWeather();

studentController.createTable();

globalListener();
searchListener();
enterListener();

studentController.sortCol("id", false);

studentController.addEventToAllRowsTitle();

document
    .querySelector(".resetBtn")
    .addEventListener("click", () => window.location.reload());
