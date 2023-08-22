var done= new Array();
let ctr=0;
let level=0;
let remTime;
var time;
let matches=0;

const image_map = { 
    '1' : "images/img1.jpg",
    '2' : "images/img2.jpg",
    '3' : "images/img3.jpg",
    '4' : "images/img4.jpg",
    '5' : "images/img5.jpg",
    '6' : "images/img6.jpg",
  }

image_grid= new Array();

function clear_tiles(id1, id2){
    document.getElementById(id1).src="images/tile.jpg";
    document.getElementById(id2).src="images/tile.jpg";
}

function clear_board(){
    for(let i=1;i<=12;i++){
        document.getElementById("img"+i).src="images/tile.jpg";
    }
  }



function check(id1, id2){
    if(document.getElementById(id1).src.localeCompare(document.getElementById(id2).src)==0)
    {
        document.getElementById(id1).src="images/thumsup.jpg";
        document.getElementById(id2).src="images/thumsup.jpg";
        matches+=1;
        return 1;
    }
    return -1;
}
function flip(id){
    console.log(ctr);
    
    {
        
        ctr+=1;
        document.getElementById(id).src=image_map[image_grid[parseInt(id.slice(3))-1]];
        console.log(document.getElementById(id).src);
        
        
        if(ctr==2)
        {
            if(check(done[0],id)==-1)
            {
                setTimeout(clear_tiles, 1000, done[0], id);
                
            }
            ctr=0;
        }

        else
        {
            done[0]=id;
        }
    }

}

function shuffle(){
    console.log("shuffle started");
    var unique_indices = new Array();
    for(let i=1;i<=6;i++)
    {
        //Insert images as pairs
        for(let j=1;j<=2;j++)
        {
        var random_index; 
        do{
            random_index = Math.floor(Math.random()*12); //0 to n-1
        }while(unique_indices.includes(random_index));
        unique_indices.push(random_index);  
        image_grid[random_index] = i; //Store only the index
        }
    }
    for(let i=0;i<image_grid.length;i++)
        console.log(i,image_grid[i]);

}

function display(){
    for(let i=1;i<=12;i++){
        document.getElementById("img"+i).src=image_map[image_grid[i-1]];
    }
  }
function timer(){
    document.getElementById("timer").innerHTML="timer: "+remTime+" seconds";
    document.getElementById("score").innerHTML="score: "+matches+" matches";
    remTime--;
    if(remTime < 0) //If time is over
    {
       gameover("TIME OVER!! you LOSE...you have the memory of a gold fish... Final Score is "+matches);
       display();
    }

    if(matches==6)
    {
        gameover("You Won! With "+ remTime + " seconds left.");
    }
  }
  
function gameover(content){
    clearInterval(time); //Buitltin function - stop timer started by setinterval
    game_start = false;
    document.getElementById("timer").style="display:none";
    document.getElementById("score").style="display:none";
    document.getElementById("gameover").style="text-align: center;display:block";
    document.getElementById("gameover").innerHTML=content;
  }

function start(){
    clear_board();
    shuffle();
    document.getElementById("board").style="text-align: center;display:block";
    document.getElementById("timer").style="text-align: center;display:block";
    document.getElementById("score").style="text-align: center;display:block";
    level=document.getElementById("diff").value
    if (level == 1) remTime = 60; 
    else if (level == 2) remTime = 40;
    else remTime = 20;

    time = setInterval(timer, 1000); //Start Timer - calls every 1s
}