import AI from './ai';
import ConnectFour from './connect_four';

window.addEventListener('DOMContentLoaded', () => {
    let modal = document.querySelector('#modal');
    let board = document.getElementById('connect-four');
    let playerOne = { color: 'red', name: 'player one'};
    let playerTwo = { color: 'black', name: 'player two', isAI: false };

    document
        .querySelectorAll('.name-input')
        .forEach((input) => {
            input.addEventListener('change', function() {
                this.id === 'player-1-name' 
                ? playerOne.name = this.value
                : playerTwo.name = this.value;
            });
        });

    document
        .querySelectorAll('.color-select')
        .forEach((square) => {
            square.addEventListener('click', function() {
                let player = this.id.slice(-3);

                player === 'one'
                ? playerOne.color = this.dataset.value
                : playerTwo.color = this.dataset.value

                document
                    .querySelector(`#selected-color-${player}`)
                    .classList
                    .add(this.dataset.value);
            });
        });

        // document
        //     .getElementById('ai-check')
        //     .addEventListener('change', function() {
        //         playerTwo = this.checked
        //             ? new AI('computer', 'blue')
        //             : playerTwo;
        //     });
        
    document
        .querySelector('#close-button')
        .addEventListener('click', function(event) {
            modal.style.display = 'none';

            new ConnectFour(board, playerOne, playerTwo);
        });
});