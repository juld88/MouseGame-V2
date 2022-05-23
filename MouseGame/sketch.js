var mouse, mouseImage;
var knife, knifeImage;
var wallImage;
var launched = false;
var deadMouseImage;
var mouseDead = false;
var upDeadMouseImage;
var direction = "down";
var floorImage;
var reset = true;

function preload() {
    knifeImage = loadImage("./assets/Knife.png");
    mouseImage = loadImage("./assets/Mouse.png");
    wallImage = loadImage("./assets/Wall.png");
    upMouseImage = loadImage("./assets/UpMouse.png");
    deadMouseImage = loadImage("./assets/deadMouse.png");
    upDeadMouseImage = loadImage("./assets/upDeadMouse.png");
    floorImage = loadImage("./assets/Floor.png");
}

function setup() {
    var canvas = createCanvas(600, 500);

    mouse = createSprite(50, 50, 10, 50);
    mouse.addImage(mouseImage);
    mouse.scale = 0.5;

    knife = createSprite(300, 200, 10, 10);
    knife.addImage(knifeImage);
    knife.scale = 0.5;
}

function draw() {
    background(floorImage);

        if(keyIsDown(32)) {
            launch();
        }

        if(launched === false) {
            movement();
            knifeMovement();
        }

        if(launched === true) {
            stab();
        }
    drawSprites();
}

function movement() {
    if(keyIsDown(DOWN_ARROW) && mouse.position.y <= 450) {
        mouse.position.y += 5;
        mouse.addImage(mouseImage);
        direction = "down";
    }
    
    if(keyIsDown(UP_ARROW) && mouse.position.y >= 50) {
        mouse.position.y -= 5;
        mouse.addImage(upMouseImage);
        direction = "up";
    }
    
}

function knifeMovement() {
    if(keyIsDown(83) && knife.position.y <= 450) {
        knife.position.y += 3;
    }
    
    if(keyIsDown(87) && knife.position.y >= 50) {
        knife.position.y -= 3;
    }
    
}

function launch() {
    launched = true;
    if(keyIsDown(32) && knife.position.x >= 0 && reset === true) {
        knife.position.x-=5;
        stab();
    }
}

function stab() {
     if(knife.overlap(mouse)) {
        if(direction === "down") {
        mouse.addImage(deadMouseImage);
        }
        else if(direction === "up") {
            mouse.addImage(upDeadMouseImage);
        }
        mouseDead = true;
    }

    else if(mouseDead === false && knife.position.x === 0) {
        reset = false;

        if(keyIsDown(13)) {
            knife.position.x = 300;
            launched = false;
            reset = true;
        }
    }

}