var arrayAmount = 6;
var colors = genColorArray(arrayAmount);
var squares = document.querySelectorAll(".square");
var colorAnswer = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyMode = document.querySelector("#easy")
var hardMode = document.querySelector("#hard")
var hardSquares = document.querySelectorAll(".hard")


easyMode.addEventListener("click", function() {
	arrayAmount = 3;
	easyMode.classList.add("selected");
	hardMode.classList.remove("selected");
	for (var i = 0; i < hardSquares.length; i++){
		hardSquares[i].style.display = "none"
	};
	resetGame();
})

hardMode.addEventListener("click", function() {
	arrayAmount = 6;
	easyMode.classList.remove("selected");
	hardMode.classList.add("selected");
	for (var i = 0; i < hardSquares.length; i++){
		hardSquares[i].style.display = "block"
	};
	resetGame();
})

resetButton.addEventListener("click", resetGame)

colorDisplay.textContent = colorAnswer;
colorSquares()

function colorSquares(){
	for (var i = 0; i < arrayAmount; i++){
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;

			if (clickedColor === colorAnswer){
			messageDisplay.textContent = ("Correct!");
			changeColor(clickedColor);
			h1.style.background = clickedColor;
			resetButton.textContent = "Play Again?";
			} else {
			this.style.backgroundColor = "#464646";
			messageDisplay.textContent = ("Try Again!")
			}
		})
	}
}

function changeColor(color){
	for (var i = 0; i < arrayAmount ; i++){
		squares[i].style.backgroundColor = color;}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function genColorArray(num) {
	var arr = [];
	for (var i = 0; i < num; i++){
		arr.push(genRandomColor());
	}
	return arr;
}

function genRandomColor(){
	var r =Math.floor(Math.random() * 256);
	var g =Math.floor(Math.random() * 256);
	var b =Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function resetGame() {
	colors = genColorArray(arrayAmount);
	colorAnswer = pickColor();
	colorSquares();
	colorDisplay.textContent = colorAnswer;
	h1.style.background = "linear-gradient(to bottom right, #e4e8ef, #aaaeb7)";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = ("");
}
