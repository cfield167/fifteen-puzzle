/*
Name: Connor J Field
Filename:Fifteen.js
Function: Runs and styles the fifteen puzzle game
*/

"use strict";

//global variables 
var piece; 
var Y;
var X;


 window.onload = function ()

{

	var puzzleArea = document.getElementById('puzzlearea');
	piece = puzzleArea.getElementsByTagName('div'); //retrieve element within puzzlearea

	for (var i=0; i<piece.length; i++) //applies features to each puzzle piece 
	{
		piece[i].className = 'piece'; //creates a class for all pieces
		piece[i].style.left = (i%4*100)+'px'; //finds the position for puzzle pieces from the left of the screen
		piece[i].style.top = (parseInt(i/4)*100) + 'px'; //finds the position for puzzle pieces from the top of the screen
		piece[i].style.backgroundPosition= '-' + piece[i].style.left + ' ' + '-' + piece[i].style.top; 
		//ensures that the background moves in relation to the puzzlepieces


		//checks to see if the piece is moveable if you run your mouse over
		//if it is, then change the style of the puzzle piece
		piece[i].onmouseover = function()
		{
			if (canMove(parseInt(this.innerHTML)))
			{
				//changes background and text color to red
				this.style.border = "5px solid red";
				this.style.color = "red";
			}

		};

		//when you move the mouse out of a moveable piece, then it reverts to
		//its normal styling
		piece[i].onmouseout = function()

		{
			this.style.border = "5px solid black";
			this.style.color = "#000000";
		};


		//sees if you can move the puzzlepiece and if you can then swap
		//if all pieces in right position call the function to alert the user
		piece[i].onclick = function()

		{
			if (canMove(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);

				//check if all of the pieces are in the right space and if they are
				//then alert the user they won
				if (finish())
				{
					gotTheDub();
				}
				return;
			}
		};
	}


	var shuffle = document.getElementById('shufflebutton'); //initializes the shuffle button

	X = '300px'; 
	Y = '300px';

	//shuffles the puzzle
	shuffle.onclick = function()
	{
		for (var i=0; i<300; i++)
		{
			var rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece
			if (rand == 0)
			{
				var temp = up(X, Y); 
				if ( temp != -1)
				{
					swap(temp);
				}
			}
			if (rand == 1)
			{
				var temp = down(X, Y);
				if ( temp != -1) 
				{
					swap(temp);
				}
			}

			if (rand == 2)
			{
				var temp = left(X, Y);
				if ( temp != -1)
				{
					swap(temp);
				}
			}

			if (rand == 3)
			{
				var temp = right(X, Y);
				if (temp != -1)
				{
					swap(temp);
				}
			}
		}
	};
};

//checks if a move can be made
function canMove(position)

{
	if (left(X, Y) == (position-1))
	{
		return true;
	}

	if (down(X, Y) == (position-1))
	{
		return true;
	}

	if (up(X, Y) == (position-1))
	{
		return true;
	}

	if (right(X, Y) == (position-1))
	{
		return true;
	}
}

function gotTheDub() //notifies the user they won
{
		alert('Congratulations! You solved the puzzle!'); //tells the user that they have won the game
		return;
}

//checks if all of the pieces are in the right spot or not
function finish()
{
	var flag = true;
	for (var i = 0; i < piece.length; i++)
 	{
		var top = parseInt(piece[i].style.top);
		var left = parseInt(piece[i].style.left);

		if (left != (i%4*100) || top != parseInt(i/4)*100)
		{
			flag = false;
			break;
		}
	}

	return flag;
}

//sees if a puzzlepiece can move left
function left(x, y)
{
	var posX = parseInt(x);
	var posY = parseInt(y);

	if (posX > 0)
	{
		for (var i = 0; i < piece.length; i++) 
		{
			if (parseInt(piece[i].style.left) + 100 == posX && parseInt(piece[i].style.top) == posY)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

//sees if a puzzle piece can move right
function right (x, y)
{
	var posX = parseInt(x);
	var posY = parseInt(y);
	if (posX < 300)
	{
		for (var i =0; i<piece.length; i++){
			if (parseInt(piece[i].style.left) - 100 == posX && parseInt(piece[i].style.top) == posY) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

//sees if a puzzle piece can move up
function up(x, y)
{
	var posX = parseInt(x);
	var posY = parseInt(y);
	if (posY > 0)
	{
		for (var i=0; i<piece.length; i++)
		{
			if (parseInt(piece[i].style.top) + 100 == posY && parseInt(piece[i].style.left) == posX) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

//sees if a puzzle piece can move down
function down (x, y)
{
	var posX = parseInt(x);
	var posY = parseInt(y);
	if (posY < 300)
	{
		for (var i=0; i<piece.length; i++)
		{
			if (parseInt(piece[i].style.top) - 100 == posY && parseInt(piece[i].style.left) == posX) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

//swaps a puzzle piece into an empty space
function swap (position)
{
	var temp = piece[position].style.top;
	piece[position].style.top = Y;
	Y = temp;
	temp = piece[position].style.left;
	piece[position].style.left = X;
	X = temp;
}
