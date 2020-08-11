// Human playing vars
var humanPlaying = true;
var player;

// Adjustable vars
var gravity = 15 / 60.0;
var jump = -7.5;

// Bird vars
var birdSize = 50;
var flapSpeed = 5;

// Ground vars
var ground;
var groundHeight = 0.1;

// Pipe vars
var pipeSpeed = 5;

// Canvas vars
var canvas;
var canvasWidth = 400;
var canvasHeight = 600;
var frame = 1;

// Image vars
var background_src;
var background_image;
var bird_whole_image;
var bird_image;
var bird_image_list = [];
var bird_image_count = 3;

// Game vars
var gameStart = false;

function preload() {

	background_image = createImage(canvasWidth, canvasHeight);
	background_src = loadImage("assets/background.png");
	bird_whole_image = loadImage("assets/bird.png")

}


function setup() {

	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.center('horizontal');
	
	background_src.resize(canvas.width, canvas.height*(1-groundHeight));
	background_image.copy(background_src, 0, 0, background_src.width, background_src.height, 0, 0, background_src.width, background_src.height);
	

	player = new Bird();

// Split bird image
	for (var i=0; i<2*bird_image_count-3; i++) {
		var j = bird_image_count-1-Math.abs(i-bird_image_count+1)
		var img = bird_whole_image.get(j*bird_whole_image.width/bird_image_count, 0, bird_whole_image.width/bird_image_count, bird_whole_image.height);
		img.resize(birdSize*img.width/img.height, birdSize);
		bird_image_list.push(img);
	}
	bird_image = bird_image_list[frame];

}

function draw() {

	background(background_image);
	bird_image = bird_image_list[Math.floor(frame/flapSpeed)%bird_image_list.length];
	image(bird_image, player.pos.x-bird_image.width/2.0, player.pos.y-bird_image.height/2.0);

	if (gameStart) {
		player.update();	
		player.vel.y += gravity;		
	}

	frame++;

}

function mouseClicked() {
	
	player.vel.y = jump;
	gameStart = true;

}

