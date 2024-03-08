let twoDimensionalArr = 
[ 
    [ 5, 5, 5, 5, 5, 5, 5],
    [ 5, 5, 5, 5, 5, 5, 5],
    [ 5, 5, 5, 5, 5, 5, 5],
    [ 5, 5, 5, 5, 5, 5, 5],
    [ 5, 5, 5, 5, 5, 5, 5],
    [ 5, 5, 5, 5, 5, 5, 5]
 ];
 var click_count = 0;

function initiateGame()
{
    click_count = 0;
    console. log("Hello Connect4 Game!"); 
    //alert("Hello Connect4 Game!"); 
    createTable();
}

/*function myHypeDocument1()
{
    console. log("Hello Light");
    //alert("Selected Radio Button is: Light");  
    document.documentElement.setAttribute('web-theme', 'Light');
    document.getElementById('body1').setAttribute('web-theme', 'Light');
}
*/
 
function createTable()
{
    const body = document.body, 
    tbl = document.createElement('table');
    tbl.setAttribute("id", "playTable");
  
    tbl.style.height = '500px';
    tbl.style.width = '550px';
    tbl.style.border = '1px solid black';
    tbl.className = 'grid';

    for (let i = 0; i < 6; i++) 
    {
        const tr = tbl.insertRow();
        tr.setAttribute("name",i);
        for (let j = 0; j < 7; j++) 
        {   
            const td = tr.insertCell();
            td.setAttribute("name", j);
            //td.addEventListener("click",initArray(i,j));
            twoDimensionalArr[i][j] =0;
            //td.appendChild(document.createTextNode(`Cell I${i}/J${j}` + "\n" +twoDimensionalArr[i][j]));
            td.style.border = '1px solid black';
        }
    }
    body.appendChild(tbl);

    const cells = document.querySelectorAll('td');
    cells.forEach(cell => 
    {
        //cell.addEventListener('click', cell_clicked(cell.closest('tr').rowIndex , cell.cellIndex))
        cell.addEventListener('click', () =>
        cell_clicked( cell, cell.closest('tr').rowIndex , cell.cellIndex)
        //console.log("Row index: " + cell.closest('tr').rowIndex + " | Column index: " + cell.cellIndex)
        );
        
    });

    const buttonItem = document.getElementById("button1");
    buttonItem.setAttribute("disabled",true);
    buttonItem.disabled = true;
}



//for debug only
function printArray()
{
    console.log(twoDimensionalArr);
}

function cell_clicked(r,x,y)
{
    if(twoDimensionalArr[x][y]== 0)
    {
        click_count++;
    }
    console.log("Row index: " + x+ " | Column index: " + y);
    console.log((click_count%2) +1);
    
    var node = document.getElementById('counter');
    var turn;
    var color;

    //Setting up text and color for the player based on the click count
    const para = document.getElementById("counter");
    para.style.backgroundColor= '#008CBA';
    if ((click_count%2 +1) == 1)
    {
        turn = 'Player1';
        color = 'YELLOW';
        para.style.color='yellow';
    }
    else if((click_count%2 +1) == 2)
    {
        turn = 'Player2';
        color = 'RED';
        para.style.color='red';
    }

 

    //Mark the text whose turn is it at present going on.
    if(node.hasChildNodes)
        node.replaceChildren(document.createTextNode('Play Turn of: ' + turn + ' Color is ' + color  ));
    else
        node.appendChild(document.createTextNode('Play Turn of: ' + turn + ' Color is ' + color  ));
    
    /*
    if(click_count%2 +1 == 2)
        r.style.backgroundColor = "yellow"; 
    else if (click_count%2 +1 == 1)
        r.style.backgroundColor = "red"; 
    */

    for(let i = 5; i>=x; i--)
    {
        if(twoDimensionalArr[i][y] == 0)
        {
            twoDimensionalArr[i][y] = click_count%2 +1;
            colorUICell(i,y);
            break;
        }
        else
        {
            continue;
        }
    }

    var winner = checkResult(); 
        
    //color the game array when clicked to the available position    
    
    const buttonItem = document.getElementById("button1");
    //buttonItem.setAttribute("disabled",true);
    //buttonItem.disabled = true;

    if (winner == 1 )
    {
        //player1 is the winner
        /*
        node.replaceChild(document.createTextNode("Player2 is the winner!"));
        */
        buttonItem.setAttribute("disabled", false);
        buttonItem.disabled = false;
        buttonItem.textContent = "Restart!";
        disableGrid();
        alert('player1 is the winner!'); 
    }
    else if (winner == 2)
    {
        //player 2 is the winner
        //node.replaceChild(document.createTextNode("Player1 is the winner!"));
        buttonItem.setAttribute("disabled", false);
        buttonItem.disabled = false;
        buttonItem.textContent = "Restart!";
        disableGrid();
        alert('player2 is the winner!'); 
    }
    else if (winner == 3)
    {
        //draw
        //node.replaceChild(document.createTextNode("It's a draw!"));
        buttonItem.setAttribute("disabled", false);
        buttonItem.disabled = false;
        buttonItem.textContent = "Restart!";
        disableGrid();
        alert('It is a draw!'); 
    }
    else if (winner == 4)
    {
        //Play is still open
        console.log("Play is still open!!");
    }

}

