const rows = [["a"], ["b"], ["c"]];
const cols = [["1"], ["2"], ["3"]];
let player = 0;
const winningCombinations = [
    ["a1", "a2", "a3"],
    ["b1", "b2", "b3"],
    ["c1", "c2", "c3"],
    ["a1", "b1", "c1"],
    ["a2", "b2", "c2"],
    ["a3", "b3", "c3"],
    ["a1", "b2", "c3"],
    ["a3", "b2", "c1"],
];

function checkWinner(table, info) {
    return table.some((combination) => {
        return combination.every((id) => document.getElementById(id).alt === info);
    });
}
const reset = () => {
    for (let i = 0; i < 3; i++) {
        for (let j = 1; j <= 3; j++) {
            document.getElementById(rows[i] + j).src = "images/tlo.png";
            document.getElementById(rows[i] + j).alt = "tlo";
        }
    }
};
function checkFull() {
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 1; j <= 3; j++) {
            if (!(document.getElementById(rows[i] + j).alt == "tlo")) {
                count++;
            }
        }
    }
    if (count === 9) {
        reset();
        alert("Remis");
        player = 0;
    }
}

const checkForWin = () => {
    if (checkWinner(winningCombinations, "kolo")) {
        document.getElementById("wygrany").src = "images/kolo.png";
        document.getElementById("wygrany").alt = "kolo";
        player = 0;
        reset();
    } else if (checkWinner(winningCombinations, "krzyzyk")) {
        document.getElementById("wygrany").src = "images/krzyzyk.png";
        document.getElementById("wygrany").alt = "krzyzyk";
        player = 0;
        reset();
    }
};

const move = (poleid) => {
    const poleCheck = document.getElementById(poleid).alt === "tlo";
    if (poleCheck && player == 0) {
        document.getElementById(poleid).src = "images/kolo.png";
        document.getElementById(poleid).alt = "kolo";
        player = 1;
        console.log(`Pole: ${poleid}`);
        console.log(`Alt: ${document.getElementById(poleid).alt}`);
    } else if (poleCheck && player == 1) {
        document.getElementById(poleid).src = "images/krzyzyk.png";
        document.getElementById(poleid).alt = "krzyzyk";
        player = 0;
        console.log(`Pole: ${poleid}`);
        console.log(`Alt: ${document.getElementById(poleid).alt}`);
    } else {
        alert("To pole jest zajęte.");
    }
};
const klik = (poleid) => {
    const autoend = document.getElementById("autoend");
    move(poleid);
    if (autoend.checked == true) {
        checkForWin();
        checkFull();
    }
};
const resetButton = () => {
    const autoend = document.getElementById("autoend");
    if (autoend.checked == false) {
        console.log("Unchecked");
        document.getElementById("gameReset").style.display = "inline-block";
    } else {
        console.log("Checked");
        document.getElementById("gameReset").style.display = "none";
    }
};