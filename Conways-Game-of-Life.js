
    var cnv = document.getElementById("conway");
    var ctx = cnv.getContext("2d");


    var gridHeight = parseInt(cnv.height, 10) / 10;
    var gridWidth = parseInt(cnv.width, 10) / 10;
    var gridResolution = 10;

    var running;

    var rungame=false;

    var grid;

    /*Creates the two dimensional array used for the board*/
    function makeBoard(columns, rows) {

        var arr = new Array(columns);

        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(rows);

        }
        return arr;

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

    /*This function simply counts the number of neighbors surrounding a cell on the board*/
    function countNeighbors(board,i, j){
      var neighbors=0;

        if(i>0){

        if(board[i-1][j-1]==true && j>0){
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


/*This function is responsible for managing the visuals of the board*/
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

    /*This function simply calls the function randomly generate a board, reset the Year counter to 0, and update the board visually.*/
    function Randomize(){
      document.getElementById('year').textContent=0;
        fillBoard(grid);
        drawBoard(gridWidth, gridHeight, grid);
    }

    /*This function randomly fills the board with true/false values.
    * I chose to add weights to decrease the amount of randomly generated live cells.*/
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

  function start(){
        if(rungame==false) {
            running = setInterval(runConway, 100);
            rungame=true;
        }
  }

  var gliders=false;

  var cornerGliders;

  function toggleGliders(){
      if(gliders == false && rungame==true){
          runGliders();
          cornerGliders = setInterval(runGliders, 5000);
          gliders = true;
      }
      else{
          gliders=false;
          clearInterval(cornerGliders);
      }

  }

  function runGliders(){
        grid[1][0]=true;
        grid[2][1]=true;
        grid[2][2]=true;
        grid[1][2]=true;
        grid[0][2]=true;

        grid[gridWidth-2][0]=true;
        grid[gridWidth-3][1]=true;
        grid[gridWidth-3][2]=true;
        grid[gridWidth-2][2]=true;
        grid[gridWidth-1][2]=true;

        grid[0][gridHeight-3]=true;
        grid[1][gridHeight-3]=true;
        grid[2][gridHeight-3]=true;
        grid[2][gridHeight-2]=true;
        grid[1][gridHeight-1]=true;

        grid[gridWidth-2][gridHeight-1]=true;
        grid[gridWidth-3][gridHeight-2]=true;
        grid[gridWidth-3][gridHeight-3]=true;
        grid[gridWidth-2][gridHeight-3]=true;
        grid[gridWidth-1][gridHeight-3]=true;

        drawBoard(gridWidth,gridHeight,grid);
  }

  function stop(){
        if(rungame==true) {
            clearInterval(running);
            rungame=false;
        }
        toggleGliders();
  }

  function clearBoard(){
        stop();
      document.getElementById('year').textContent=0;
        var newBoard=makeBoard(gridWidth,gridHeight);

      for (var i = 0; i < gridWidth; i++) {

          for (var j = 0; j < gridHeight; j++) {

                  newBoard[i][j] = false;


          }
      }


      grid = newBoard;
      drawBoard(gridWidth, gridHeight, grid);
  }

  /*This function grabs the coordinates of where the user clicked on the canvas, and calculates the position of the click on the grid.
  * It then alters the value at that point to be either true or false, depending on what the previous value was.*/
  function handleClick(e){
        var pos = getMousePos (cnv, e);
        posx = roundTen(parseInt(pos.x, 10))/10;
        posy = roundTen(parseInt(pos.y, 10))/10;


       if(grid[posx][posy]==true){
           grid[posx][posy]=false;
       }
       else if(grid[posx][posy]==false){
           grid[posx][posy]=true;
       }

       drawBoard(gridWidth, gridHeight, grid);
  }

/* This function is responsible for getting numbers in the closest 10's place the actual pixels clicks in terms of*/
  function roundTen(num){
      return num=Math.floor((num)/10)*10;
  }


  /*This function simply grabs the position of the mouse to be used in the function handleClick.*/
  function getMousePos(c, evt){
        var rect = c.getBoundingClientRect();
        return{
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top};

  }



    /*Creates a grid of the using the makeBoard function.
    It then generates a Random integer that is either a 0 or a 1.
     */
    window.onload=function init() {

        grid = makeBoard(gridWidth, gridHeight);

        for (var i = 0; i < gridWidth; i++) {
            for (var j = 0; j < gridHeight; j++) {
              grid[i][j] = false;
            }
        }

        drawBoard(gridWidth, gridHeight, grid);

        cnv.addEventListener('click', handleClick);


    }
