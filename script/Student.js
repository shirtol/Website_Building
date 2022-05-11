export class Student {
    static get props(){
        return ["id", "firstName", "lastName", "capsule", "age", "city", "gender", "hobby"];
    }
    constructor({
        id,
        firstName,
        lastName,
        capsule,
        age,
        city,
        gender,
        hobby,
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.capsule = capsule.toString();
        this.age = age;
        this.city = city;
        this.gender = gender;
        this.hobby = hobby;
        this.visibility = true;
    }
}
