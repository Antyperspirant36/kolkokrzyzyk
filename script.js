//Table rowws and columns (cells together)
const rows = [["a"], ["b"], ["c"]];
const cols = [["1"], ["2"], ["3"]];

//Win counter
let kolkoWin = 0, krzyzykWin = 0;

//Starting player
let starter = 0, player = starter;

//Check if game is won
let ended = false;

//Symbols
let kolkosymbol = "◯";
let krzyzyksymbol = "X";

//Table colors
let bcg = document.getElementById("bcg").value;
let symbol = document.getElementById("symbol").value;
let borderc = document.getElementById("border").value;

//Winning combinations
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

//Side game functions
//Button animation!
// Select all buttons on the page
const buttons = document.querySelectorAll('button');

// Add event listeners for each button
buttons.forEach(button => {
	button.addEventListener('mouseover', () => {
		button.classList.add('animate');
	});

	button.addEventListener('animationend', () => {
		button.classList.remove('animate');
	});
});

//Resets wins
const winReset = () => {
	kolkoWin = 0;
	krzyzykWin = 0;
	//Wining status clear to 0
	document.getElementById("win2").innerHTML = krzyzykWin;
	document.getElementById("win1").innerHTML = kolkoWin;
};

//Each turn, checks if any winning combination shows in current game. 
const checkWinner = (table, info) => {
	return table.some((combination) => {
		return combination.every((id) => document.getElementById(id).innerHTML === info);
	});
};

//Each turn, checks if table is full
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

//What to do if one player wins (checked)
const checkForWinc = () => {
	if (checkWinner(winningCombinations, kolkosymbol)) {
		//For player kolko
		reset();
		document.getElementById("wygrany").innerHTML = kolkosymbol;
		player = starter;
		kolkoWin++;
		document.getElementById("win1").innerHTML = kolkoWin;
		console.log(`${kolkosymbol} wygrał(o)!`);
	} else if (checkWinner(winningCombinations, krzyzyksymbol)) {
		//For player krzyzyk
		reset()
		document.getElementById("wygrany").innerHTML = krzyzyksymbol;
		player = starter;
		krzyzykWin++;
		document.getElementById("win2").innerHTML = krzyzykWin;
		console.log(`${krzyzyksymbol} wygrał(o)!`);
	}
};

//What to do if player clicks table cell (checked)
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

//What to do if one player wins (unchecked)
const checkForWinu = () => {
	if (checkWinner(winningCombinations, kolkosymbol)) {
		document.getElementById("wygrany").innerHTML = kolkosymbol;
		ended = true;
		player = starter;
		kolkoWin++;
		document.getElementById("win1").innerHTML = kolkoWin;
		console.log(`${kolkosymbol} wygrał(o)!`);
	} else if (checkWinner(winningCombinations, krzyzyksymbol)) {
		document.getElementById("wygrany").innerHTML = krzyzyksymbol;
		player = starter;
		ended = true;
		krzyzykWin++;
		document.getElementById("win2").innerHTML = krzyzykWin;
		console.log(`${krzyzyksymbol} wygrał(o)!`);
	}
};

//What to do if player clicks table cell (unchecked)
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

//Main function connecting others
const klik = (poleid) => {
	const autoend = document.getElementById("autoend");

	if (autoend.checked == true) {
		movec(poleid);
		checkForWinc();
		checkFull();
	} else {
		moveu(poleid);
		if (!ended){
			checkForWinu();
		}
	}
};

//Side functions for game customisation
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

const reset = () => {
	for (let i = 0; i < 3; i++) {
		for (let j = 1; j <= 3; j++) {
			document.getElementById(rows[i] + j).innerHTML = "";
			ended = false;
		}
	}
};

//Change winning symbols on the bottom of the site
const symWiningChange = (back1, back2) => {
	document.getElementById("sym1").innerHTML = kolkosymbol;
	document.getElementById("sym2").innerHTML = krzyzyksymbol;
	
	if (document.getElementById('wygrany').innerHTML == back1){
		document.getElementById('wygrany').innerHTML = kolkosymbol;
	} else if (document.getElementById('wygrany').innerHTML == back2) {
		document.getElementById('wygrany').innerHTML = krzyzyksymbol;
	}
};

//Choosing starting shape
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

