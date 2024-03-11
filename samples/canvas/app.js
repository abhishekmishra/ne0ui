import { NuTop, NuSingleLineText, NuCanvas, NuSizeHint } from "../../index.mjs";

// create the toplevel window
let top = new NuTop();

class MyCanvas extends NuCanvas {
    constructor(cfg) {
        super(cfg);
    }
}

// create the canvas
let canvasComp = new MyCanvas({
    w: new NuSizeHint(100, 100, 200),
    h: new NuSizeHint(100, 100, 200),
});

const canvas = canvasComp.getElem();
const ctx = canvas.getContext("2d");

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Start a new Path
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(300, 150);

// Draw the Path
ctx.stroke();

// add to the toplevel window
top.add(canvasComp);
