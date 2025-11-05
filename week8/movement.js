let balls = [];
let ballCount;
let darkMode = false;
let modeTransition = 0;

function setup() {
    const canvas = createCanvas(800, 500);
    canvas.parent('bounceball');
    ballCount = int(random(8, 30));
    for (let i = 0; i < ballCount; i++) {
        balls.push(new Ball());
    }
}

setInterval(() => {
    darkMode = !darkMode;
  }, 10000);

function draw() {
    let targetTransition = darkMode ? 1 : 0;
    modeTransition = lerp(modeTransition, targetTransition, 0.05);
    
    let bgDark= color(31, 58, 102);
    let bgLight = color(255, 245, 210);
    background(lerpColor(color(255, 245, 210), color(31, 58, 102), modeTransition));

    for (let ball of balls) {
    ball.update();
    ball.draw(modeTransition);
  }
}


class Ball {
  constructor() {
    this.r = random(20, 40);
    this.x = random(this.r, width - this.r);
    this.y = random(this.r, height - this.r);
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.colorLight = color(random(200, 250), random(80, 180), random(60, 200));
    this.colorDark = color(random(150, 200), random(150, 200), random(180, 255));
    this.color = this.colorLight;
    this.form = 'circle';
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < this.r || this.x > width - this.r) {
      this.vx *= -1;
      this.transform();
    }
    if (this.y < this.r || this.y > height - this.r) {
      this.vy *= -1;
      this.transform();
    }
  }

  transform() {
    if (this.form === 'circle') {
    this.form = 'square';
  } else {
    this.form = 'circle';
  }
    this.targetColor = color(random(200, 250), random(80, 180), random(60, 200));
    this.colorLight = lerpColor(this.colorLight, this.targetColor, 0.1);
    this.colorDark = color(random(150, 200), random(150, 200), random(180, 255));
}
  
  draw() {
    fill(this.color);
    noStroke();
    if (this.form === 'circle') {
      ellipse(this.x, this.y, this.r * 2);
    } else {
      rectMode(CENTER);
      rect(this.x, this.y, this.r * 2, this.r * 2,20);
    }
  }  

  draw(transition) {
    this.color = lerpColor(this.colorLight, this.colorDark, transition);
    fill(this.color);
    noStroke();
    if (this.form === 'circle') {
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
    } else {
      rectMode(CENTER);
      rect(this.x, this.y, this.r * 2, this.r * 2, 20);
    }
  }
}