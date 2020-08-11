class Bird {

	constructor() {

		this.pos = createVector(canvas.width/2.0, canvas.height/2.0);
		this.vel = createVector(0, 0);
		this.dead = false;
		this.size = birdSize;

	}

	move() {

		this.pos.y += this.vel.y;
		
	}

	update() {

		this.move();

	}

}
