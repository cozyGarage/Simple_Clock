var canvas = document.getElementById("canvas");
mobile=false;
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  canvas.style.height="600px";
  canvas.style.width="600px";
  mobile=true;
}
clicked=false;

var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
r=radius
radius = radius * 0.85
ctx.shadowBlur = 10;

drawFace(ctx, radius);
ctx.shadowBlur = 0;
setInterval(drawClock, 1000);

function drawBox(ctx,radius){
  ctx.fillRect(-10,-r*0.98,20,r*0.1);
}
function drawClock() {
  drawFace(ctx, radius);
  drawBox(ctx,radius)
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
  
  ctx.strokeStyle = '#00f2ff';
  ctx.lineWidth = 5;
  
  ctx.shadowColor = "#00f2ff";
  ctx.stroke();
  ctx.beginPath();
  
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#00f2ff';
  ctx.fill();
  
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.fillStyle="white";
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius*0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius*0.85);
      ctx.rotate(-ang);
    
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));

    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.strokeStyle='#00f2ff';
    ctx.shadowColor='#00f2ff';
    ctx.shadowBlur=10;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
    ctx.shadowBlur=0;
}
function clickcanvas(){
  if (clicked==true){
    clicked=false;
  } else {
    clicked=true;
  }
}

function getMousePosition(canvas, event) {
            canvas.className="";
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            console.log("Coordinate x: " + x, 
                        "Coordinate y: " + y);
            if (mobile==false){
              if (140<x && x<162 && 3<y && y<20 ){
              canvas.className+="shakeclass";
            }
            if (20<x && x<285 && 20<y && y<285 ){
              if (clicked==true){
                clicked=false;
              } else {
                clicked=true;
              }
            }
            } else {
              if (x>50 && x<553 && y>50 && 553){
                if (clicked==true){
                clicked=false;
              } else {
                clicked=true;
              }
              }
              if ( x>270 && x<330 && y<40 && y>3){
                canvas.className+="shakeclass";
                
              }
            }
            
        }
canvas.addEventListener("mousedown", function(e)
        {
            getMousePosition(canvas, e);
        });
