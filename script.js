const rows = [["a"], ["b"], ["c"]];
const cols = [["1"], ["2"], ["3"]];
let kolkoWin = 0,
	krzyzykWin = 0;
let starter = 0,
	player = starter;
let ended = false;
let kolkosymbol = "◯";
let krzyzyksymbol = "X";
//Kolory tabeli
let bcg = document.getElementById("bcg").value;
let symbol = document.getElementById("symbol").value;
let borderc = document.getElementById("border").value;

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
//Do gry
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
		setTimeout(reset(), 3000);
		alert("Remis");
		player = starter;
	}
};

const checkForWinc = () => {
	if (checkWinner(winningCombinations, kolkosymbol)) {
		setTimeout(reset(), 3000);
		document.getElementById("wygrany").innerHTML = kolkosymbol;
		player = starter;
		kolkoWin++;
		document.getElementById("win1").innerHTML = kolkoWin;
		console.log(`${kolkosymbol} wygrał(o)!`);
	} else if (checkWinner(winningCombinations, krzyzyksymbol)) {
		setTimeout(reset(), 3000);
		document.getElementById("wygrany").innerHTML = krzyzyksymbol;
		player = starter;
		krzyzykWin++;
		document.getElementById("win2").innerHTML = krzyzykWin;
		console.log(`${krzyzyksymbol} wygrał(o)!`);
	}
};

const movec = (poleid) => {
	const poleCheck = document.getElementById(poleid).innerHTML == "";
	if (poleCheck && player == 0) {
		document.getElementById(poleid).innerHTML = kolkosymbol;
		player = 1;
		//console.log(`Pole: ${poleid}`);
		//console.log(`Value: ${document.getElementById(poleid).value}`);
	} else if (poleCheck && player == 1) {
		document.getElementById(poleid).innerHTML = krzyzyksymbol;
		player = 0;
		//console.log(`Pole: ${poleid}`);
		//console.log(`Value: ${document.getElementById(poleid).value}`);
	} else {
		alert("To pole jest zajęte.");
	}
};

const checkForWinu = () => {
	if (checkWinner(winningCombinations, kolkosymbol)) {
		document.getElementById("wygrany").innerHTML = kolkosymbol;
		ended = true;
		player = starter;
		kolkoWin++;
		document.getElementById("win1").innerHTML = kolkoWin;
		console.log("Kółko wygrało!");
	} else if (checkWinner(winningCombinations, krzyzyksymbol)) {
		document.getElementById("wygrany").innerHTML = krzyzyksymbol;
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
			document.getElementById(poleid).innerHTML = kolkosymbol;
			player = 1;
			//console.log(`Pole: ${poleid}`);
			//console.log(`Value: ${document.getElementById(poleid).value}`);
		} else if (poleCheck && player == 1) {
			document.getElementById(poleid).innerHTML = krzyzyksymbol;
			player = 0;
			//console.log(`Pole: ${poleid}`);
			//console.log(`Value: ${document.getElementById(poleid).value}`);
		} else {
			alert("To pole jest zajęte.");
		}
	}
};
//Główna funkcja łącząca
const klik = (poleid) => {
	const autoend = document.getElementById("autoend");

	if (autoend.checked == true) {
		movec(poleid);
		checkForWinc();
		checkFull();
	} else {
		moveu(poleid);
		checkForWinu();
	}
};
//Side funkcje do customizacji
const resetButton = () => {
	const autoend = document.getElementById("autoend");
	if (autoend.checked == false) {
		console.log("Unchecked");
		document.getElementById("gameReset").style.display = "inline-block";
	} else {
		console.log("Checked");
		setTimeout(reset(), 2000);
		document.getElementById("gameReset").style.display = "none";
	}
};

const reset = () => {
	for (let i = 0; i < 3; i++) {
		for (let j = 1; j <= 3; j++) {
			document.getElementById(rows[i] + j).innerHTML = "";
			ended = false;
		}
	}
};

