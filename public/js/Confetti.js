let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const maxConfettiNb = 100;
const colors = ["DodgerBlue", "OliveDrab",	"Gold",	"Pink",	"SlateBlue", "LightBlue", "Gold", "Violet",	"PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"];

let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];

function Particle() {
	this.x = Math.random() * width; // x
	this.y = Math.random() * height - height; // y
	this.r = Math.floor(Math.random() * (33 - 11 + 1) + 11); // radius
	this.d = Math.random() * maxConfettiNb + 11;
	this.color = colors[Math.floor(Math.random() * colors.length)];
	this.tilt = Math.floor(Math.random() * 33) - 11;
	this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
	this.tiltAngle = 0;

	this.draw = () => {
		context.beginPath();
		context.lineWidth = this.r / 2;
		context.strokeStyle = this.color;
		context.moveTo(this.x + this.tilt + this.r / 3, this.y);
		context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
		return context.stroke();
	};
}

function Draw() {
	let remainingFlakes = 0;
	let results = [];

	requestAnimationFrame(Draw);
	context.clearRect(0, 0, width, window.innerHeight);

	for (let i = 0; i < maxConfettiNb; i++) {
		results.push(particles[i].draw());
		particles[i].tiltAngle += particles[i].tiltAngleIncremental;
		particles[i].y += (Math.cos(particles[i].d) + 3 + particles[i].r / 2) / 2;
		particles[i].tilt = Math.sin(particles[i].tiltAngle - i / 3) * 15;

		if (particles[i].y <= height) 
			remainingFlakes++;

		if (particles[i].x > width + 30 || particles[i].x < -30 || particles[i].y > height) {
			particles[i].x = Math.random() * width;
			particles[i].y = -30;
			particles[i].tilt = Math.floor(Math.random() * 10) - 20;
		}
	}

	return results;
}

window.addEventListener("resize", () => {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

for (let i = 0; i < maxConfettiNb; i++)
	particles.push(new Particle());

canvas.width = width;
canvas.height = height;
Draw();

let observer = new MutationObserver(mutation => {
	canvas = document.getElementById("canvas");

	if (canvas) {
		context = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
});

observer.observe(document.getElementById("App"), { childList: true });
