const rows = [["a"], ["b"], ["c"]];
const cols = [["1"], ["2"], ["3"]];
let kolkoWin = 0;
let krzyzykWin = 0;
let starter = 0;
let player = starter;
let ended = false;
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

const winReset = () => {
	kolkoWin = 0;
	krzyzykWin = 0;
	document.getElementById("win2").innerHTML = krzyzykWin;
	document.getElementById("win1").innerHTML = kolkoWin;
};

const checkWinner = (table, info) => {
	return table.some((combination) => {
		return combination.every((id) => document.getElementById(id).innerHTML === info);
	});
};

const reset = () => {
	for (let i = 0; i < 3; i++) {
		for (let j = 1; j <= 3; j++) {
			document.getElementById(rows[i] + j).innerHTML = "";
            ended = false;
		}
	}
};

const checkFull = () => {
	let count = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 1; j <= 3; j++) {
			if (!(document.getElementById(rows[i] + j).innerHTML == "")) {
				count++;
			}
		}
	}
	if (count === 9) {
		reset();
		alert("Remis");
		player = starter;
	}
};

const checkForWinc = () => {
	if (checkWinner(winningCombinations, "◯")) {
        reset();
		document.getElementById("wygrany").innerHTML = "◯";
		player = starter;
		kolkoWin++;
		document.getElementById("win1").innerHTML = kolkoWin;
		console.log("Kółko wygrało!");
	} else if (checkWinner(winningCombinations, "X")) {
		reset();
		document.getElementById("wygrany").innerHTML = "X";
		player = starter;
		krzyzykWin++;
		document.getElementById("win2").innerHTML = krzyzykWin;
		console.log("Krzyżyk wygrał!");
	}
};

const movec = (poleid) => {
	const poleCheck = document.getElementById(poleid).innerHTML == "";
	if (poleCheck && player == 0) {
		document.getElementById(poleid).innerHTML = "◯";
		player = 1;
		//console.log(`Pole: ${poleid}`);
		//console.log(`Value: ${document.getElementById(poleid).value}`);
	} else if (poleCheck && player == 1) {
		document.getElementById(poleid).innerHTML = "X";
		player = 0;
		//console.log(`Pole: ${poleid}`);
		//console.log(`Value: ${document.getElementById(poleid).value}`);
	} else {
		alert("To pole jest zajęte.");
	}
};

const checkForWinu = () => {
	if (checkWinner(winningCombinations, "◯")) {
		document.getElementById("wygrany").innerHTML = "◯";
		ended = true;
		player = starter;
		kolkoWin++;
		document.getElementById("win1").innerHTML = kolkoWin;
		console.log("Kółko wygrało!");
	} else if (checkWinner(winningCombinations, "X")) {
		document.getElementById("wygrany").innerHTML = "X";
		player = starter;
		ended = true;
		krzyzykWin++;
		document.getElementById("win2").innerHTML = krzyzykWin;
		console.log("Krzyżyk wygrał!");
	}
};

const moveu = (poleid) => {
	const poleCheck = document.getElementById(poleid).innerHTML == "";
	if (ended == false) {
		if (poleCheck && player == 0) {
			document.getElementById(poleid).innerHTML = "◯";
			player = 1;
			//console.log(`Pole: ${poleid}`);
			//console.log(`Value: ${document.getElementById(poleid).value}`);
		} else if (poleCheck && player == 1) {
			document.getElementById(poleid).innerHTML = "X";
			player = 0;
			//console.log(`Pole: ${poleid}`);
			//console.log(`Value: ${document.getElementById(poleid).value}`);
		} else {
			alert("To pole jest zajęte.");
		}
	}
};

const klik = (poleid) => {
	const autoend = document.getElementById("autoend");

	if (autoend.checked == true) {
        movec(poleid);
		checkForWinc();
		checkFull();

	} else {
	moveu(poleid);
    checkForWinu()
    }
};

const resetButton = () => {
	const autoend = document.getElementById("autoend");
	if (autoend.checked == false) {
		console.log("Unchecked");
		document.getElementById("gameReset").style.display = "inline-block";
	} else {
		console.log("Checked");
        reset();
		document.getElementById("gameReset").style.display = "none";
	}
};

const startShape = () => {
	const kolko = document.getElementById("kolko");
	const krzyzyk = document.getElementById("krzyzyczek");
	if (kolko.checked == true) {
		player = 0;
		starter = 0;
		console.log("Starter = 0");
	} else if (krzyzyk.checked == true) {
		player = 1;
		starter = 1;
		console.log("Starter = 1");
	}
};

const change = () => {
	const bcg = document.getElementById("bcg").value;
	const symbol = document.getElementById("symbol").value;

	const pElements = document.querySelectorAll("td > p");

	pElements.forEach((pElement) => {
		pElement.style.backgroundColor = bcg;
		pElement.style.color = symbol;
	});
};
