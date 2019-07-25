//init canvas
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//background
canvas.style.background="black";

// init size
let width = window.innerWidth;
let height = window.innerHeight;

// set size
resize(width,height);

// resize event
window.addEventListener('resize',function(){
    // get new size;
    width = window.innerWidth;
    height = window.innerHeight;
    resize(width,height);
    init();
})


// init colors
const colors = ['white','rgba(200,20,20)', 'rgba(255,100,100)','rgba(255,200,200)', 'rgba(255,50,50)'];

// init circles
let circles = [];

//mouse init
let mouse = {
    x:null,
    y:null
}
// mouse event
window.addEventListener('mousemove',function(event){
    // get mouse position
    mouse.x = event.x
    mouse.y = event.y
})

//start !!
init();
animate();

//////////////////////////////////////////////////////////////////////////
// FUNCTIONS  ///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

// reset and push new circles

function init(){
    circles = []
    for(var i = 0; i < 500;i++){
        const radius = Math.floor(Math.random() * 15) + 2 ;
        const x = Math.random() * (window.innerWidth - radius*2) + radius ;
        const y = Math.random() * (window.innerHeight - radius*2) + radius;
        const vitesse =  Math.round(Math.random() * 2)+1
        const vitesse2 =  Math.round(Math.random() * 2)+1
        circles.push(new Circle(x,y,radius,vitesse,vitesse2))  
    }
}

function animate(){
    //start animation (60 callbacks per seconds)
    requestAnimationFrame(animate);
    // important, clear for each frame
    c.clearRect(0,0,width,height);
    circles.forEach(function(circle){
        circle.draw();
        circle.update();
    })

}

// set size
function resize(width,height) {
    canvas.setAttribute('width',width);
    canvas.setAttribute('height',height);
}

// Circle
function Circle(x,y,radius,vx,vy){
    this.x = x; //width position
    this.y = y; //height position
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 70;
    this.vx = vx; //speed width
    this.vy = vy; //speed height

    // random color (cf: line 26)
    this.color = colors[Math.round(Math.random()*(colors.length-1))];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    this.update = function(){
        // if circle out on my screen (width)
        if(this.x> (window.innerWidth-this.radius) || this.x < this.radius ){
            this.vx = -this.vx;
        }
        // if circle out on my screen (height)
        if(this.y> (window.innerHeight-this.radius) || this.y < this.radius ){
            this.vy = -this.vy;
        }

        // get hitbox between circle and mouse
        if(mouse.x - this.x < 120 && mouse.x - this.x > -120 && mouse.y - this.y < 120 && mouse.y - this.y > -120 ) {
            if(this.radius< this.maxRadius){
                this.radius += 2;
            }
        } else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.x += this.vx;
        this.y += this.vy;
    }
}

