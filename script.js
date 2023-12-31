document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById('board')
    const winningMessageElement = document.getElementById('winningMessage')
    const restartButton = document.getElementById('restartButton')
    const X_CLASS = 'x'
    const CIRCLE_CLASS = 'circle'
    const cellElements = document.querySelectorAll("[data-cell]");
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
    let circleTurn
    const WINNIN_COMBINATIONS = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    startGame()
    restartButton.addEventListener('click', startGame)
    function startGame(){
        circleTurn = false
        cellElements.forEach((cell) => {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
            cell.addEventListener("click", handleClick, { once: true });
        });
        setBoardHoverClass()
        winningMessageElement.classList.remove('show')
    }

    function handleClick(e) {
        console.log("clicked");
        const cell = e.target
        const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
        placeMark(cell, currentClass)
        if(chekWin(currentClass)){
            console.log('winner')
            endGame(false)
        }else if(isDraw()){
            endGame(true)
        }else{
            swapTurn()
            setBoardHoverClass()
        }

    }

    function endGame(draw){
        if(draw){
            winningMessageTextElement.innerText = "Draw!";
        } else {
            winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} WINS!`;
        }
        winningMessageElement.classList.add('show');
    }
    
    function isDraw(){
        return [...cellElements].every(cell =>{
            return cell.classList.contains(X_CLASS)||
            cell.classList.contains(CIRCLE_CLASS)
        })
    }

    function placeMark(cell, currentClass){
        cell.classList.add(currentClass)
    }

    function swapTurn(){
        circleTurn = ! circleTurn
    }

    function setBoardHoverClass(){
        board.classList.remove(X_CLASS)
        board.classList.remove(CIRCLE_CLASS)
        if(circleTurn){
            board.classList.add(CIRCLE_CLASS)
        }else{
            board.classList.add(X_CLASS)
        }
    }

    function chekWin(currentClass){
        return WINNIN_COMBINATIONS.some(combination =>{
            return combination.every(index =>{
                return cellElements[index].classList.contains(currentClass)
            })
        })
    }

});
