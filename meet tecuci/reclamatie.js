emailjs.init("K9-ke6H3wXYFTT_uj");

function genereazaCodReclamatie() {
    return Math.floor(1000 + Math.random() * 9000);
}

function validareEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
}

function validareTelefon(telefon) {
    const regexTelefon = /^07\d{8}$/;
    return regexTelefon.test(telefon);
}

function validareNume(nume) {
    return nume.trim() !== '';
}

const formular = document.getElementById('reclamatie-form');
const statusDiv = document.getElementById('status');

function arataStatus(mesaj, tip) {
    statusDiv.textContent = mesaj;
    statusDiv.className = tip === 'succes' ? 'status-success' : 'status-error';
    statusDiv.classList.remove('hidden');
    
    setTimeout(() => {
        statusDiv.classList.add('hidden');
    }, 5000);
}

formular.addEventListener('submit', function (event) {
    event.preventDefault();

    const nume = document.getElementById('nume').value;
    const email = document.getElementById('email_form').value; // ID-uri actualizate!
    const telefon = document.getElementById('telefon_form').value;
    const categorie = document.getElementById('categorie').value;
    const descriere = document.getElementById('descriere').value;

    if (!validareNume(nume)) {
        arataStatus('Numele nu poate fi gol!', 'eroare');
        return;
    }

    if (!validareEmail(email)) {
        arataStatus('Adresa de email nu este validă!', 'eroare');
        return;
    }

    if (!validareTelefon(telefon)) {
        arataStatus('Numărul de telefon trebuie să înceapă cu 07 și să aibă 10 cifre.', 'eroare');
        return;
    }

    const cod = genereazaCodReclamatie();
    const reclamatie = { cod, nume, email, telefon, categorie, descriere };

    arataStatus('Se trimite reclamația...', 'succes');
    document.querySelector('button[type="submit"]').disabled = true;

    emailjs.send("service_gl79noi", "template_zan99hh", reclamatie)
        .then(function(response) {
            let reclamatii = JSON.parse(localStorage.getItem('reclamatii')) || [];
            reclamatii.push(reclamatie);
            localStorage.setItem('reclamatii', JSON.stringify(reclamatii));

            formular.reset();
            arataStatus(`Reclamația a fost trimisă cu succes pe email! Codul de urmărire: ${cod}`, 'succes');
            document.querySelector('button[type="submit"]').disabled = false;
        }, function(error) {
            console.error('EmailJS Error:', error);
            arataStatus('A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou mai târziu.', 'eroare');
            document.querySelector('button[type="submit"]').disabled = false;
        });
});
