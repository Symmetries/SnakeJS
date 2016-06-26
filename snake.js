function new_game() {
	myGame.snake = {x: 5, y:1, vx: 1, vy: 0, body: [[4, 1], [3, 1], [2, 1], [1, 1]], len: 4, growing: false};
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
		if ((myGame.snake.len + 1) % 5 === 0) myGame.snake.growing = false;
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
	myGame.ctx.fillStyle = "#808080";
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
	color = "red";
	if (myGame.snake.len + 6 > myGame.goal) color = "yellow"
	set_pixel(myGame.fruit[0], myGame.fruit[1], color);
}

function draw_text() {
	myGame.ctx.fillStyle = "black";
	myGame.ctx.font = String(myGame.side) + "px Arial";
	myGame.ctx.fillText("Length: " + String(myGame.snake.len + 1), myGame.borderx, myGame.side);
}

document.addEventListener("keydown", keyDownHandler, false);

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

var myGame = {
	canvas: document.getElementById('myCanvas'),
	ctx: document.getElementById('myCanvas').getContext('2d'),
	rightPressed: false,
	leftPressed: false,
	upPressed: false,
	downPressed: false,
	snake: {x: 1, y:1, vx: 1, vy: 0, body: [], len: 4},
	fruit: [],
	side: 21,
	borderx: 0,
	bordery: 0,
	grid_width: 1,
	n: 0,
	m: 0,
	count: 0,
	goal: 100
}

myGame.ctx.canvas.width  = window.innerWidth;
myGame.ctx.canvas.height = window.innerHeight;

set_screen();
new_game();

function draw_frame() {
	if (myGame.snake.len < myGame.goal) {
	update();
	set_screen();
	draw_background();
	draw_pixels();
 	draw_snake();
 	draw_fruit();
	draw_text();
	}
	else {
	set_screen();
	draw_background();
	draw_pixels();
	lA = [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1];
	lE = [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1];
	lG = [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0];
	lH = [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1];
	lI = [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1];
	lL = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1];
	lM = [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1];
	lO = [0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0];
	lP = [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0];
	lR = [1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1];
	lT = [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0];
	lU = [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0];
	lW = [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];
	lY = [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0];
	coma = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0];
	question = [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0];
	space = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	message = [lM, lA, lR, lA, coma, space, space, space, space, space, lW, lI, lL, lL, space, lY, lO, lU, space, space, lG, lO, space, lT, lO, space, lP, lR, lO, lM, lW, lI, lT, lH, space, lM, lE, question];
	for (var i = 0; i < myGame.count; i++) {
		for (var j = 0; j < message[i].length; j++) {
			if (message[i][j] === 1) {
				color = "black"
				if (i < 4 || i === 35 || i === 36) color = "red";
				set_pixel(1 + j % 5 + 6 * (i % 10), 1 + Math.floor(j/5) + 6 * Math.floor(i/10), color);
			}
		}
	}
	if (myGame.count < message.length) myGame.count += 1;
	}
}

setInterval(draw_frame, 60);

