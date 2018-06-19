import AI from './ai';

export default class ConnectFour {
    constructor(board, playerOne, playerTwo) {
        this.board = board;
        this.currentPlayer = playerOne;
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        
        this.setup();
        this.gamePlay();
    }

    gamePlay() {
        let cols = document.querySelectorAll('.col.empty');
        let game = this; 
                
        this.promptPlayer();
        
        cols.forEach((col) => {
            col.addEventListener('mouseenter', function() {
                let top = game.getTop(col.dataset.col);

                top.classList.add(`selecting-${game.currentPlayer.color}`);
            });

            col.addEventListener('mouseleave', function() {
                let top = game.getTop(col.dataset.col);
                
                top.classList.remove(`selecting-${game.currentPlayer.color}`);
            });
           
            col.addEventListener('click', function () {
                let top = game.getTop(col.dataset.col);

                top.classList.remove(`selecting-${game.currentPlayer.color}`);
                top.classList.remove('empty');
                top.classList.add(game.currentPlayer.color);
                top.setAttribute('data-player', game.currentPlayer.color);

                let isOver = game.checkForWinner(top.dataset);

                if (isOver) {
                    game.showWinner();
                    return;
                } else {
                    game.switchPlayers();
                    top.dispatchEvent(new Event('mouseenter'));
                }
            });
        });
    }

    isFourInARow(dirs, pos) {   
        let count = 1;
        let [row, col] = pos;
        
        for (let i = 0; i < dirs.length; i++) {
            let { x, y } = dirs[i];
            let nextRow = row + y;
            let nextCol = col + x;
            let cell = document.querySelector(`[data-row='${nextRow}'][data-col='${nextCol}']`);
            let inXRange = nextCol >= 0 && nextCol < 7;
            let inYRange = nextRow >= 0 && nextRow < 6;
            let isPlayer = cell.dataset.player === this.currentPlayer.color;
            
            while (inXRange && inYRange && isPlayer) {
                count += 1;
                nextRow += y;
                nextCol += x;
                cell = document.querySelector(`[data-row='${nextRow}'][data-col='${nextCol}']`);
            }
        }

        return count >= 4;
    }
    
    winByDiagonal(pos) {
        return this.isFourInARow(
            [
                { x: 1, y: 1 }, 
                { x: -1, y: -1}, 
                { x: 1, y: -1}, 
                { x: -1, y: 1 }
            ], pos);
    }

    winByVertical(pos) {
        return this.isFourInARow([{ x: 0, y: 1 }, { x: 0, y: -1 }], pos)
    }
    
    winByHorizontal(pos) {
        return this.isFourInARow([{ x: 1, y: 0 }, { x: -1, y: 0 }], pos);
    }
    
    checkForWinner({ row, col }) {
        let pos = [Number(row), Number(col)];

        return this.winByDiagonal(pos)
            || this.winByVertical(pos)
            || this.winByHorizontal(pos);
    }
    
    switchPlayers() {
        this.currentPlayer = this.currentPlayer === this.playerOne
                            ? this.playerTwo 
                            : this.playerOne; 
        if (this.currentPlayer.isAI) {
            this.playerTwo.makeMove(this.board);
        } else {
            this.promptPlayer();
        }                             
    }
    
    reset() {
        while (this.board.firstChild) {
            this.board.removeChild(this.board.firstChild);
        }
        this.setup();
        this.currentPlayer = this.playerOne;
        this.gamePlay();
    }
    
    getTop(col) {
        let fullColumn = document.querySelectorAll(`[data-col='${col}']`);
        
        for (let i = fullColumn.length - 1; i >= 0; i--) {
            if (fullColumn[i].classList.contains('empty')) {
                return fullColumn[i];
            }
        }

        return null;
    }  

    promptPlayer() {
        document
            .querySelector('#current-player')
            .innerText = `It is ${this.currentPlayer.name}'s turn!`
    }

    showWinner() {
        document
            .querySelector('#current-player')
            .innerText = `${this.currentPlayer.name} wins!`

        setTimeout(() => { this.reset() }, 1000);
    }
    
    setup() {
        for (let Y = 0; Y < 6; Y++) {
            let row = document.createElement('div');
            row.className = 'row';
            
            for (let X = 0; X < 7; X++) {
                let col = document.createElement('div');
                col.className = 'col empty';
                col.setAttribute('data-row', Y);
                col.setAttribute('data-col', X);

                row.appendChild(col);
            }

            this.board.appendChild(row);
        }
    }
}


