class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width*this.height;
    }
}

const CANVAS_OBJ = {
    'border': 5,
    'min_width': 20,
    'min_height': 20
}

const COLORS = {
    'black': '#000000',
    'blue': '#0000ff',
    'red': '#ff0000',
    'white': '#ffffff',
    'yellow': '#ffff00'
};

let canvas_html = document.getElementById('mondrian');
let canvas = canvas_html.getContext('2d');

function getRandomColor() {
    let color = getRandomInt(0, 4);
    switch(color) {
        case 0:
            color = COLORS.black;
            break;
        case 1:
            color = COLORS.blue;
            break;
        case 2:
            color = COLORS.red;
            break;
        case 3:
            color = COLORS.white;
            break;
        case 4:
            color = COLORS.yellow;
    }

    return color;
}

function drawLineX(x, height) {
    canvas.beginPath();
    canvas.lineWidth = CANVAS_OBJ.border;
    canvas.moveTo(x, 0);
    canvas.lineTo(x, height);
    canvas.stroke();
    canvas.closePath();
}

function drawLineY(y, width) {
    canvas.beginPath();
    canvas.lineWidth = CANVAS_OBJ.border;
    canvas.moveTo(0, y);
    canvas.lineTo(width, y);
    canvas.stroke();
    canvas.closePath();
}

function drawRect(rect) {
    canvas.fillStyle = getRandomColor();
    canvas.fillRect(rect.x, rect.y, rect.width, rect.height);
    canvas.lineWidth = CANVAS_OBJ.border;
    canvas.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

function drawRandomRect(block) {
    let x = getRandomInt(block.x, block.x + block.width - CANVAS_OBJ.min_width);
    let y = getRandomInt(block.y, block.y + block.height - CANVAS_OBJ.min_height);
    let width;
    let height;
    let remaining = block.width - x;
    if(remaining > 0)
        width = getRandomInt(CANVAS_OBJ.min_width, remaining);
    else
        width = block.width;
    remaining = block.height - y;
    if(remaining > 0)
        height = getRandomInt(CANVAS_OBJ.min_height, block.height - y);
    else
        height = block.height;
    
    let rect = new Rectangle(x, y, width, height);
    drawRect(rect);

    return rect;
}

function fillEmptyBlock(block) {
    if(block.area > CANVAS_OBJ.min_height*CANVAS_OBJ.min_width) {
        let rect = drawRandomRect(block);
        divideBlock(block, rect);
    }
    else
        drawRect(block);
}

function divideBlock(block, rect) {
    let upper_block = new Rectangle(rect.x, block.y, rect.width, rect.y - CANVAS_OBJ.border - block.y);
    let lower_block = new Rectangle(rect.x, rect.y + rect.height + CANVAS_OBJ.border, rect.width,
                                    block.height - (rect.y + rect.height + CANVAS_OBJ.border));
    let left_block = new Rectangle(block.x, block.y, rect.x - CANVAS_OBJ.border - block.x, block.height);
    let right_block = new Rectangle(rect.x + rect.width + CANVAS_OBJ.border, block.y,
                                    block.width - (rect.x + rect.width + CANVAS_OBJ.border - block.x), block.height);

    console.log(upper_block, lower_block, left_block, right_block);
    fillEmptyBlock(upper_block);
    fillEmptyBlock(lower_block);
    fillEmptyBlock(left_block);
    fillEmptyBlock(right_block);
}

function drawMondrian() {
    if (canvas_html.getContext) {
        let canvas_width = canvas.canvas.width;
        let canvas_height = canvas.canvas.height;
        let block = new Rectangle(0, 0, canvas_width, canvas_height);
        let rect = drawRandomRect(block);

        drawLineX(rect.x, canvas_height);
        drawLineX(rect.x + rect.width, canvas_height);
        divideBlock(block, rect);
    } 
    else {
        canvas_html.innerHTML = '<span>Your browser doesn\'t support canvas!</span>'
    }
}

drawMondrian();