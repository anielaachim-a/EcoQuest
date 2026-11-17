
let scor = 0;
let indexIntrebare = 0;
let raspunsDat = false;

const intrebari = [
    {
        text: "Ce trebuie să faci când citești o știre surprinzătoare?",
        variante: [
            "Să o distribui imediat",
            "Să verifici informația din mai multe surse",
            "Să crezi automat titlul"
        ],
        corect: 1
    },
    {
        text: "Cum verifici dacă un site este de încredere?",
        variante: [
            "Verifici cine publică informația și sursele",
            "Te uiți doar la culorile site-ului",
            "Crezi orice găsești"
        ],
        corect: 0
    },
    {
        text: "Ce poate indica un titlu înșelător?",
        variante: [
            "Un titlu care exagerează pentru a atrage atenția",
            "Un titlu simplu și clar",
            "Un titlu care prezintă sursa"
        ],
        corect: 0
    },
    {
        text: "Ce faci dacă nu știi dacă o informație este adevărată?",
        variante: [
            "O distribui prietenilor",
            "O verifici înainte să o crezi",
            "O consideri adevărată"
        ],
        corect: 1
    },
    {
        text: "De ce este important să verificăm autorul unei știri?",
        variante: [
            "Pentru a vedea cine își asumă informația",
            "Pentru a afla câți urmăritori are",
            "Nu este important"
        ],
        corect: 0
    }
];

const butonStart = document.getElementById("start");
const zonaScor = document.getElementById("scor");
const zonaIntrebare = document.getElementById("intrebare");
const zonaRaspunsuri = document.getElementById("raspunsuri");
const zonaMesaj = document.getElementById("mesaj");

butonStart.addEventListener("click", function() {
    scor = 0;
    indexIntrebare = 0;
    zonaScor.textContent = "Scor: 0";
    butonStart.style.display = "none";
    afiseazaIntrebare();
});

function afiseazaIntrebare() {
    raspunsDat = false;
    zonaMesaj.textContent = "";
    zonaRaspunsuri.innerHTML = "";

    if (indexIntrebare >= intrebari.length) {
        afiseazaFinal();
        return;
    }

    const intrebare = intrebari[indexIntrebare];

    zonaIntrebare.textContent =
        "Întrebarea " + (indexIntrebare + 1) +
        " din " + intrebari.length + ": " + intrebare.text;

    for (let i = 0; i < intrebare.variante.length; i++) {
        const buton = document.createElement("button");

        buton.textContent = intrebare.variante[i];

        buton.addEventListener("click", function() {
            verifica(i);
        });

        zonaRaspunsuri.appendChild(buton);
    }
}

function verifica(alegere) {
    if (raspunsDat) {
        return;
    }

    raspunsDat = true;

    const intrebare = intrebari[indexIntrebare];
    const butoane = zonaRaspunsuri.querySelectorAll("button");

    butoane.forEach(function(buton) {
        buton.disabled = true;
    });

    if (alegere === intrebare.corect) {
        scor = scor + 10;
        zonaMesaj.textContent = "Corect! +10 puncte! Bravo!";
    } else {
        zonaMesaj.textContent =
            "Nu chiar! Răspunsul corect era: " +
            intrebare.variante[intrebare.corect];
    }

    zonaScor.textContent = "Scor: " + scor;

    const butonUrmator = document.createElement("button");
    butonUrmator.textContent = "Următoarea întrebare";

    butonUrmator.addEventListener("click", function() {
        indexIntrebare++;
        afiseazaIntrebare();
    });

    zonaRaspunsuri.appendChild(butonUrmator);
}

function afiseazaFinal() {
    zonaIntrebare.textContent = "Ai terminat quizul!";
    zonaRaspunsuri.innerHTML = "";

    zonaMesaj.textContent =
        "Ai obținut " + scor + " puncte din 50!";

    const butonRestart = document.createElement("button");
    butonRestart.textContent = "Joacă din nou";

    butonRestart.addEventListener("click", function() {
        scor = 0;
        indexIntrebare = 0;
        zonaScor.textContent = "Scor: 0";
        afiseazaIntrebare();
    });

    zonaRaspunsuri.appendChild(butonRestart);
}
