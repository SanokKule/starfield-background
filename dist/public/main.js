{
const cfg = HFS.getPluginConfig();
const canvas = document.getElementById('starfield');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.fillStyle = 'rgba(0, 0, 0, 0.5)';
c.strokeStyle = 'rgb(255, 255, 255)';
c.translate(canvas.width / 2, canvas.height / 2);
let speed = cfg.star_speed ? cfg.star_speed : 0.025;
let fps = cfg.max_framerate ? cfg.max_framerate : 60;
let lastDraw = Date.now();

document.body.setAttribute('onresize', 'starfieldResize()');

function starfieldResize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	c.fillStyle = 'rgba(0, 0, 0, 0.5)';
	c.strokeStyle = 'rgb(255, 255, 255)';
	c.translate(canvas.width / 2, canvas.height / 2);
	draw();
}

function draw() {
	var frametime = 1000 / fps;
	var now = Date.now();
	var diff = now - lastDraw;
	if (diff >= frametime) {
		//create rectangle
		c.fillRect(-canvas.width/2, -canvas.height / 2, canvas.width, canvas.height);
		for (let s of stars) {
			s.update();
			s.show();
		}
		lastDraw = now - (diff % frametime);
	}
	requestAnimationFrame(draw);
}

class Star {
	constructor() {
		this.x = Math.random() * canvas.width-canvas.width / 2;
		this.y = Math.random() * canvas.height-canvas.height / 2;
		this.px;
		this.py;
		this.z = Math.random() * 4;
	};
	update() {
		//stores previous x, y and z and generates new coordinates
		this.px = this.x;
		this.py = this.y;
		this.z += speed;
		this.x += this.x * (speed * 0.5) * this.z;
		this.y += this.y * (speed * 0.5) * this.z;
		if (this.x > canvas.width / 2 + 50 ||
			this.x < -canvas.width / 2 - 50 ||
			this.y > canvas.height / 2 + 50 ||
			this.y < -canvas.height / 2 - 50) {
				this.x = Math.random() * canvas.width - canvas.width / 2;
				this.y = Math.random() * canvas.height - canvas.height / 2;
				this.px = this.x;
				this.py = this.y;
				this.z = 0;
			};
	};
	show() {
		//draws line from x,y to px,py
		c.lineWidth = this.z * 0.6;
		c.beginPath();
		c.moveTo(this.x, this.y);
		c.lineTo(this.px, this.py);
		c.stroke();
	};
}

let stars = [];
let starsAmount = Math.random() * (cfg.max_stars ? cfg.max_stars : 500);
for (let i = 0; i < starsAmount; i++) stars.push(new Star());

draw();
}