const symWiningChange = () => {
	document.getElementById("sym1").innerHTML = kolkosymbol;
	document.getElementById("sym2").innerHTML = krzyzyksymbol;
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

const change = (bg, sl, bc) => {
	//Wczytaj kolory
	if (bg === 0 && sl === 0 && bc === 0) {
		bcg = document.getElementById("bcg").value;
		symbol = document.getElementById("symbol").value;
		borderc = document.getElementById("border").value;
		//Do localstorage wcztanie
		localStorage.setItem("bcg", bcg);
		localStorage.setItem("symbol", symbol);
		localStorage.setItem("borderc", borderc);
	} else {
		bcg = bg;
		symbol = sl;
		borderc = bc;
	}
	//Elementy p
	const pElements = document.querySelectorAll("td > p");
	//Elementy tabeli
	const tdBorders = document.querySelectorAll("td");
	const trBorders = document.querySelectorAll("td");
	const tableBorders = document.querySelectorAll("td");

	pElements.forEach((pElement) => {
		pElement.style.backgroundColor = bcg;
		pElement.style.color = symbol;
	});

	tdBorders.forEach((tdBorder) => {
		tdBorder.style.borderColor = borderc;
	});
	trBorders.forEach((trBorder) => {
		trBorder.style.borderColor = borderc;
	});
	tableBorders.forEach((tableBorder) => {
		tableBorder.style.borderColor = borderc;
	});
};

const symbolInputClear = () => {
	document.getElementById("symbol1").value = "";
	document.getElementById("symbol2").value = "";
};

const symbolChange = () => {
	const symbol1 = document.getElementById("symbol1").value;
	const symbol2 = document.getElementById("symbol2").value;

	if (symbol1 == "" && symbol2 == "") {
		console.error("No symbols provided!");
		return 0;
	} else if (symbol1 == symbol2) {
		alert("Symbole nie mogą być takie same!");
		console.error("Same symbols");
		symbolInputClear();
		return 0;
	} else if (symbol1 == "") {
		krzyzyksymbol = symbol2;
		localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
		symWiningChange();
		symbolInputClear();
		return 0;
	} else if (symbol2 == "") {
		kolkosymbol = symbol1;
		localStorage.setItem("kolkosymbol", kolkosymbol);
		symWiningChange();
		symbolInputClear();
		return 0;
	} else {
		kolkosymbol = symbol1;
		krzyzyksymbol = symbol2;
		localStorage.setItem("kolkosymbol", kolkosymbol);
		localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
		symWiningChange();
		symbolInputClear();
		return 0;
	}
};

const symbolReset = () => {
	if (kolkosymbol == "◯" && krzyzyksymbol == "X") {
		console.error("Symbols are already default!");
		return 0;
	}
	kolkosymbol = "◯";
	krzyzyksymbol = "X";
	localStorage.setItem("kolkosymbol", kolkosymbol);
	localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
	symWiningChange();
	reset();
};

const wczytaj = () => {
	if (localStorage.getItem("krzyzyksymbol") == null && localStorage.getItem("kolkosymbol") == null) {
		kolkosymbol = "◯";
		krzyzyksymbol = "X";

		localStorage.setItem("kolkosymbol", kolkosymbol);
		localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
	} else if (
		localStorage.getItem("krzyzyksymbol") == undefined &&
		localStorage.getItem("kolkosymbol") != undefined
	) {
		kolkosymbol = localStorage.getItem("kolkosymbol");
		krzyzyksymbol = "X";

		localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
	} else if (
		localStorage.getItem("krzyzyksymbol") != undefined &&
		localStorage.getItem("kolkosymbol") == undefined
	) {
		krzyzyksymbol = localStorage.getItem("krzyzyksymbol");
		kolkosymbol = "◯";

		localStorage.setItem("kolkosymbol", kolkosymbol);
	} else if (
		!(localStorage.getItem("krzyzyksymbol") == undefined && localStorage.getItem("kolkosymbol") == undefined)
	) {
		krzyzyksymbol = localStorage.getItem("krzyzyksymbol");
		kolkosymbol = localStorage.getItem("kolkosymbol");
	}
	//zapisanie kolorów tabeli jeśli null
	if (
		localStorage.getItem("bcg") == undefined &&
		localStorage.getItem("symbol") == undefined &&
		localStorage.getItem(borderc) == undefined
	) {
		localStorage.setItem("bcg", bcg);
		localStorage.setItem("symbol", symbol);
		localStorage.setItem("borderc", borderc);
	} else {
		//Wczytanie
		bcg = localStorage.getItem("bcg");
		symbol = localStorage.getItem("symbol");
		borderc = localStorage.getItem("borderc");
		change(bcg, symbol, borderc)
	}
};

const resetdata = () => {
	localStorage.setItem("kolkosymbol","◯");
	localStorage.setItem("krzyzyksymbol","X");
	localStorage.setItem("bcg", "#1A9211");
	localStorage.setItem("symbol", "#E300FF");
	localStorage.setItem("borderc", "#FFFFFF");
}