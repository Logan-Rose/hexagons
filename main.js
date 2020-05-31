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

let size = 10
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


function fillHexes(){
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


canvas.addEventListener('mousemove',
    function(event){
        let xPos
        let yPos
        let mouseX = event.clientX
        let mouseY = event.clientY

        context.beginPath();
        context.arc(mouseX, mouseY, 5,0,Math.PI*2, false);
        context.strokeStyle = 'red';
        context.stroke();
        context.fill();
        

        
        yPos = mouseY - mouseY%(size*1.5)
        

        if(mouseX%(size*1.7) > size*0.85){
            xPos = mouseX - mouseX%(size*1.7) + size*1.7
        }else{
            xPos = mouseX - mouseX%(size*1.7)
        }

        if(mouseY%(size*1.5) > size*0.75){
            yPos = mouseY - mouseY%(size*1.5) + size*1.5
        }else{
            yPos = mouseY - mouseY%(size*1.5)
        }
        

        // console.log(xPos + "," + yPos)
        if((yPos / (size*1.5)) % 2 == 1){
        //   console.log("----" + xPos + "," + yPos)
            xPos = xPos - 0.85*size
        }
        

        console.log("-----------")
        console.log(mouseX + "," + mouseX%(size*1.7) + "," + xPos)
        console.log(mouseY + "," + mouseY%(size*1.5) + "," + yPos)
        console.log("-----------")

        drawHex(xPos, yPos, size, true)
        context.beginPath();
        context.arc(xPos, yPos, 5,0,Math.PI*2, false);
        context.strokeStyle = 'red';
        context.stroke();
        context.fill();

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