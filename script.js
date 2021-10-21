/*
//Trying to make the submit reshaping thing work... unsuccessful...
var numOfVerticalSquares;
var numOfHorizontalSquares;
    
if (localStorage.getItem("go") == "true") {
    numOfVerticalSquares = localStorage.getItem("height")
    numOfHorizontalSquares = localStorage.getItem("width")
    localStorage.setItem("go", "false");
} else {
    numOfHorizontalSquares = 35;
    numOfVerticalSquares = 16;
}
*/

var numOfHorizontalSquares = 30, numOfVerticalSquares = 16;
var numOfSquares = numOfHorizontalSquares * numOfVerticalSquares;
var adjMines = 0;
var bombTest;
var bombCount = 0;
var difficulty = 7;
//1 in x chance a given square is a bomb. Higher = easier. 7 is pretty good.
var grid = [];
var bombs = [];
var gameover = false;
var victory = false;
var x, y;
var clickedSquares = [];
var flags = [];
var squareNum;
var correctFlagCount = bombCount;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 40 * numOfHorizontalSquares;
canvas.height = 40 * numOfVerticalSquares;
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var checkQ = false;

var xQ = [], yQ = [], squaresQ = [];

generateSquares();

function generateSquares() {
    clickedSquares = []
    flags = []
    gameover = false;
    victory = false;
    
    canvas.width = 40 * numOfHorizontalSquares;
    canvas.height = 40 * numOfVerticalSquares;
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    numOfSquares = numOfHorizontalSquares * numOfVerticalSquares;
    var sx = 0, sy = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (;sy < numOfVerticalSquares;) {

        if (sx == numOfHorizontalSquares) {
            sx = 0;
            sy++;
        }

        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "#d3d3d3";
        ctx.rect(sx * 40, sy * 40, 40, 40); 
        ctx.fillRect(sx * 40, sy * 40, 40, 40); 
        ctx.stroke();
        sx++;
    }

    adjMines = 0;
    bombTest;
    bombCount = 0;
    grid.splice(0, grid.length)
    bombs.splice(0, bombs.length)

    for (var i = 0; i < numOfSquares; i ++) {
        bombTest = Math.ceil(Math.random() * difficulty);
        if (bombTest == 1) {
            grid.push(1);
            bombs.push(i);
            bombCount++;
        } else {
            grid.push(0);
        }
    }

    flags.splice(0, flags.length)
    console.log("bomb locations: " + bombs)
    console.log(grid)
    
    document.getElementById("bombsTest").innerHTML = "Bombs: " + bombCount;
    correctFlagCount = bombCount;
}

