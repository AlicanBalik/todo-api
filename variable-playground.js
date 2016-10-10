/**
 * Created by alicanbalik on 10/10/16.
 */

//passing variables by reference

var person = {
    name: "Alican",
    age: 30
};

function updatePerson(obj) {
    // obj = {
    //   name: "Alican",
    //     age: 22
    // }; //this updates nothing.

    obj.age = 22; //this updates age.
}
updatePerson(person);
console.log(person);

// Array example

var grades = [15, 88];

function addGrades(gradesArr) {
    gradesArr.push(55); //this adds number.
    // gradesArr = [1,2,3]; //this doesn't add any number.
    debugger; //tells node where to stop the program. OFC FOR DEBUGGING!
    //node debug fileName
    //debug> cont   cont means continue

    //debug> repl we can check by manual with repl. Type varilable name, code, etc. when you are inside repl
    // debug> repl
    // Press Ctrl + C to leave debug repl
    // > gradesArr
    //     [ 15, 88, 55 ]
    // > gradesArr.push(1903);
    // 4
    // > gradesArr
    //     [ 15, 88, 55, 1903 ]
    // debug> cont
    // < [ 15, 88, 55, 1903 ]
    // debug> kill
    // program terminated
    // quit

}

addGrades(grades);
console.log(grades);