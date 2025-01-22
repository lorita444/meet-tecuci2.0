var istoric = document.querySelector(".istoric_mustar");
var poza3 = document.querySelector('.poza3');  
var poza4 = document.querySelector('.poza4');  

poza3.style.transition = 'opacity 0.5s ease';
poza4.style.transition = 'opacity 0.5s ease';

istoric.addEventListener('mouseenter', function() {
    poza3.style.opacity = '0';
    poza4.style.opacity = '0';
});

istoric.addEventListener('mouseleave', function() {
    poza3.style.opacity = '1';
    poza4.style.opacity = '1';
});

let traduceri = {};

function schimba(lmb) {
    localStorage.setItem("selectedLanguage", lmb);
    tradu(lmb);
}

function tradu(lmb) {
    fetch(`limbi/${lmb}.json`)
        .then(response => response.json())
        .then(data => {
            traduceri = data;
            aplica();
        })
        .catch(err => console.log("eroare frt:", err));
}


function aplica() {
    document.getElementById("istoric_tecuci_title").textContent = traduceri["istoric_tecuci_title"];
    document.getElementById("istoric_tecuci_text").textContent = traduceri["istoric_tecuci_text"];
    document.getElementById("istoric_mustar_title").textContent = traduceri["istoric_mustar_title"];
    document.getElementById("istoric_mustar_text").textContent = traduceri["istoric_mustar_text"];
}



document.addEventListener("keydown", function (event) {
    if (event.key === "e") {
        schimba("en");
    } else if (event.key === "r") {
        schimba("ro");
    } else if(event.key === "a"){
        schimba("ar")
    }else if(event.key === "i"){
        schimba("it")
    }
});


const savedlimba = localStorage.getItem("selectedLanguage") || "ro";
tradu(savedlimba);
