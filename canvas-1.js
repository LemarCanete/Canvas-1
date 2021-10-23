const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined
}

let maxRadius = 40;
// let minRadius = 4;
let colorArray = [
  '#2B3240', '#8596A6', '#F2DE77', '#F2BF80', '#F2994B'
]

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse);
})

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  init()
})

function Circle(x, y, velX, velY, radius){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
  
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    c.fillStyle = this.color;
    c.fill();
  };
  
  this.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.velX = -this.velX
    }
    if(this.y + this.radius > innerHeight || this.y + this.radius < 0){
      this.velY = -this.velY;
    }
    this.y += this.velY;
    this.x += this.velX;
    
//interactivity
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y -this.y > -50){
      if(this.radius < maxRadius){
       this.radius++
      }
    } else if(this.radius > this.minRadius){
      this.radius--;
    }
  }
  
}

let circleArray = [];
init = ()=>{
  circleArray = []
  for(let i = 0; i < 800; i++){
    let radius = Math.random()*3+1
    let x = Math.random()*innerWidth;
    let y = Math.random()*innerHeight;
    let velX = (Math.random()-0.5)*3;
    let velY = (Math.random()-0.5)*3;
    circleArray.push(new Circle(x, y, velX, velY, radius))
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  
 for(let j = 0; j < circleArray.length; j++){
   circleArray[j].draw();
   circleArray[j].update();
 }
}
init()
animate();