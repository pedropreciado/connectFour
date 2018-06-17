export default class AI {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.isAI = true;
    }
    
    makeMove(board) {
        return this.calcNextMove(board);
    }
}

