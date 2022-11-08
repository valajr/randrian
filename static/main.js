/**
 * Rectangle base.
 * 
 */
class Rectangle {
    /**
     * Constructor of a rectangle.
     * 
     * @param {number} x - position on x axis
     * @param {number} y - position on y axis
     * @param {number} width - width of the rectangle
     * @param {number} height - height of the rectangle
     */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * Prefixeds sizes of a rectangle on canvas:
 * 
 * border - Border of a rectangle
 * min_width - Minimum width of a rectangle
 * min_height - Minimum height of a rectangle
 * max_width - Maximum width of a rectangle
 * max_height - Maximum height of a rectangle
 * 
 */
const CANVAS_OBJ = {
    'border': 5,
    'min_width': 100,
    'min_height': 100,
    'max_width': 300,
    'max_height': 300
}

/**
 * Array of colors to be used on the canvas.
 * 
 */
const COLORS = ['#000000', '#0000ff', '#ff0000', '#ffff00'];
const GRID_SIZE = 50;

let canvas_html = document.getElementById('mondrian');
let canvas = canvas_html.getContext('2d');

/**
 * Function to draw a line.
 * 
 * @param {number} x - position on x axis
 * @param {number} y - position on y axis
 * @param {number} length_x - length of the line on x axis
 * @param {number} length_y - length of the line on y axis
 */
function drawLine(x, y, length_x, length_y) {
    canvas.beginPath();
    canvas.lineWidth = CANVAS_OBJ.border;
    canvas.moveTo(x, y);
    canvas.lineTo(x + length_x, y + length_y);
    canvas.stroke();
    canvas.closePath();
}

/**
 * Function to draw a rectangle on canvas.
 * 
 * @param {Rectangle} rect - rectangle to be drawed on canvas
 * @param {COLORS} debug - color for debug some issues, drawing the element to be more identifiable
 */
function drawRect(rect, debug=null) {
    canvas.fillStyle = debug==null? COLORS[getRandomInt(0, COLORS.length)]: debug;
    canvas.fillRect(rect.x, rect.y, rect.width, rect.height);
    canvas.lineWidth = CANVAS_OBJ.border;
    canvas.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

/**
 * Function to adjust values on a grid.
 * 
 * @param {number} value - position on the canvas (x or y axes) to be gridded
 * @param {number} grid - size of the grid
 * @returns valid value on the grid
 */
function roundToGrid(value, grid=GRID_SIZE) {
    let remainder = value%grid;
    return remainder < (grid/2)? value - remainder: value - remainder + grid;
}

/**
 * Function to draw a random rectangle on a random position of the block
 * and lines on the x and y axes.
 * 
 * @param {Rectangle} block - block to be drawn one rectangle
 * @returns drawn rectangle
 */
function drawRandomRect(block) {
    let width = getRandomInt(CANVAS_OBJ.min_width, block.width<CANVAS_OBJ.max_width?block.width:CANVAS_OBJ.max_width);
    width = roundToGrid(width);
    let height = getRandomInt(CANVAS_OBJ.min_height, block.height<CANVAS_OBJ.max_height?block.height:CANVAS_OBJ.max_height);
    height = roundToGrid(height);
    let x = getRandomInt(block.x + CANVAS_OBJ.border, block.x + block.width - width);
    x = roundToGrid(x);
    let y = getRandomInt(block.y + CANVAS_OBJ.border, block.y + block.height - height);
    y = roundToGrid(y);
    
    let rect = new Rectangle(x, y, width, height);
    drawRect(rect);
    drawLine(rect.x, block.y, 0, block.height);
    drawLine(rect.x + rect.width, block.y, 0, block.height);
    drawLine(block.x, rect.y, block.width, 0);
    drawLine(block.x, rect.y + rect.height, block.width, 0);

    return rect;
}

/**
 * Function to fill one block with rectangle and lines.
 * 
 * @param {Rectangle} block - block to be filled with rectangles and lines
 */
function fillEmptyBlock(block) {
    if(block.width > CANVAS_OBJ.min_width && block.height > CANVAS_OBJ.min_height) {
        let rect = drawRandomRect(block);
        divideBlock(block, rect);
    }
}

/**
 * Function to divide one block in four parts based on one rect.
 * 
 * @param {Rectangle} block - block to be divided
 * @param {Rectangle} rect - rectangle that divides the block
 */
function divideBlock(block, rect) {
    let upper_block = new Rectangle(block.x, block.y, block.width, rect.y - block.y);
    let lower_block = new Rectangle(block.x, rect.y + rect.height, block.width,
                                    block.height - (block.y + rect.y + rect.height));
    let left_block = new Rectangle(block.x, rect.y, rect.x - block.x, rect.height);
    let right_block = new Rectangle(rect.x + rect.width, rect.y,
                                    block.width - (block.x + rect.x + rect.width), rect.height);

    fillEmptyBlock(upper_block);
    fillEmptyBlock(lower_block);
    fillEmptyBlock(left_block);
    fillEmptyBlock(right_block);
}

/**
 * Function to draw one art work inspired on the paintings of Piet Mondrian.
 * 
 */
function drawMondrian() {
    if (canvas_html.getContext) {
        let canvas_width = canvas.canvas.width;
        let canvas_height = canvas.canvas.height;
        let block = new Rectangle(0, 0, canvas_width, canvas_height);
        let rect = drawRandomRect(block);

        divideBlock(block, rect);
    } 
    else {
        canvas_html.innerHTML = '<span>Your browser doesn\'t support canvas!</span>'
    }
}

drawMondrian();