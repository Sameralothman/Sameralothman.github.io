const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'                   /*object som kommer att vara x klass och klasscirkel*/               
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],                                      /*en array  som vissar alla möjliga vinnande kombinationer*/
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()  /*starta spel function*/

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })   /*once true vilket betyder att bara kör den här kodet en gång*/
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target    /*cell target vad man än klickade på*/
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS /*currentclass kommer att vara om det är cirkels tur så vill vi returnera cirkelklassen annars kommer vi att returnera x-klassen.*/
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false) /*this going to be whether or not it's a draw*/
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Easy Wins bby!`
  }
  winningMessageElement.classList.add('show') /*this going to show the winning message elemnt*/
}

function isDraw() { /*destructuring*/
  return [...cellElements].every(cell => {   /*if every single one of the cells has either an x or a circle then want to return true*/
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn  /*opposite of circle turns*/
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) { /*to see if some of the winning combination are meet */
  return WINNING_COMBINATIONS.some(combination => { /*this is going to return true if any of the values inside of it are true*/ 
    return combination.every(index => {       /*check if all of boxes have the same class x or 0*/
      return cellElements[index].classList.contains(currentClass) /*if the current class is in all three of elements inside of the combination then we win*/
    })
  })
}