const GameOfLife = function (boardWidth, boardHeight) {
    let self = this;
    this.cells = [];
    this.width = boardWidth;
    this.height = boardHeight;
    this.board = document.getElementById("board");
    this.createBoard = function () {
        this.board.style.width = this.width * 10 + "px";
        this.board.style.height = this.height * 10 + "px";
        const boardCells = boardWidth * boardHeight;

        for (let i = 0; i < boardCells; i++) {
            const createCell = document.createElement("div");
            board.appendChild(createCell);
        }
        const allDivs = document.querySelectorAll("#board div");
        this.cells = allDivs;
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i].addEventListener("click", function () {
                if (this.classList == "") {
                    this.classList.add("live");
                } else {
                    this.classList.remove("live");
                }
            });
        }
    }
    this.cellNeighbours = function (x, y) {
        const index = x + y * this.width;
        return (this.cells[index]);
    }
    this.setCellState = function (x, y, state) {
        if (state === "live") {
            this.cellNeighbours(x, y).classList.add("live");
        } else if (state === "dead") {
            this.cellNeighbours(x, y).classList.remove("live");
        }
    }
    this.computeCellNextState = function (x, y) {
        let livingNeighbours = 0;
        for (let i = y - 1; i < y + 2; i++) {
            for (let j = x - 1; j < x + 2; j++) {
                if (i !== y || j !== x) {
                    if (i >= 0 && i < this.height && j >= 0 && j < this.width) {
                        if (this.cellNeighbours(j, i).className === 'live') {
                            livingNeighbours++;
                        }
                    }
                }
            }
        }
        if (this.cellNeighbours(x, y).className === 'live') {
            if (livingNeighbours === 2 || livingNeighbours === 3) {
                return 1;
            } else {
                return 0;
            }
        } else if (livingNeighbours === 3) {
            return 1;
        } else {
            return 0;
        }
    }
    this.computeNextGeneration = function () {
        this.generationBoard = [];
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.generationBoard.push(this.computeCellNextState(j, i));
            }
        }
    }
    this.printBoard = function () {
        self.computeNextGeneration();
        for (let i = 0; i < self.cells.length; i++) {
            self.cells[i].classList.remove('live');
            if (self.generationBoard[i] === 1) {
                self.cells[i].classList.add('live');
            }
        }
    }
    this.firstLife = function () {
        this.setCellState(3, 3, 'live');
        this.setCellState(3, 4, 'live');
        this.setCellState(3, 5, 'live');
        this.setCellState(2, 5, 'live');
        this.setCellState(1, 4, 'live');
    }
    this.start = function () {
        this.createBoard();
        this.firstLife();
        this.printBoard();
    }
    this.play = function () {
        self.pause();
        self.interval = setInterval(self.printBoard, 100);
    }
    this.pause = function () {
        clearInterval(self.interval);
    }
    document.getElementById('play').addEventListener('click', this.play);
    document.getElementById('pause').addEventListener('click', this.pause);
}

const boardWidth = prompt("Enter width", "between 10 and 130");
const boardHeight = prompt("Enter height", "between 10 and 70");

const game = new GameOfLife(boardWidth, boardHeight);



game.start();