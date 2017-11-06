
//Notification when game ends

"use strict";
var section;
var test;
var timer;
var spaceA;
var spaceB;


function moveCheck(position) // Testing if a tile can move.

{
  if (calLeft(spaceB, spaceA) == (position-1))
  {
    return true;
  }

  if (calDown(spaceB, spaceA) == (position-1))
  {
    return true;
  }

  if (calUp(spaceB, spaceA) == (position-1))
  {
    return true;
  }

  if (calRight(spaceB, spaceA) == (position-1))
  {
    return true;
  }
}


function Test() // use to check if you win and to echo out a you win msg for a period of time. 
{
  test --;
  if (test == 0)
  {
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#FFFFFF";
    alert('you win');
    return;
  }
  if (test % 2)
  {
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#00FF00";  
  }
  else
  {
    var body = document.getElementsByTagName('body');
    body[0].style.backgroundColor = "#FF0000";
  }

  timer = setTimeout(Test, 100);
}


function winGame() // calls the test function and set background to a certain color when you win 
{
  var body = document.getElementsByTagName('body');
  body[0].style.backgroundColor = "#FF0000";
  test = 10;
  timer = setTimeout(Test, 100);
}


function arrange() // checks if tiles are arrange in the correct position 
{
  var trial = true;
  for (var i = 0; i < section.length; i++) {
    var y = parseInt(section[i].style.top);
    var x = parseInt(section[i].style.left);

    if (x != (i%4*100) || y != parseInt(i/4)*100)
    {
      trial = false;
      break;
    }
  }
  return trial;
}


function calLeft(x, y) // Check for empty space to move tiles left.
{
  var xx = parseInt(x);
  var yy = parseInt(y);

  if (xx > 0)
  {
    for (var i = 0; i < section.length; i++) 
    {
      if (parseInt(section[i].style.left) + 100 == xx && parseInt(section[i].style.top) == yy)
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

function calRight (x, y) //Check for empty space to move tiles right.
{ 
  var xx = parseInt(x);
  var yy = parseInt(y);
  if (xx < 300)
  {
    for (var i =0; i<section.length; i++){
      if (parseInt(section[i].style.left) - 100 == xx && parseInt(section[i].style.top) == yy) 
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

function calUp (x, y) //Check for empty space to move tiles upwards.
{
  var xx = parseInt(x);
  var yy = parseInt(y);
  if (yy > 0)
  {
    for (var i=0; i<section.length; i++)
    {
      if (parseInt(section[i].style.top) + 100 == yy && parseInt(section[i].style.left) == xx) 
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

function calDown (x, y) //Check for empty space to move tiles downwards.
{
  var xx = parseInt(x);
  var yy = parseInt(y);
  if (yy < 300)
  {
    for (var i=0; i<section.length; i++)
    {
      if (parseInt(section[i].style.top) - 100 == yy && parseInt(section[i].style.left) == xx) 
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

function swap (pos) {                         //Change tile position.
  var temp = section[pos].style.top;
  section[pos].style.top = spaceA;
  spaceA = temp;

  temp = section[pos].style.left;
  section[pos].style.left = spaceB;
  spaceB= temp;
}

window.onload = function ()
{
  var maze = document.getElementById('puzzlearea');
  
  section = maze.getElementsByTagName('div');

  for (var i=0; i<section.length; i++)
  {
    section[i].setAttribute("class","puzzlepiece");
    section[i].style.left = (i%4*100)+'px';
    section[i].style.top = (parseInt(i/4)*100) + 'px';
    section[i].style.backgroundPosition= '-' + section[i].style.left + ' ' + '-' + section[i].style.top;
    section[i].onmouseover = function()
    {
      if (moveCheck(parseInt(this.innerHTML)))
      {
        this.setAttribute("class","puzzlepiece movablepiece");
      }
    };
    section[i].onmouseout = function()
    {
      this.setAttribute("class","puzzlepiece");
    };

    section[i].onclick = function()
    {
      if (moveCheck(parseInt(this.innerHTML)))
      {
        swap(this.innerHTML-1);
        if (arrange())
        {
          winGame();
        }
        return;
      }
    };
  }

  spaceB = '300px';
  spaceA = '300px';

  var sButton = document.getElementById('shufflebutton'); // Arrange tiles in random order once shuffle button is clicked.
  sButton.onclick = function()
  {

    for (var i=0; i<250; i++)
    {
      var rand = parseInt(Math.random()* 100) %4;
      if (rand == 0)
      {
        var tmp = calUp(spaceB, spaceA);
        if ( tmp != -1)
        {
          swap(tmp);
        }
      }
      if (rand == 1)
      {
        var tmp = calDown(spaceB, spaceA);
        if ( tmp != -1) 
        {
          swap(tmp);
        }
      }

      if (rand == 2)
      {
        var tmp = calLeft(spaceB, spaceA);
        if ( tmp != -1)
        {
          swap(tmp);
        }
      }

      if (rand == 3)
      {
        var tmp = calRight(spaceB, spaceA);
        if (tmp != -1)
        {
          swap(tmp);
        }
      }
    }
  };
};