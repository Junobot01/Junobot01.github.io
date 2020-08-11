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
var background_image;
var bird_whole_image;
var bird_image;
var bird_image_list = [];
var bird_image_count = 3;

function preload() {

	background_image = loadImage("assets/background.png");
	bird_whole_image = loadImage("assets/bird.png")

}


function setup() {

	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.center('horizontal');

	background(0); // ! TEMPORARY CODE FOR SHOWING CANVAS ! ! TEMPORARY CODE FOR SHOWING CANVAS ! ! TEMPORARY CODE FOR SHOWING CANVAS !
	
	/**********************************************************************
	*****************TEMPORARY CODE FOR BUILDING STEPS*********************
	**********************************************************************/
	htmlStuff();
	
	background_image.resize(canvas.width, canvas.height*(1-groundHeight));

	player = new Bird();

// Split bird image
	for (var i=0; i<bird_image_count; i++) {
		var img = bird_whole_image.get(i*bird_whole_image.width/bird_image_count, 0, bird_whole_image.width/bird_image_count, bird_whole_image.height);
		img.resize(birdSize*img.width/img.height, birdSize);
		bird_image_list.push(img);
	}
	for (var i=bird_image_count-2; i>0; i--) {
		var img = bird_whole_image.get(i*bird_whole_image.width/bird_image_count, 0, bird_whole_image.width/bird_image_count, bird_whole_image.height);
		img.resize(birdSize*img.width/img.height, birdSize);
		bird_image_list.push(img);
	}
	bird_image = bird_image_list[frame];


/*********************************************************************************************************
 ***************************** * TEMPORARY CODE FOR CHECKING IMAGES **************************************
 *********************************************************************************************************
	for (var i=0; i<bird_image_count; i++) {
		var img = bird_image_list[i]
		image(img,(canvas.width-img.width)/2.0, (2*i+1)*canvas.height/bird_image_count/2-img.height/2);
	}
 ********************************************************************************************************/
}

function draw() {

	image(background_image, 0, 0);

	if (humanPlaying) {
		player.update();
	}

	player.vel.y += gravity;

	bird_image = bird_image_list[Math.floor(frame/flapSpeed)%bird_image_list.length];
	image(bird_image, player.pos.x-bird_image.width/2.0, player.pos.y-bird_image.height/2.0);

	frame++;
	stroke(0);
	line(0,canvas.height*0.98,canvas.width,canvas.height*0.95);

}

function mouseClicked() {
	
	player.vel.y = jump;

}


/**********************************************************************
*****************TEMPORARY CODE FOR BUILDING STEPS*********************
**********************************************************************/
function htmlStuff(){
  
  createElement("h3", "1. Make Flappy Bird");
  createElement("h4", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp a. <s>Background</s>");
  createElement("h4", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp b. Bird");
  createElement("h4", "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp c. Pipes");
  createElement("h3", "2. Make AI try it");

 }
