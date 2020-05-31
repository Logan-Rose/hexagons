let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let styles = getComputedStyle(canvas),
w = parseInt(styles.getPropertyValue("width"), 10),
h = parseInt(styles.getPropertyValue("height"), 10);
let WIDTH = w;
let HEIGHT = h;
canvas.width = WIDTH;
canvas.height = HEIGHT;

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

let size = 30
let xDistance = size*1.7
let yDistance = size*1.5
function drawGrid(){
    for(let i =0; i*xDistance < WIDTH; i++){
        for(let j =0; j*yDistance < HEIGHT;j++){
            if(j %2 ==0){
                drawHex(i*xDistance,j*yDistance,size, false)
            } else{
                drawHex(i*xDistance +(size*0.85),j*yDistance,size, false)
            }
            
        }
    }
}

function drawHex(centerX, centerY, size, fill){
    context.beginPath();
    let start = pointy_hex_corner(new Point(centerX,centerY), size, 0)
    context.moveTo(start.x, start.y)
    for(let i =1; i < 6; i ++){
        let next = pointy_hex_corner(new Point(centerX,centerY), size, i)
        context.lineTo(next.x, next.y)
    }
    
    context.lineTo(start.x, start.y)
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.closePath();
    if(fill){
        context.fill()
    }
    context.stroke();
}


canvas.addEventListener('mousemove',
    function(event){
        let xPos
        let yPos
        if(event.clientX%(size*1.7) < size*0.85){
            xPos = event.clientX - event.clientX%(size*1.7)
        } else{
            xPos = event.clientX - event.clientX%(size*1.7)  + size*1.7
        }
        
        if(event.clientY - event.clientY%(size*1.5)){
            yPos = event.clientY - event.clientY%(size*1.5)
        } else{
            yPos = event.clientY - event.clientY%(size*1.5) + size*1.5
        }
        
        console.log(xPos + "," + yPos)
        if((yPos / (size*1.5)) % 2 == 1){
            console.log("----" + xPos + "," + yPos)
            drawHex(xPos + size*0.85, yPos, size, true)
        } else{
            drawHex(xPos, yPos, size, true)
        }

    }
)




function animate(){
    requestAnimationFrame(animate);

}
drawGrid();

animate();


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