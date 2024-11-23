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
    const giveUpButton = document.createElement('button')
    giveUpButton.classList.add("giveUp")
    giveUpButton.innerText = "Give Up"
    
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
        changeTurn()
        console.log(getCoords(e.target))
    }else{
        alert("please select an empty square")
        // console.log("asdasdf ")
    }
}

function newGameButtonHandler(e){
    
}

function isValid(element){
    return element.classList.contains("empty")
}

function getCoords(element){
    const row = element.dataset.row
    const col = element.dataset.col
    return [row, col]
}


window.addEventListener("DOMContentLoaded", () =>{
    const gridElement = makeGrid(3)
    document.body.appendChild(gridElement)
    sessionStorage.setItem("currentPlayer", "X")
    makeButtons()
    // debugger
})