//Change table colors (For localstorage too!)
const change = (bg, sl, bc) => {
	//Load colors from the html
	if (bg === 0 && sl === 0 && bc === 0) {
		bcg = document.getElementById("bcg").value;
		symbol = document.getElementById("symbol").value;
		borderc = document.getElementById("border").value;
		//Save to localstorage
		localStorage.setItem("bcg", bcg);
		localStorage.setItem("symbol", symbol);
		localStorage.setItem("borderc", borderc);
	} else {
		//Load colors from localstorage!
		bcg = bg;
		symbol = sl;
		borderc = bc;
	}
	//Elements p
	const pElements = document.querySelectorAll("td > p");
	//Elements of the table and table itself
	const tdBorders = document.querySelectorAll("td");
	const trBorders = document.querySelectorAll("td");
	const tableBorders = document.querySelectorAll("td");

	//ForEach to change all elements
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

//Clearing custom symbol input
const symbolInputClear = () => {
	document.getElementById("symbol1").value = "";
	document.getElementById("symbol2").value = "";
};

//Change symbols
const symbolChange = () => {
	//Load symbols from html input
	const symbol1 = document.getElementById("symbol1").value.toUpperCase();
	const symbol2 = document.getElementById("symbol2").value.toUpperCase();
	let sym1back = kolkosymbol;
	let sym2back = krzyzyksymbol;
	//Failsafe for empty symbols
	if (symbol1 == "" && symbol2 == "") {
		console.error("No symbols provided!");
		return 0;
	} else if (symbol1 == symbol2) {
		alert("Symbole nie mogą być takie same!");
		console.error("Same symbols");
		symbolInputClear();
		checkForWinc();
		reset();
		return 0;
	} else if (symbol1 == "") {
		krzyzyksymbol = symbol2;
		localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
		symWiningChange(sym1back, sym2back);
		symbolInputClear();
		checkForWinc();
		reset();
		return 0;
	} else if (symbol2 == "") {
		kolkosymbol = symbol1;
		localStorage.setItem("kolkosymbol", kolkosymbol);
		symWiningChange(sym1back, sym2back);
		symbolInputClear();
		checkForWinc();
		reset();
		return 0;
	} else {
		//All inputs filled
		kolkosymbol = symbol1;
		krzyzyksymbol = symbol2;
		localStorage.setItem("kolkosymbol", kolkosymbol);
		localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
		symWiningChange(sym1back, sym2back);
		symbolInputClear();
		checkForWinc();
		reset();
		return 0;
	}
};

//Reset custom symbols
const symbolReset = () => {
	if (kolkosymbol == "◯" && krzyzyksymbol == "X") {
		console.error("Symbols are already default!");
		return 0;
	}
	kolkosymbol = "◯";
	krzyzyksymbol = "X";
	
	//Default symbols in localstorage
	localStorage.setItem("kolkosymbol", kolkosymbol);
	localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
	symWiningChange();
	reset();
};

//Load localstorage
const wczytaj = () => {
	const back1 = kolkosymbol;
	const back2 = krzyzyksymbol;
	//Symbols!
	if (localStorage.getItem("krzyzyksymbol") == null && localStorage.getItem("kolkosymbol") == null) {
		//Fill localstorage if wrongly saved / none saved
		kolkosymbol = "◯";
		krzyzyksymbol = "X";

		localStorage.setItem("kolkosymbol", kolkosymbol);
		localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
	} else if (localStorage.getItem("krzyzyksymbol") == undefined && localStorage.getItem("kolkosymbol") != undefined) {
		//If one is loaded
		kolkosymbol = localStorage.getItem("kolkosymbol");
		krzyzyksymbol = "X";

		localStorage.setItem("krzyzyksymbol", krzyzyksymbol);
	} else if (localStorage.getItem("krzyzyksymbol") != undefined && localStorage.getItem("kolkosymbol") == undefined) {
		//If one is loaded
		krzyzyksymbol = localStorage.getItem("krzyzyksymbol");
		kolkosymbol = "◯";

		localStorage.setItem("kolkosymbol", kolkosymbol);
	} else if (!(localStorage.getItem("krzyzyksymbol") == undefined && localStorage.getItem("kolkosymbol") == undefined)) {
		//Both full
		krzyzyksymbol = localStorage.getItem("krzyzyksymbol");
		kolkosymbol = localStorage.getItem("kolkosymbol");
	}
	//Colors!
	if (
		localStorage.getItem("bcg") == undefined &&
		localStorage.getItem("symbol") == undefined &&
		localStorage.getItem(borderc) == undefined
	) {
		//Save colors if they aren't saved
		localStorage.setItem("bcg", bcg);
		localStorage.setItem("symbol", symbol);
		localStorage.setItem("borderc", borderc);
	} else {
		//Loading them into site
		bcg = localStorage.getItem("bcg");
		symbol = localStorage.getItem("symbol");
		borderc = localStorage.getItem("borderc");
		change(bcg, symbol, borderc)
	}
	symWiningChange(back1, back2);
};

//Reset localStorage
const resetdata = () => {
	localStorage.setItem("kolkosymbol","◯");
	localStorage.setItem("krzyzyksymbol","X");
	localStorage.setItem("bcg", "#9a8300");
	localStorage.setItem("symbol", "#8a2be2");
	localStorage.setItem("borderc", "#FFFFFF");
	wczytaj();
}

//Clear localstorage
const cleardata = () => {
	localStorage.clear();
	wczytaj();
}
