import Grid from "./Grid.js";
import Tile from "./Tile.js";

var con = document.getElementById("game-board");
let board = new Grid(con);

board.randomeptycell().tile = new Tile(con);
board.randomeptycell().tile = new Tile(con);
setup();

function setup(){
    window.addEventListener("keydown",handleIn,{once:true});
};


async function handleIn(e){
    switch(e.key){
        case "ArrowDown":
        if(!canMoveDown()){
            setup();
            return
        }
        await moveDown();    
        break;

        case "ArrowUp":
            if(!canMoveUp()){
                setup();
                return
            }
            await moveUp();      
        break;

        case "ArrowRight":
            if(!canMoveRight()){
                setup();
                return
            }
            await moveRight();     
        break;

        case "ArrowLeft":
            if(!canMoveLeft()){
                setup();
                return
            }
            await moveLeft();     
        break;

        default:
            setup();
            return
    }
    board.cells.forEach(cell => cell.mergeTiles())

    const c = new Tile(con);
    board.randomeptycell().tile=c;

    if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
        new Tile.waitForTransition(true).then(() => {
          alert("You lose")
        })
        return
      }
    setup();
};

function moveUp() {
    return slideTiles(board.cellsByColumns)
  }
  
  function moveDown() {
    return slideTiles(board.cellsByColumns.map(column => [...column].reverse()))
  }
  
  function moveLeft() {
    return slideTiles(board.cellsByRow)
  }
  
  function moveRight() {
    return slideTiles(board.cellsByRow.map(row => [...row].reverse()))
  }
  function slideTiles(cells) {
    return Promise.all(
      cells.flatMap(group => {
        const promises = []
        for (let i = 1; i < group.length; i++) {
          const cell = group[i]
          if (cell.tile == null) continue
          let lastValidCell
          for (let j = i - 1; j >= 0; j--) {
            const moveToCell = group[j]
            if (!moveToCell.canAccept(cell.tile)) break
            lastValidCell = moveToCell
          }
  
          if (lastValidCell != null) {
            promises.push(cell.tile.waitForTransition())
            if (lastValidCell.tile != null) {
              lastValidCell.mergeTile = cell.tile
            } else {
              lastValidCell.tile = cell.tile
            }
            cell.tile = null
          }
        }
        return promises
      })
    )
}

function canMoveUp() {
    return canMove(board.cellsByColumns)
  }
  
  function canMoveDown() {
    return canMove(board.cellsByColumns.map(column => [...column].reverse()))
  }
  
  function canMoveLeft() {
    return canMove(board.cellsByRow)
  }
  
  function canMoveRight() {
    return canMove(board.cellsByRow.map(row => [...row].reverse()))
  }

  function canMove(cells){
    return cells.some(group => {
        return group.some((cell,index) =>{
            if(index === 0) return false;
            if(cell.tile == null) return false;
            const moveTocell = group[index - 1];/* controlli se puo fare merge */
            return moveTocell.canAccept(cell.tile);
        })
    })
  }