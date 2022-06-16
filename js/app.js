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

