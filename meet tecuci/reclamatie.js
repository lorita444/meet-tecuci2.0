function genereazaCodReclamatie() {
    return Math.floor(1000 + Math.random() * 9000)
}

function validareEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return regexEmail.test(email)
}

function validareTelefon(telefon) {
    const regexTelefon = /^07\d{8}$/
    return regexTelefon.test(telefon)
}

function validareNume(nume) {
    return nume.trim() !== ''
}

const formular = document.getElementById('reclamatie-form')

formular.addEventListener('submit', function (event) {
    event.preventDefault()

    const nume = document.getElementById('nume').value;
    const email = document.getElementById('email').value;
    const telefon = document.getElementById('telefon').value;
    const categorie = document.getElementById('categorie').value;
    const descriere = document.getElementById('descriere').value;

    if (!validareNume(nume)) {
        alert('Numele nu poate fi gol!')
        return;
    }

    if (!validareEmail(email)) {
        alert('Adresa de email nu este validă!')
        return;
    }

    if (!validareTelefon(telefon)) {
        alert('Numărul de telefon nu este valid! Trebuie să înceapă cu 07 și să aibă 10 cifre.')
        return;
    }

    const cod = genereazaCodReclamatie();

    const reclamatie = { cod, nume, email, telefon, categorie, descriere }

    let reclamatii = JSON.parse(localStorage.getItem('reclamatii')) || []
    reclamatii.push(reclamatie);
    localStorage.setItem('reclamatii', JSON.stringify(reclamatii))

    formular.reset();

    alert(`Reclamația a fost salvată cu succes! Codul tău este: ${cod}`)
});
