// var log = (console.log);

var hangCanvas = document.getElementById("hangCanvas");

var ctx = hangCanvas.getContext("2d");

ctx.lineWidth = 3;

// gallows
ctx.fillRect(200,20, 15, 450);
ctx.fillRect(200,20, 120, 15);
ctx.fillRect(150,455, 200, 15);

function clearCanvas() {

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, hangCanvas.width, hangCanvas.height);
    ctx.beginPath();

    ctx.lineWidth = 3;

    // gallows
    ctx.fillRect(200,20, 15, 450);
    ctx.fillRect(200,20, 120, 15);
    ctx.fillRect(150,455, 200, 15);

}

function hangTheMan(guesscount) {

    // noose
    if(guesscount == 6) {
        ctx.moveTo(310,20);
        ctx.lineTo(310, 110);
        ctx.stroke();

    }

    // head
    if(guesscount == 5) {
        ctx.beginPath();
        ctx.arc(310, 140, 30, 0, 2 * Math.PI);
        ctx.stroke(); 
    }

    // body
    if(guesscount == 4) {
        ctx.moveTo(310,170);
        ctx.lineTo(310, 300);
        ctx.stroke();
    }

    // left arm
    if(guesscount == 3) {
        ctx.moveTo(310,190);
        ctx.lineTo(250, 250);
        ctx.stroke();
    }

    // right arm
    if(guesscount == 2) {
        ctx.moveTo(310,190);
        ctx.lineTo(370, 250);
        ctx.stroke();
    }

    // left leg
    if(guesscount == 1) {
        ctx.moveTo(310,300);
        ctx.lineTo(250, 400 );
        ctx.stroke();
    }

    // right leg
    if(guesscount == 0) {
        ctx.moveTo(310,300);
        ctx.lineTo(360, 400);
        ctx.stroke();
    }

    // if ( guesscount <0 && guesscount !=7)
    // function clearCanvas() {

    //     ctx.clearRect(0, 0, hangCanvas.width, hangCanvas.height);
    
    //     ctx.lineWidth = 3;
    // then reset canvas for new game
    // log (hangCanvas);

}