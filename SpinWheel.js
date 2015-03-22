function Wheel(){
cx:0;
cy:0;
radius:0;
angle:0;
};

function Sector(){
number:0;
angle:0;
color:0;
text:0;
}


Sector.prototype.setColor=function(colors){
this.color=colors[this.number%3];
}

Wheel.prototype.draw=function(ctx){
    var colors=['#FF0000','#00FF00','#0000FF'];
    for(i=0;i<this.sectors.length;i++){
    ctx.beginPath();
    ctx.save();
		oldAngle=this.sectors[i].angle*Math.PI/180+this.angle;
		if(i==this.sectors.length-1){
		newAngle=0+this.angle;
		}
		else{
		newAngle=this.sectors[i+1].angle*Math.PI/180+this.angle;
		}
		
		ctx.moveTo(this.cx,this.cy);
		ctx.lineTo(this.cx+this.radius*Math.cos(oldAngle), this.cy+this.radius*Math.sin(oldAngle));
		ctx.arc(this.cx,this.cy,this.radius,oldAngle,newAngle);
		//ctx.lineTo(this.cx+this.radius*Math.cos(newAngle), this.cy+this.radius*Math.sin(newAngle));
		ctx.moveTo(this.cx,this.cy);
    ctx.fillStyle=colors[i%3];
    //console.log(i+"="+ctx.fillStyle+"/"+oldAngle);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    }
};

main();
function main(){
var body=document.getElementById("body");
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
 
var W = canvas.width = window.innerWidth;
var H = canvas.height = window.innerHeight;

var wheel=new Wheel;
wheel.cx=100;
wheel.cy=100;
wheel.radius=100;
wheel.sectors=[];
var numbers=5
for(i=0;i<numbers;i++){
		var sec=new Sector();
		sec.number=i;
		sec.angle=i*(360/numbers);
		sec.text=i;
		wheel.sectors.push(sec);
		}
function anim(time){
//if (time === undefined)
    //time = Date.now();
  if (startTime === undefined)
    startTime = time;
//console.log("time="+time);
inter=Math.floor((time-startTime));
wheel.angle=(inter>>2)%360;
console.log('wheel.angle='+wheel.angle);
ctx.clearRect(0,0,canvas.width,canvas.height);
wheel.draw(ctx);
window.requestAnimationFrame(anim);
};
startTime=undefined;
window.requestAnimationFrame(anim);
};


