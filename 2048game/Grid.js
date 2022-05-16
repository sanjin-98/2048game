const GRID_SIZE = 4;
const CELL_SIZE = 20;
const CELL_GAP = 2;

export default class Grid{
    /* grid 4x4  */
    #cells;
    constructor(gridElement){
        gridElement.style.setProperty("--grid-size",GRID_SIZE);/* colonne */
        gridElement.style.setProperty("--cell-size",`${CELL_SIZE}vmin`);/* righe */
        gridElement.style.setProperty("--cell-gap",`${CELL_GAP}vmin`);/* grandezza celle */
        this.#cells = createGrid(gridElement).map((thisElement,index)=> {
            return new Cell(thisElement,index % GRID_SIZE, Math.floor(index / GRID_SIZE));
        });
    }
    get cells(){
        return this.#cells;
    }
    get #emptycells(){
        return this.#cells.filter(cell => cell.tile == null);
    }
    randomeptycell(){
        const randomIndex = Math.floor(Math.random() * this.#emptycells.length);   
        return this.#emptycells[randomIndex];
    }
    get cellsByColumns(){
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.x] = cellGrid[cell.x] || []
            cellGrid[cell.x][cell.y] = cell
            return cellGrid
          }, [])
    }
    get cellsByRow(){
        return this.#cells.reduce((cellGrid, cell) => {
            cellGrid[cell.y] = cellGrid[cell.y] || []
            cellGrid[cell.y][cell.x] = cell
            return cellGrid
          }, [])
    }

}
class Cell{
    #thisElement;
    #x;
    #y;
    #tile;
    #mergeTile;
    
    constructor(thisElement,x,y){
        this.#thisElement=thisElement;
        this.#x=x;
        this.#y=y;
    }
    get x(){
        return this.#x;
    }
    get y(){
        return this.#y;
    }
    get tile(){
        return this.#tile;
    }
    set tile(value){
        this.#tile=value;
        if(value==null) return
        this.#tile.x=this.#x;
        this.#tile.y=this.#y;
    }
    get mergeTile() {
        return this.#mergeTile;
    } 
    set mergeTile(value) {
        this.#mergeTile = value;
        if (value == null) return
        this.#mergeTile.x = this.#x;
        this.#mergeTile.y = this.#y;
    }
    canAccept(tile) {
        return (
          this.tile == null ||
          (this.mergeTile == null && this.tile.value === tile.value)
        )
    }
    mergeTiles() {
        if (this.tile == null || this.mergeTile == null) return
        this.tile.value = this.tile.value + this.mergeTile.value
        this.mergeTile.remove()
        this.mergeTile = null
    }
}

function createGrid(gridElement){
    const cells = [];
    for(let i=0; i < GRID_SIZE * GRID_SIZE; i++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gridElement.append(cell);
        cells.push(cell);
    }
    return cells;
}