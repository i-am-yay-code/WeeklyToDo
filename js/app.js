"use strict";
//Main function to create new plans
const newElement = (day) => {

    let taskText = document.querySelector('#myInput').value;


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
    newPlan.childNodes[1].onclick = () => { newPlan.style.display = "none" };

    //Make the plans cuold be checked
    //Toggling class "checked"
    newPlan.onclick = () => newPlan.classList.toggle("checked");

    //Cleaning text from input
    document.querySelector("#myInput").value = "";

}
//A function for creating a close button
const createCloseButton = (elem) => {
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    elem.appendChild(span);
}


let nowDate = new Date();
console.log(nowDate.getDay());
console.log(nowDate.getMonth());
console.log(nowDate.getDate());
console.log()

const fillDates = (date = nowDate) => {
    let currentDay = nowDate.getDay();
    let monday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1 - currentDay);
    console.log(monday.getDay())
    let tuesday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 2 - currentDay);
    console.log(tuesday.getDay())
    let wednesday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 3 - currentDay);
    console.log(wednesday.getDay())
    let thursday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 4 - currentDay);
    console.log(thursday.getDay())
    let friday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 5 - currentDay);
    console.log(friday.getDay())
    let saturday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 6 - currentDay);
    console.log(saturday.getDay())
    let sunday = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 7 - currentDay);
    console.log(sunday.getDay())
    let dates = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];


    let days = document.querySelectorAll(".head__text");
    console.log(days);
    for (let i = 0; i < days.length-1; i++) {
        console.log(days[i].innerHTML);
        let addMonth = dates[i].getMonth() < 10 ? `0${dates[i].getMonth()}` : dates[i].getMonth();
        let addString = `, ${dates[i].getDate()} . ${addMonth}`;
        days[i].innerHTML += addString
    }


}

fillDates();

