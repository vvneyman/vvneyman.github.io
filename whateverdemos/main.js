var speed = 10;
var x = 0

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(0);
    //circle(mouseX, mouseY, 50);
    var x = windowWidth / 2;
    var y = windowHeight / 2;
    fill(255, 0, 0);
    circle(x,y,50);
    if (x>width) {
        speed = -10;
    } else if (x<0) {
        speed = 10;
    }
    x = x + speed;

    while (x<windowWidth) {
        fill(255);
        circle(x, y, 50);
        x = x + 50;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}