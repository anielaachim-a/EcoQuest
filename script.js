let scor = 0;
let indexIntrebare = 0;
let raspunsDat = false;

const intrebari = [
    {
        text: "Unde arunci o sticlă de plastic goală?",
        variante: [
            "Containerul pentru hârtie",
            "Containerul pentru plastic",
            "Containerul pentru sticlă"
        ],
        corect: 1
    },
    {
        text: "Ce trebuie să faci cu o foaie de hârtie curată?",
        variante: [
            "Să o arunci la plastic",
            "Să o reciclezi la hârtie și carton",
            "Să o arunci la sticlă"
        ],
        corect: 1
    },
    {
        text: "Ce înseamnă reciclarea?",
        variante: [
            "Transformarea deșeurilor în materiale care pot fi reutilizate",
            "Aruncarea tuturor deșeurilor la un loc",
            "Arderea deșeurilor"
        ],
        corect: 0
    },
    {
        text: "Cum putem reduce consumul de plastic?",
        variante: [
            "Folosind pungi noi de fiecare dată",
            "Aruncând plasticul în natură",
            "Folosind pungi reutilizabile"
        ],
        corect: 2
    },
    {
        text: "Ce poți face cu un caiet vechi care mai are pagini nefolosite?",
        variante: [
            "Să îl arunci imediat",
            "Să îl refolosești",
            "Să îl arunci în containerul pentru sticlă"
        ],
        corect: 1
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

    zonaScor.textContent = "⭐ Scor: 0";
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

    zonaScor.textContent = "⭐ Scor: " + scor;

    const butonUrmator = document.createElement("button");
    butonUrmator.textContent = "Următoarea întrebare";

    butonUrmator.addEventListener("click", function() {
        indexIntrebare++;
        afiseazaIntrebare();
    });

    zonaRaspunsuri.appendChild(butonUrmator);
}

function afiseazaFinal() {
    zonaIntrebare.textContent = "Ai terminat quizul! ♻️";
    zonaRaspunsuri.innerHTML = "";

    zonaMesaj.textContent =
        "Ai obținut " + scor + " puncte din 50! Felicitări pentru aventura EcoQuest!";

    const butonRestart = document.createElement("button");
    butonRestart.textContent = "Reia aventura EcoQuest";

    butonRestart.addEventListener("click", function() {
        scor = 0;
        indexIntrebare = 0;

        zonaScor.textContent = "⭐ Scor: 0";
        zonaMesaj.textContent = "";

        afiseazaIntrebare();
    });

    zonaRaspunsuri.appendChild(butonRestart);
}
