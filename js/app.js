"use strict";
//Main function to create new plans
const newElement = (day, taskText = document.querySelector('#myInput').value, addToLocal = true) => {


    //Handle empty string
    if (taskText === "") {
        alert("I can`t create a task without description...\nPlease, enter something");
        return;
    }


    //Creating new element
    let newPlan = document.createElement("li");

    //New element`s text is a text in input
    newPlan.textContent = taskText;

    //Appending new point
    let allPlans = document.querySelector(`#day${day}`);
    allPlans.append(newPlan);

    //Creating a close button
    createCloseButton(newPlan);

    //Making the button deletes a plan
    newPlan.childNodes[1].onclick = () => {
        //Make the plan dissapear
        newPlan.style.display = "none"

        //Delete it from local storage
        let tasksInLocalStorage = localStorage.getItem(`day${day}`)
        //If there`s some tasks on this day, try to delete our task
        //If the local storage for this day is null, continue
        if (tasksInLocalStorage != null) {
            localStorage.setItem(`day${day}`, tasksInLocalStorage.replace(`\n${taskText}`, ''));
        }
    };

    //Make the plans cuold be checked
    //Toggling class "checked"
    newPlan.onclick = () => newPlan.classList.toggle("checked");

    //Cleaning text from input
    document.querySelector("#myInput").value = "";


    //Add an element to localStorage
    if (addToLocal === true) {
        let tasksInLocalStorage = localStorage.getItem(`day${day}`) === null ? "" : localStorage.getItem(`day${day}`)
        localStorage.setItem(`day${day}`, tasksInLocalStorage + "\n" + taskText);
    }
}
//A function for creating a close button
const createCloseButton = (elem) => {
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    elem.appendChild(span);
}

//Creating a Date obj
//We will use it to fill the dates in the schedule
let nowDate = new Date();


//Function to fill all the days with dates that corresponds them
const fillDates = (date = nowDate) => {
    let currentDay = nowDate.getDay();
    let monday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1 - currentDay);
    let tuesday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 2 - currentDay);
    let wednesday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 3 - currentDay);
    let thursday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 4 - currentDay);
    let friday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 5 - currentDay);
    let saturday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 6 - currentDay);
    let sunday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 7 - currentDay);
    let dates = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

    // Appending the dates to the text inside .head__text
    let days = document.querySelectorAll(".head__text");
    for (let i = 0; i < days.length - 1; i++) {
        let addMonth = dates[i].getMonth() + 1 < 10 ? `0${dates[i].getMonth() + 1}` : dates[i].getMonth();
        let addString = `, ${dates[i].getDate()} . ${addMonth}`;
        days[i].innerHTML += addString;
    }
}


//Function that uses localStorage obj to
//refill all the tasks from the past usage
const resetTasks = () => {

    //Get acces to every day in storage
    for (let i = 1; i < 7; i++) {
        try {
            //get saved tasks for this day
            let tasksTemporary = localStorage.getItem(`day${i}`);

            //Get an acces to every task
            for (let elem of tasksTemporary.split("\n")) {
                //check if it is null
                if (elem === null || elem === "") {
                    continue;
                }
                //Creating new tasks with old names
                //Last argument means not to add the task to local storage again
                newElement(i, elem, false);
            }
        }
        //If there`s nothing in localStorage for this day, 
        //a handler will catch an error
        catch (TypeError) {
            console.log(`There's no saved tasks on day${i}`)
        }

    }
}

//A function to save notes to local storage
const saveNotes = () => {
    let text = document.querySelector("#notesarea").value;
    localStorage.setItem("notes", text);
}

//A function to reset notes from local storage
const resetNotes = () => {
    let text = localStorage.getItem("notes");
    document.querySelector("#notesarea").value = text;
}

//Adding event listener for #notesarea
let notes = document.querySelector("#notesarea");
notes.addEventListener("blur", saveNotes, true);


//calling a function to fill the dates
fillDates();

//calling a function to reset the tasks
resetTasks();

//calling a function to reset the notes
resetNotes();