canvas.addEventListener("click", function reveal(event) {
    
    x = event.clientX;
    y = event.clientY;
    console.log("X: " + x + ", Y: " + y)

    squareNum = (Math.ceil((x - 7) / 40)) + (numOfHorizontalSquares * (Math.ceil((y - 182) / 40) - 1));
    console.log("squareNum: " + squareNum)
    if (clickedSquares.indexOf(squareNum) !== -1) {
        //if its already been clicked than stop
        return 0;
    }
    
    if (!event.shiftKey) {
        clickedSquares.push(squareNum);
    }
    
    if (flags.indexOf(squareNum) == -1) {    
        drawThings();
    }
    
    if (event.shiftKey) {
        if (flags.indexOf(squareNum) == -1) {
            drawFlag();

            if (bombs.indexOf(squareNum - 1) !== -1) {
                correctFlagCount--;
            }

            bombCount--;
            document.getElementById("bombsTest").innerHTML = "Bombs: " + bombCount;

            flags.push(squareNum);
        } else {
              
            ctx.clearRect(((Math.ceil((x - 7) / 40)) - 1) * 40 + 1, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 1), 38, 38);
            ctx.fillStyle = "#d3d3d3";
            ctx.fillRect(((Math.ceil((x - 7) / 40)) - 1) * 40 + 1, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 1), 38, 38);
            
            flags.splice(flags.indexOf(squareNum), 1);
            bombCount++;
            document.getElementById("bombsTest").innerHTML = "Bombs: " + bombCount; 
            
            if (bombs.indexOf(squareNum - 1) !== -1) {
                correctFlagCount++;
            }
        }
        clickedSquares.splice(clickedSquares.indexOf(squareNum), 1);
    console.log("flags:" + flags);
    }
    
    function drawThings() {

    //var doubleClickCheck = clickedSquares.indexOf(squareNum);

    adjMines = 0;    
    //console.log("hori: " + numOfHorizontalSquares + " vert: " + numOfVerticalSquares)
    //console.log("squareNum = " + (squareNum - 1));
    //console.log("below is: " + grid[(squareNum - 1) + numOfHorizontalSquares])
        
    if (grid[squareNum - 1 - 1] == 1 && (squareNum - 1) % numOfHorizontalSquares !== 0) {
        adjMines++;
    } 
    if (grid[squareNum - 1 + 1] == 1 && squareNum % numOfHorizontalSquares !== 0) {
        adjMines++;
    }
    if (grid[squareNum - 1 + numOfHorizontalSquares - 1] == 1 && (squareNum - 1) % numOfHorizontalSquares !== 0) {
        adjMines++;
    }
    if (grid[squareNum - 1 + numOfHorizontalSquares] == 1) {
        adjMines++;
    }
    if (grid[squareNum - 1 + numOfHorizontalSquares + 1] == 1  && squareNum % numOfHorizontalSquares !== 0) {
        adjMines++;
    } 
    if (grid[squareNum - 1 - numOfHorizontalSquares + 1] == 1 && squareNum % numOfHorizontalSquares !== 0) {
        adjMines++;
    }
    if (grid[squareNum - 1 - numOfHorizontalSquares] == 1) {
        adjMines++;
    }
    if (grid[squareNum - 1 - numOfHorizontalSquares - 1] == 1 && (squareNum - 1) % numOfHorizontalSquares !== 0) {
        adjMines++;
    }
    //console.log("You clicked on " + (squareNum)); 
    //console.log("there are " + adjMines + " surrounding mines")

    if (grid[squareNum - 1] == 1 && !event.shiftKey && !victory) { //checks if clicked square is a bomb
        document.getElementById("victory").innerHTML = "Game OVer!";
        gameover = true;
    } else {
        if (!gameover && /*doubleClickCheck == -1 &&*/ !event.shiftKey && flags.indexOf(squareNum) == -1) {
        switch (adjMines) {
            case 0:
                drawZero();
                /* This next bit checks all squares around a zero (starting from the top left and moving clockwise) and adds each value to a list then runs the list all at once
                This prevents cascading zeros from getting out of hand.
                */
                
                if(squaresQ.indexOf(squareNum - 1 - numOfHorizontalSquares) == -1 && (squareNum - 1) % numOfHorizontalSquares !== 0 && squareNum - numOfHorizontalSquares - 1 > 0) {
                xQ.push(x - 40);
                yQ.push(y - 40);
                squaresQ.push(squareNum - 1 - numOfHorizontalSquares);
                }
                   
                if(squaresQ.indexOf(squareNum - numOfHorizontalSquares) == -1 && squareNum - numOfHorizontalSquares > 0) {
                xQ.push(x);
                yQ.push(y - 40);
                squaresQ.push(squareNum - numOfHorizontalSquares);
                }
                
                if(squaresQ.indexOf(squareNum - numOfHorizontalSquares + 1) == -1 && squareNum % numOfHorizontalSquares !== 0 && squareNum - numOfHorizontalSquares + 1 > 0) {
                xQ.push(x + 40);
                yQ.push(y - 40);
                squaresQ.push(squareNum - numOfHorizontalSquares + 1);
                }
 
                if(squaresQ.indexOf(squareNum + 1) == -1 && squareNum % numOfHorizontalSquares !== 0) {
                xQ.push(x + 40);
                yQ.push(y);
                squaresQ.push(squareNum + 1);
                }
                
                if(squaresQ.indexOf(squareNum + 1 + numOfHorizontalSquares) == -1 && squareNum % numOfHorizontalSquares !== 0 && squareNum + numOfHorizontalSquares <= numOfSquares) {
                xQ.push(x + 40);
                yQ.push(y + 40);
                squaresQ.push(squareNum + 1 + numOfHorizontalSquares);
                }
                
                if(squaresQ.indexOf(squareNum + numOfHorizontalSquares) == -1 && squareNum + numOfHorizontalSquares <= numOfSquares) {
                xQ.push(x);
                yQ.push(y + 40);
                squaresQ.push(squareNum + numOfHorizontalSquares);
                }
                
                if(squaresQ.indexOf(squareNum + numOfHorizontalSquares - 1) == -1 && (squareNum - 1) % numOfHorizontalSquares !== 0 && squareNum + numOfHorizontalSquares - 1 <= numOfSquares) {
                xQ.push(x - 40);
                yQ.push(y + 40);
                squaresQ.push(squareNum + numOfHorizontalSquares - 1);         
                }
                
                if(squaresQ.indexOf(squareNum - 1) == -1 && (squareNum - 1) % numOfHorizontalSquares !== 0) {
                xQ.push(x - 40);
                yQ.push(y);
                squaresQ.push(squareNum - 1);
                }
                
                if (checkQ == false) {
                    runQ();
                }
                break;
                
            case 1:
                drawOne();
                break;
                
            case 2:
                drawTwo();
                break;
                
            case 3:
                drawThree();
                break;
                
            case 4:
                drawFour();
                break;

            case 5:
                drawFive();
                break;

            case 6:
                drawSix();
                break;

            case 7:
                drawSeven();
                break;

            case 8:
                drawEight();
                break;
            }
        }
            /* if (!event.shiftKey) {
                clickedSquares.push(squareNum);
            } */
        }
    }
    
   
    function runQ() {
        checkQ = true;
        for(var i = 0; i < squaresQ.length; i++){
            if(i<500){ //cap on i to prevent infi loops        
                x = xQ[i]
                y = yQ[i]
                squareNum = squaresQ[i]
                if (clickedSquares.indexOf(squareNum) == -1) {
                    clickedSquares.push(squareNum); 
                    drawThings();
                } 
                
                
            } else {
                console.log("uh-oh i > 500. error")
            }
        }
        xQ.splice(0,xQ.length);
        yQ.splice(0,yQ.length)
        squaresQ.splice(0,squaresQ.length)
        checkQ = false;
    }
    
    if (bombCount == 0 && correctFlagCount == 0) {
        document.getElementById("victory").innerHTML = "You win!!";
        victory = true;
    }
    //console.log(clickedSquares)
})
    

