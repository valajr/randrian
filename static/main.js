class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width*this.height;
    }
}

const CANVAS_OBJ = {
    'border': 5,
    'min_width': 10,
    'min_height': 10
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

function fillEmptyArea(area) {
    // fill area with rectangles while exists free area
}

function drawMondrian() {
    if (canvas_html.getContext) {
        let canvas_width = canvas.canvas.width;
        let canvas_height = canvas.canvas.height;

        let x = getRandomInt(0, canvas_width - CANVAS_OBJ.min_width);
        let y = getRandomInt(0, canvas_height - CANVAS_OBJ.min_height);
        let width;
        let height;
        let remaining = canvas_width - x;
        if(remaining > 0)
            width = getRandomInt(CANVAS_OBJ.min_width, remaining);
        else
            width = remaining;
        remaining = canvas_height - y;
        if(remaining > 0)
            height = getRandomInt(CANVAS_OBJ.min_height, canvas_height - y);
        else
            height = remaining;

        canvas.fillStyle = COLORS.yellow;
        canvas.fillRect(x, y, width, height);
        canvas.lineWidth = CANVAS_OBJ.border;
        canvas.strokeRect(x, y, width, height);
        let rect = new Rectangle(x, y, width, height);

        drawLineX(x, canvas_height);
        drawLineX(x + width, canvas_height);

        let upper_area = new Rectangle(x, 0, width, y - CANVAS_OBJ.border);
        let lower_area = new Rectangle(x, y + height + CANVAS_OBJ.border, 
                                       width, canvas_height - (y + height + CANVAS_OBJ.border));
        let left_area = new Rectangle(0, 0, x - CANVAS_OBJ.border, canvas_height);
        let right_area = new Rectangle(x + width + CANVAS_OBJ.border, 0, 
                                       canvas_width - (x + width + CANVAS_OBJ.border), canvas_height);

        fillEmptyArea(upper_area);
        fillEmptyArea(lower_area);
        fillEmptyArea(left_area);
        fillEmptyArea(right_area);
    } 
    else {
        canvas_html.innerHTML = '<span>Your browser doesn\'t support canvas!</span>'
    }
}

drawMondrian();