function checkResult()
{
    var winner = 3;
    for(let i = 0; i<6; i++)
    {
        for(let j = 0; j<7; j++)
        {
            //check right (Horizontally)
            if(j<4)
            {
                if(twoDimensionalArr[i][j] == 1 && twoDimensionalArr[i][j+1] == 1 && twoDimensionalArr[i][j+2] == 1 && twoDimensionalArr[i][j+3] == 1)
                {
                    winner = 2;//player 1 is the winner
                    blinkAnimate(i,j,'h');
                    blinkAnimate(i,j+1,'h');
                    blinkAnimate(i,j+2,'h');
                    blinkAnimate(i,j+3,'h');
                    return winner;
                }
                else if(twoDimensionalArr[i][j] == 2 && twoDimensionalArr[i][j+1] == 2 && twoDimensionalArr[i][j+2] == 2 && twoDimensionalArr[i][j+3] == 2)
                {
                    winner = 1;//player 2 is the winner
                    blinkAnimate(i,j,'h');
                    blinkAnimate(i,j+1,'h');
                    blinkAnimate(i,j+2,'h');
                    blinkAnimate(i,j+3,'h');
                    return winner;
                }
                
            }
            //check below (Vertically)
            if(i<3)
            {
                if(twoDimensionalArr[i][j] == 1 && twoDimensionalArr[i+1][j] == 1 && twoDimensionalArr[i+2][j] == 1 && twoDimensionalArr[i+3][j] == 1)
                {
                    winner = 2;//player 1 is the winner
                    blinkAnimate(i,j,'v');
                    blinkAnimate(i+1,j,'v');
                    blinkAnimate(i+2,j,'v');
                    blinkAnimate(i+3,j,'v');

                    return winner;
                }
                else if(twoDimensionalArr[i][j] == 2 && twoDimensionalArr[i+1][j] == 2 && twoDimensionalArr[i+2][j] == 2 && twoDimensionalArr[i+3][j] == 2)
                {
                    winner = 1;//player 2 is the winner
                    blinkAnimate(i,j,'v');
                    blinkAnimate(i+1,j,'v');
                    blinkAnimate(i+2,j,'v');
                    blinkAnimate(i+3,j,'v');
                    return winner;
                }
            }
            //check diagonally \\
            if (i<3 && j<4)
            {
                if(twoDimensionalArr[i][j] == 1 && twoDimensionalArr[i+1][j+1] == 1 && twoDimensionalArr[i+2][j+2] == 1 && twoDimensionalArr[i+3][j+3] == 1)
                {
                    winner = 2;//player 1 is the winner
                    blinkAnimate(i,j,'dr');
                    blinkAnimate(i+1,j+1,'dr');
                    blinkAnimate(i+2,j+2,'dr');
                    blinkAnimate(i+3,j+3,'dr');
                    return winner;
                }
                else if(twoDimensionalArr[i][j] == 2 && twoDimensionalArr[i+1][j+1] == 2 && twoDimensionalArr[i+2][j+2] == 2 && twoDimensionalArr[i+3][j+3] == 2)
                {
                    winner = 1;//player 2 is the winner
                    blinkAnimate(i,j,'dr');
                    blinkAnimate(i+1,j+1,'dr');
                    blinkAnimate(i+2,j+2,'dr');
                    blinkAnimate(i+3,j+3,'dr');
                    return winner;
                }
            }
            //check diagonally //
            if(i<3 && j>=3)
            {
                if(twoDimensionalArr[i][j] == 1 && twoDimensionalArr[i+1][j-1] == 1 && twoDimensionalArr[i+2][j-2] == 1 && twoDimensionalArr[i+3][j-3] == 1)
                {
                    winner = 2;//player 1 is the winner
                    blinkAnimate(i,j,'dl');
                    blinkAnimate(i+1,j-1,'dl');
                    blinkAnimate(i+2,j-2,'dl');
                    blinkAnimate(i+3,j-3,'dl');
                    return winner;
                }
                else if(twoDimensionalArr[i][j] == 2 && twoDimensionalArr[i+1][j-1] == 2 && twoDimensionalArr[i+2][j-2] == 2 && twoDimensionalArr[i+3][j-3] == 2)
                {
                    winner = 1;//player 2 is the winner
                    blinkAnimate(i,j,'dl');
                    blinkAnimate(i+1,j-1,'dl');
                    blinkAnimate(i+2,j-2,'dl');
                    blinkAnimate(i+3,j-3,'dl');
                    return winner;
                }
            }

        }

    }
    //check if the board has spaces to continue play
    for(let i = 0; i<6; i++)
    {
        for(let j = 0; j<7; j++)
        {
            if(twoDimensionalArr[i][j] == 0)
            {
                winner = 4;
                return winner;
            }
        }
    }

    return winner;
}

function colorUICell(a,b)
{
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => 
    {
        //cell.addEventListener('click', cell_clicked(cell.closest('tr').rowIndex , cell.cellIndex))
        
        if (cell.closest('tr').rowIndex == a && cell.cellIndex == b)
            if(click_count%2 +1 == 2)
            {
                cell.style.backgroundColor = "yellow";
            }
            else if (click_count%2 +1 == 1)
            {
                cell.style.backgroundColor = "red";
            }
        //cell.addEventListener('click', () =>
        //cell_clicked( cell, cell.closest('tr').rowIndex , cell.cellIndex)
        //console.log("Row index: " + cell.closest('tr').rowIndex + " | Column index: " + cell.cellIndex)
        //);
        
    });
}

function blinkAnimate(x,y,direction)
{
    console.log ("blink animation should begin");
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => 
    {
        if(cell.closest('tr').rowIndex == x && cell.cellIndex == y)
        {
            cell.className = "blink";
            console.log ("GOGA");
        }

    });
}
function disableGrid()
{
    
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => 
    {
        cell.removeEventListener("click",cell_clicked,true);
        //cell.ariaReadOnly = "true";


    });
    

    console.log("Disable it now!");
    const table = document.querySelectorAll('table');

}

