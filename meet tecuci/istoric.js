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
        .catch(err => console.log("Eroare la încărcarea limbii:", err));
}

function aplica() {
    const titluTecuci = document.getElementById("tecuci");
    const textTecuci = document.querySelector(".istoric_card:nth-child(1) .istoric_text");
    const titluMustar = document.getElementById("mustar");
    const textMustar = document.querySelector(".istoric_card:nth-child(2) .istoric_text");

    if (titluTecuci && traduceri["istoric_tecuci_title"]) titluTecuci.textContent = traduceri["istoric_tecuci_title"];
    if (textTecuci && traduceri["istoric_tecuci_text"]) textTecuci.textContent = traduceri["istoric_tecuci_text"];
    
    if (titluMustar && traduceri["istoric_mustar_title"]) titluMustar.textContent = traduceri["istoric_mustar_title"];
    if (textMustar && traduceri["istoric_mustar_text"]) textMustar.textContent = traduceri["istoric_mustar_text"];
}

// Suport pentru shortcut-uri de tastatură pentru schimbarea limbii
document.addEventListener("keydown", function (event) {
    if (event.key === "e") {
        schimba("en");
    } else if (event.key === "r") {
        schimba("ro");
    } else if (event.key === "a") {
        schimba("ar");
    } else if (event.key === "i") {
        schimba("it");
    }
});

const savedlimba = localStorage.getItem("selectedLanguage") || "ro";
tradu(savedlimba);
