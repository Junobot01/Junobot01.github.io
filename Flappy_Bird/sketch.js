// Human playing vars
var humanPlaying = true;
var player;

// Adjustable vars
var gravity = 20 / 60.0;
var jump = -7.5;

// Bird vars
var birdSize = 50;
var flapSpeed = 5;
var birdSpeed = 3;

// Ground vars
var ground_anchor = 0.0;
var groundHeight = 0.1;

// Pipe vars


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
var ground_src;
var ground_image;

// Game vars
var gameStart = false;

function preload() {

	background_image = createImage(canvasWidth, canvasHeight);
	background_src = loadImage("assets/background.png");
	bird_whole_image = loadImage("assets/bird.png");
	ground_src = loadImage("assets/ground.png");

}


function setup() {

	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.center('horizontal');
	
	background_src.resize(canvas.width, canvas.height*(1-groundHeight));
	background_image.copy(background_src, 0, 0, background_src.width, background_src.height, 0, 0, background_src.width, background_src.height);

	// Split bird image
	for (var i=0; i<2*bird_image_count-3; i++) {
		var j = bird_image_count-1-Math.abs(i-bird_image_count+1)
		var img = bird_whole_image.get(j*bird_whole_image.width/bird_image_count, 0, bird_whole_image.width/bird_image_count, bird_whole_image.height);
		img.resize(birdSize*img.width/img.height, birdSize);
		bird_image_list.push(img);
	}
	bird_image = bird_image_list[frame];

	// Resize ground image vertically
	ground_src.resize(ground_src.width, canvas.height*groundHeight);
	// Copy ground image horizontally so that (ground_image.width>2*canvas.width)
	var ground_copy = 2*Math.floor(canvas.width/ground_src.width)+2;
	ground_image = createImage(ground_copy*ground_src.width, ground_src.height);
	for (var i = 0; i < ground_copy; i++) {
		ground_image.copy(ground_src, 0, 0, ground_src.width, ground_src.height, i*ground_src.width, 0, ground_src.width, ground_src.height);
	}

	player = new Bird();

}

function draw() {

	background(background_image);
	image(ground_image, ground_anchor-ground_image.width/2.0, canvas.height*(1-groundHeight));
	ground_anchor = (ground_anchor-birdSpeed+canvas.width) % canvas.width;
	
	if (gameStart) {
		player.update();	
		player.vel.y += gravity;		
	}
	bird_image = bird_image_list[Math.floor(frame/flapSpeed)%bird_image_list.length];
	image(bird_image, player.pos.x-bird_image.width/2.0, player.pos.y-bird_image.height/2.0);

	frame++;

}

function mouseClciked() {
	
	player.vel.y = jump;
	gameStart = true;

	return false;

}

