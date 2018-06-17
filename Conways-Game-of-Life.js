
    var cnv = document.getElementById("conway");
    var ctx = cnv.getContext("2d");

    var gridHeight = parseInt(cnv.height, 10) / 10;
    var gridWidth = parseInt(cnv.width, 10) / 10;
    var gridResolution = 10;

    var grid;

    function makeBoard(columns, rows) {

        var arr = new Array(columns);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);

        }
        return arr;

    }

    function drawBoard(columns, rows, board) {

        for (var i = 0; i < columns; i++) {
            for (var j = 0; j < rows; j++) {
                var x = i * gridResolution;
                var y = j * gridResolution;
                if (board[i][j]==true) {
                    ctx.fillStyle= "black";
                    ctx.fillRect(x, y, gridResolution, gridResolution);

                }
                else{
                    ctx.fillStyle= "white";
                    ctx.fillRect(x, y, gridResolution, gridResolution);
                }
            }
        }

    }

    function Randomize(){
        fillBoard(grid);
        drawBoard(gridWidth, gridHeight, grid);
    }

    function fillBoard(board){
            for (var i = 0; i < gridWidth; i++) {

                for (var j = 0; j < gridHeight; j++) {
                 var weight = getRandomInt(1, 11);
                     if (weight < 4) {
                         board[i][j] = true;
                     }
                    else {
                     board[i][j] = false;
                    }
            }
        }
    }

    /*Credits to Mozilla's MDN*/
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    /*Creates a grid of the using the makeBoard function.
    It then generates a Random integer that is either a 0 or a 1.
     */
    window.onload=function init() {

        grid = makeBoard(gridWidth, gridHeight);

        fillBoard(grid);

        drawBoard(gridWidth, gridHeight, grid);

    }