function drawZero() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.stroke();
}

function drawOne() {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 20, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo((Math.ceil((x - 7) / 40) - 1) * 40 + 20, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.stroke();
}

function drawTwo() {
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.stroke();
}

function drawThree() {
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10));
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10));
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20));
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20));
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20));
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30));
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30));
    ctx.stroke();
}

function drawFour() {
    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.stroke();
}

function drawFive() {
    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 25, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.arc(((Math.ceil((x - 7) / 40)) - 1) * 40 + 25,(((Math.ceil((y - 182) / 40)) - 1) * 40 + 25),5,1.5 * Math.PI, 0.5 * Math.PI)
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.stroke();
    ctx.arc
}

function drawSix() {
    ctx.beginPath();
    ctx.strokeStyle = "magenta";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.stroke();
}

function drawSeven() {
    ctx.beginPath();
    ctx.strokeStyle = "indigo";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.stroke();
}

function drawEight() {
    ctx.beginPath();
     ctx.strokeStyle = "violet";
     ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
     ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
     ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
     ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
     ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
     ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
     ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
     ctx.stroke();
}

function drawFlag() {
    ctx.beginPath();
    ctx.strokeStyle = "purple";
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 20, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 20, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 15, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 15))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 20, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 10))   
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 20, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 20))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 20, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.moveTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 10, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))
    ctx.lineTo(((Math.ceil((x - 7) / 40)) - 1) * 40 + 30, (((Math.ceil((y - 182) / 40)) - 1) * 40 + 30))  
    ctx.stroke();    
}


//timer
var h3 = document.getElementsByTagName('h3')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    if (!victory && !gameover) {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        h3.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    } else {
        clearInterval(t);
    }
    
}
function timer() {
    t = setInterval(add, 1000);
}
timer();



//broken
/*
var height = document.forms["height"];
var width = document.forms["width"];
*/
document.addEventListener("submit", reshape, false);
function reshape(e) {
    clearInterval(t);
    seconds = 0, minutes = 0, hours = 0
    h3.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer()
    document.getElementById("victory").innerHTML = "minsweeper";
    e.preventDefault();
    var hValue = parseInt(document.getElementById("heightBox").value);
    var wValue = parseInt(document.getElementById("widthBox").value);
    numOfHorizontalSquares = wValue;
    numOfVerticalSquares = hValue;
    numOfSquares = wValue * hValue;
    generateSquares();

}



/*
//nope that didnt work either...
document.addEventListener('submit',function(e){
    localStorage.setItem("height", document.getElementById("heightBox").value);
    localStorage.setItem("width", document.getElementById("widthBox").value);
    localStorage.setItem("go", "true");
    
})
*/
document.addEventListener("keydown", keyDownHandler, false);

//shift + z clears the gameover and allows player to continue
function keyDownHandler(e) {
    if (e.which == 90 && e.shiftKey == true) {
        e.preventDefault();
        gameover = false;
        document.getElementById("victory").innerHTML = "minsweeper";
        add();
    }
}