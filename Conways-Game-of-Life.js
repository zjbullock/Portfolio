
    var cnv = document.getElementById("conway");
    var ctx = cnv.getContext("2d");

    var gridHeight = parseInt(cnv.height, 10) / 10;
    var gridWidth = parseInt(cnv.width, 10) / 10;
    var gridResolution = 10;

    var running;


    var grid;

    function makeBoard(columns, rows) {

        var arr = new Array(columns);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);

        }
        return arr;

    }

    function stopConway(){

    }

    function runConway(){
      var newBoard = makeBoard(gridWidth, gridHeight);
      var neighbors;
      for(var i=0; i<grid.length; i++){
        for(var j=0; j<grid[i].length; j++){
          neighbors=countNeighbors(grid,i,j);

          if(grid[i][j]==true){
          if(neighbors==3 || neighbors==2){
            newBoard[i][j]=true;
          }
          else if(neighbors>3){
            newBoard[i][j]=false;
          }
          else if(neighbors<2){
            newBoard[i][j]=false;
          }
        }
        else if(grid[i][j]==false){
          if(neighbors==3){
            newBoard[i][j]=true;
          }
          else{
            newBoard[i][j]=false;
          }
        }


        }
      }
      grid=newBoard;
      drawBoard(gridWidth, gridHeight, grid);
      increaseYear();

}

    function increaseYear(){
      document.getElementById('year').textContent++;

    }

    function countNeighbors(board,i, j){
      var neighbors=0;

      if(i>0){

      if(board[i-1][j-1]==true && j>0)
      {
        neighbors++;
      }

      if(board[i-1][j]==true){
        neighbors++;
      }

      if(board[i-1][j+1]==true && j<gridHeight-1){
        neighbors++;
      }
    }



      if(board[i][j-1]==true && j>0){
        neighbors++;
      }
      if(board[i][j+1]==true && j<gridHeight-1){
        neighbors++;
      }

if(i<gridWidth-1){
      if(board[i+1][j-1]==true && j>0){
        neighbors++;
      }
      if(board[i+1][j]==true){
        neighbors++;
      }
      if(board[i+1][j+1]==true && j<gridHeight-1){
        neighbors++;
      }
}

      return neighbors;
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
      document.getElementById('year').textContent=0;
        fillBoard(grid);
        drawBoard(gridWidth, gridHeight, grid);
    }

    function fillBoard(board){
            for (var i = 0; i < gridWidth; i++) {

                for (var j = 0; j < gridHeight; j++) {
                 var weight = getRandomInt(1, 11);
                     if (weight < 3) {
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

  function start(){
    running=setInterval(runConway, 200);
  }

  function stop(){
    clearInterval(running);
  }

    /*Creates a grid of the using the makeBoard function.
    It then generates a Random integer that is either a 0 or a 1.
     */
    window.onload=function init() {

        grid = makeBoard(gridWidth, gridHeight);

        fillBoard(grid);

        drawBoard(gridWidth, gridHeight, grid);

    }
