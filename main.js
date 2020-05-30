let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let styles = getComputedStyle(canvas),
w = parseInt(styles.getPropertyValue("width"), 10),
h = parseInt(styles.getPropertyValue("height"), 10);
let WIDTH = w;
let HEIGHT = h;
canvas.width = WIDTH;
canvas.height = HEIGHT;

let cellSize = WIDTH / 40


class Point{
    constructor(x, y){
        this.x = x
        this.y = y
    }
}

function pointy_hex_corner(center, size, i){
    var angle_deg = 60 * i - 30
    var angle_rad = Math.PI / 180 * angle_deg
    return new Point(center.x + size * Math.cos(angle_rad),
                center.y + size * Math.sin(angle_rad))
}



function drawHex(centerX, centerY, size){
    context.beginPath();
    let start = pointy_hex_corner(new Point(centerX,centerY), size, 0)
    context.moveTo(start.x, start.y)
    console.log(start.y)
    for(let i =1; i < 6; i ++){
        let next = pointy_hex_corner(new Point(centerX,centerY), size, i)
        context.lineTo(next.x, next.y)
        console.log(next.y)
    }
    
    context.lineTo(start.x, start.y)
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.stroke();
}

let size = 30
for(let i =0; i < WIDTH; i = i + (size*1.7)){
    for(let j =0; j < HEIGHT; j = j + (size*1.5)){
        let previ = i
        if(j %2 ==0){
            drawHex(i,j,size)
        } else{
            drawHex(i +(size*0.85),j,size)
        }
        
    }
}


/*
canvas.addEventListener('mousemove',
    function(event){
        var rect = canvas.getBoundingClientRect();
        let mouseX = event.clientX - rect.left;
        let mouseY = event.clientY - rect.top;
            
        if(mouseX < canvas.width && mouseY < canvas.height){
            mouseDown = true;
            let yPos = Math.floor(mouseY / cellSize);
            let xPos = Math.floor(mouseX / cellSize);
            context.beginPath();
            context.fillRect(cellSize * xPos, cellSize * yPos, cellSize, cellSize);
            context.stroke();
        }
    } 
)
*/