var ball;
var position, database;

function setup(){

    database= firebase.database()

    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var ballPosition= database.ref('ball/position')
    ballPosition.on("value",readPosition,showError)

}
// .ref()    to refer to the database
// .on()     to read the values fron the database
// .set()    to write the new values in the database
// .update() to update the already written values from the database

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({

        'x': position.x + x,
        'y': position.y + y,
    })
}

function readPosition(data){
    position= data.val();
    ball.x= position.x;
    ball.y=position.y;
}

function showError(){
    console.log("THE DATABASE IS NOT GETTING CONNECTED NOW. TRY AGAIN LATER") 
}
