function new_game() {
	myGame.snake = {x: 3, y:1, vx: 1, vy: 0, body: [[2, 1], [1, 1]], len: 2, growing: false};
	new_fruit();
}

function set_screen() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	myGame.ctx.canvas.width  = width;
	myGame.ctx.canvas.height = height;
	myGame.ctx.clearRect(0, 0, width, height);
	myGame.borderx = (width/2) % myGame.side + myGame.side
	myGame.bordery = (height/2) % myGame.side + myGame.side
	myGame.n = (width - 2 * myGame.borderx) / myGame.side;
	myGame.m = (height - 2 * myGame.bordery) / myGame.side;
}

function set_pixel(x, y, color) {
	myGame.ctx.beginPath();
	myGame.ctx.rect(myGame.borderx + myGame.side * x + myGame.grid_width, myGame.bordery + myGame.side * y + myGame.grid_width ,myGame.side - 2 * myGame.grid_width, myGame.side - 2 * myGame.grid_width);
	myGame.ctx.fillStyle = color;
	myGame.ctx.fill();
	myGame.ctx.closePath();
}

function new_fruit() {
	var x;
	var y;
	var ok;
	ok = false;
	while (!ok) {
		ok = true;
		x = Math.floor(Math.random() * myGame.n);
		y = Math.floor(Math.random() * myGame.m);
		if (x === myGame.snake.x && y === myGame.snake.y) ok = false;
		for (var i = 0; i < myGame.snake.len; i++ ) {
			if (x === myGame.snake.body[i][0] && y === myGame.snake.body[i][1]) ok = false;
		}
	}
	myGame.fruit = [x, y];
}

function update() {
	if (myGame.rightPressed && myGame.snake.vx === 0 && !(myGame.upPressed || myGame.downPressed)) {
		myGame.snake.vx = 1;
		myGame.snake.vy = 0;
	} else if (myGame.leftPressed && myGame.snake.vx === 0 && !(myGame.upPressed || myGame.downPressed)) {
		myGame.snake.vx = -1;
		myGame.snake.vy = 0;
	} else if (myGame.upPressed && myGame.snake.vy === 0 && !(myGame.rightPressed || myGame.leftPressed)){
		myGame.snake.vx = 0;
		myGame.snake.vy = -1;
	} else if (myGame.downPressed && myGame.snake.vy === 0 && !(myGame.rightPressed || myGame.leftPressed)) {
		myGame.snake.vx = 0;
		myGame.snake.vy = 1;
	}
	if (myGame.snake.x === myGame.fruit[0] && myGame.snake.y === myGame.fruit[1]) {
		new_fruit();
		myGame.snake.growing = true;
	}
	if (myGame.snake.growing) {
		myGame.snake.len += 1;
		if ((myGame.snake.len + 1) % 3 === 0) myGame.snake.growing = false;
	}
	for (var i = myGame.snake.len-1; i > 0;  i-- ) {
		myGame.snake.body[i] = myGame.snake.body[i - 1];
	}
	myGame.snake.body[0] = [myGame.snake.x, myGame.snake.y]
	myGame.snake.x += myGame.snake.vx;
	myGame.snake.y += myGame.snake.vy;
	
	for (var i = 0; i < myGame.snake.len; i++) {
		if (myGame.snake.x === myGame.snake.body[i][0] && myGame.snake.y === myGame.snake.body[i][1]) new_game()
	}
	if (myGame.snake.x < 0 || myGame.snake.x > myGame.n - 1 || myGame.snake.y < 0 || myGame.snake.y > myGame.m - 1) new_game()
	
	myGame.downPressed = false;
	myGame.rightPressed = false;
	myGame.upPressed = false;
	myGame.leftPressed = false;
}

function draw_background() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	myGame.ctx.beginPath();
	myGame.ctx.rect(0, 0, width, height);
	myGame.ctx.fillStyle = "#00FF00";
	myGame.ctx.fill();
	myGame.ctx.closePath();

	myGame.ctx.beginPath();
	myGame.ctx.rect(myGame.borderx, myGame.bordery, width - 2 * myGame.borderx, height - 2 * myGame.bordery);
	myGame.ctx.fillStyle = "green";
	myGame.ctx.fill();
	myGame.ctx.closePath();
}

function draw_pixels() {
	for (var i = 0; i < myGame.n; i++ ) {
		for (var j = 0; j < myGame.m; j++) {
			set_pixel(i, j, "#DDDDDD");
		}
	}
}

function draw_snake() {
	//head
	set_pixel(myGame.snake.x, myGame.snake.y, "black");
	//body
	for (var i = 0; i < myGame.snake.len; i++) {
		set_pixel(myGame.snake.body[i][0], myGame.snake.body[i][1], "black");
	}
}

function draw_fruit() {
	set_pixel(myGame.fruit[0], myGame.fruit[1], "red");
}

document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 40) {
		myGame.downPressed = true;
	}
  if(e.keyCode == 39) {
      myGame.rightPressed = true;
  }
	else if (e.keyCode == 38) {
		myGame.upPressed = true;
	}
  else if(e.keyCode == 37) {
      myGame.leftPressed = true;
  }
}
function keyUpHandler(e) {
	if (e.keyCode == 40) {
		myGame.downPressed = false;
	}
  if(e.keyCode == 39) {
      myGame.rightPressed = false;
  }
	else if (e.keyCode == 38) {
		myGame.upPressed = false;
	}
  else if(e.keyCode == 37) {
      myGame.leftPressed = false;
  }
}

var myGame = {
	canvas: document.getElementById('myCanvas'),
	ctx: document.getElementById('myCanvas').getContext('2d'),
	rightPressed: false,
	leftPressed: false,
	upPressed: false,
	downPressed: false,
	snake: {x: 1, y:1, vx: 1, vy: 0, body: [], len: 3},
	fruit: [],
	side: 40,
	borderx: 0,
	bordery: 0,
	grid_width: 2,
	n: 0,
	m: 0
}

myGame.ctx.canvas.width  = window.innerWidth;
myGame.ctx.canvas.height = window.innerHeight;

set_screen();
new_game();

function draw_frame() {
	update();
	set_screen();
	draw_background();
	draw_pixels();
 	draw_snake();
 	draw_fruit();
}

setInterval(draw_frame, 80);

