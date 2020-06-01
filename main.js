let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
let styles = getComputedStyle(canvas),
w = parseInt(styles.getPropertyValue("width"), 10),
h = parseInt(styles.getPropertyValue("height"), 10);
let WIDTH = w;
let HEIGHT = h;
canvas.width = WIDTH;
canvas.height = HEIGHT;
let size = 20
let xDistance = size*1.7
let yDistance = size*1.5

let cellHeight = Math.round(HEIGHT/yDistance) + 2
let cellWidth = Math.round(WIDTH/xDistance) + 2

let board = []
for (let i = 0; i < cellWidth; i++) {
    board[i] = new Array(cellHeight);
}
for (let i = 0; i < cellHeight.length; i++) {
    for (let j = 0; j < cellWidth; j++) {
        board[i][j] = false
    }
}

board[10][20] = true


console.log(cellWidth + "," + cellHeight)
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
    context.strokeStyle = "grey";
    context.lineWidth = 2;
    context.closePath();
    if(fill){
        context.fillStyle = "grey"
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


        let xIndex = Math.round(xPos / (size*1.7))
        let yIndex = Math.round(yPos / (size*1.5))

        console.log(xIndex + "," + yIndex)
        board[xIndex][yIndex] = true


    }
)

function drawHexAtIndex(row, col){
    let xPos = row * 1.7*size
    let yPos = col *1.5*size
    if(col % 2 == 1){
        xPos = xPos - 0.85*size
    }
    drawHex(xPos, yPos, size, true)
}



function animate(){
    requestAnimationFrame(animate);
    for(let i =0; i < board.length; i++){
        for(let j=0; j < board[i].length; j++){
            if(board[i][j]){
                drawHexAtIndex(i,j)
            }
        }
    }

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