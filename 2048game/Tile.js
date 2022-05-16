export default class Tile{

    #tileElem;
    #value;
    #x;
    #y;

    constructor(tileboard,value=Math.random() > 0.5 ? 2:4){
        this.#tileElem=document.createElement("div");
        this.#tileElem.classList.add("tile");
        tileboard.append(this.#tileElem);
        this.value=value;
    }

    get value(){
        return this.#value;
    }

    set value(v){
        this.#value=v;
        this.#tileElem.textContent = v;
        const c = Math.log2(v);
        const backlightness = 100 - c*9; /* lower goes more darker becomes */
        this.#tileElem.style.setProperty("--ground-color",`${backlightness}%`);
        this.#tileElem.style.setProperty("--text-color",`${backlightness <= 50 ? 90 : 10}%`);
    }
    set x(value){
        this.#x=value;
        this.#tileElem.style.setProperty("--x",value);
    }
    set y(value){
        this.#y=value;
        this.#tileElem.style.setProperty("--y",value);
    }
    remove(){
        this.#tileElem.remove();
    }
    waitForTransition(animation = false) {
        return new Promise(resolve => {
          this.#tileElem.addEventListener(
            animation ? "animationend" : "transitionend",
            resolve,
            {
              once: true,
            }
          )
        })
    }
}
