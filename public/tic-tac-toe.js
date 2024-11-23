// Your code here
let grid = [[' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' ']]

function changeTurn(){
    const currentTurn = sessionStorage.getItem("currentPlayer")
    if(currentTurn === 'X') sessionStorage.setItem("currentPlayer", 'O')
    else sessionStorage.setItem("currentPlayer", "X")
}

function makeGrid(size){
    let currentSquareId = 0;
    const grid = document.createElement("div")
    grid.classList.add("grid")

    for(let i = 0; i < size; i++){
        let row = document.createElement("div");
        row.setAttribute("class", "row")
        row.setAttribute("id", `row-${i}`)
        for( let j = 0; j < size; j++ ) {
            row.appendChild(createSquare(currentSquareId, i, j));
            currentSquareId++;
        }
        grid.appendChild(row) 
    }

    return grid
}

function makeButtons(){
    const buttonRow = document.createElement('div')
    buttonRow.classList = "button-row"
    const newGameButton = document.createElement('button')
    newGameButton.classList.add("newGame")
    newGameButton.innerText = "New Game"
    newGameButton.addEventListener("click", newGameButtonHandler)
    const giveUpButton = document.createElement('button')
    giveUpButton.classList.add("giveUp")
    giveUpButton.innerText = "Give Up"
    giveUpButton.addEventListener("click", giveUpHandler)
    
    buttonRow.appendChild(newGameButton)
    buttonRow.appendChild(giveUpButton)
    document.body.appendChild(buttonRow)
}

function createSquare(id, row, col) {
    const square = document.createElement("div")
    square.setAttribute("class", "square empty")
    square.setAttribute("id", `square-${id}`)
    square.dataset.row = row;
    square.dataset.col = col;
    square.addEventListener("click", squareClickHandler)
    return square
}

function squareClickHandler(e){
    if(isValid(e.target)){
        const currentMarker = sessionStorage.getItem("currentPlayer").toLowerCase()
        e.target.classList.add("marked")
        e.target.classList.remove("empty")
        e.target.innerHTML = `<object type="image/svg+xml" data=./assets/player-${currentMarker}.svg></object>`
        setMark(getCoords(e.target))
        if(checkWin()){
            endGame(checkWin())
        }
        changeTurn()
    }else{
        alert("please select an empty square")
        // console.log("asdasdf ")
    }
}

function newGameButtonHandler(e){
    resetGame()
    document.querySelector(".winner").innerText = ''
}

function giveUpHandler(e){
    resetGame()
    document.querySelector(".winner").innerText = getOpponent()
}

function isValid(element){
    return element.classList.contains("empty")
}

function getOpponent(){
    const currentPlayer = sessionStorage.getItem("currentPlayer")
    return currentPlayer === 'X' ? 'O' : 'X'
}

function getCoords(element){
    const row = element.dataset.row
    const col = element.dataset.col
    return [row, col]
}


function makeGame() {
    const gridElement = makeGrid(3)
    document.body.appendChild(gridElement)
    sessionStorage.setItem("currentPlayer", "X")
    makeButtons()
    
}

function setMark(coord){
    const row = coord[0]
    const col = coord[1]
    grid[row][col] = sessionStorage.getItem("currentPlayer")
}

function resetGame(){
    grid = [[' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' ']]
    document.querySelector(".grid").remove()
    document.querySelector(".button-row").remove()
    makeGame()
}

function removeSquareHandlers(){
    const squares = document.querySelectorAll(".square")
    squares.forEach((ele) => ele.removeEventListener('click', squareClickHandler))
}

function endGame(winner){
    if (winner === 'O' || winner === 'X'){
        alert(`Player ${winner} wins!`)
        document.querySelector(".winner").innerText = winner
    }else if ( winner === 'T' ){
        alert('Tie Game!')
    } else {
        alert('Game Over')
    }
    removeSquareHandlers()
}

function checkWin() {

    //Horizontal Check
    if(grid.some((row) => row.every((ele)=> ele == 'X'))){
      return 'X';
    }
    if(grid.some((row) => row.every((ele)=> ele == 'O'))){
      return 'O';
    }
    //Vertical Check
    let verticalWins = []
    for(let i = 0; i < grid[0].length; i ++ ){
      verticalWins.push(grid.map((row) => row[i]))
    }
    if(verticalWins.some((row) => row.every((ele) => ele == 'X'))){
      return 'X';
    }
    if(verticalWins.some((row) => row.every((ele) => ele == 'O'))){
      return 'O';
    }
      //Diagonal Check
    let leftToRightDiagonal = [];
    let rightToLeftDiagonal = [];
    let reversedGrid = [...grid].reverse()
    for(let i = 0; i < grid[0].length; i++){
      leftToRightDiagonal.push(grid[i][i]);
    }
    for(let i = grid[0].length - 1; i >= 0 ; i--){
      rightToLeftDiagonal.push(reversedGrid[i][i]);
    }

    if(leftToRightDiagonal.every((ele) => ele == 'X')){
      return 'X';
    }
    if(leftToRightDiagonal.every((ele) => ele == 'O' )){
      return 'O';
    }
    if(rightToLeftDiagonal.every((ele) => ele == 'X')){
      return 'X';
    }
    if(rightToLeftDiagonal.every((ele) => ele == 'O' )){
      return 'O';
    }
    else if (grid.every((row) => row.every((ele) => ele == 'X' || ele == 'O'))){
      return 'T';
    }
    
    
    else{ 
      return false;
    }

  }


window.addEventListener("DOMContentLoaded", () =>{
    makeGame()
})

