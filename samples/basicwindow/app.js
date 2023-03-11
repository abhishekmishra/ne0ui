import { NuTop, NuSingleLineText } from "../../index.mjs";
import { getSizeHint, NuSizeHint } from "../../index.mjs";
import { NuBorder } from "../../index.mjs";
import { NuButton, NuRowPanel, NuWindow } from "../../index.mjs";

// create the toplevel window
var top = new NuTop();

const showRow = new NuRowPanel({
    w: new NuSizeHint(100, 100, Infinity),
    h: 30,
});

var showBtn = new NuButton({
    w: 100,
    h: 30,
    text: 'Show',
});

var win0 = new NuWindow({
    w: 500,
    h: 301,
    bg: 'slategray'
});

top.appendRect(win0);
top.appendRect(showRow);
showRow.addComp(showBtn);

// center justify the text in the text control

// center the text element in parent
// and keep centered when parent is resized
win0.centerParent();
win0.getParent().onRectEvent('nu_resize', (evt) => {
    win0.centerParent();
});

showRow.centerParent();
showRow.getParent().onRectEvent('nu_resize', (evt) => {
    showRow.centerParent();
});
showRow.hide();

for (var i = 0; i < 9; i++) {
    // create and add a single line text control to the toplevel
    var text = new NuSingleLineText({
        w: new NuSizeHint(50, 50, Infinity),
        h: 30,
        border: new NuBorder(), //empty border
        text: 'Single line text #' + i,
        justify: 'center'
    });

    win0.addComp(text);
}

const lastRow = new NuRowPanel({
    w: new NuSizeHint(50, 50, Infinity),
    h: 30,
});
win0.addComp(lastRow);

const hideBtn = new NuButton({
    w: 100,
    h: 30,
    text: 'Hide',
});

lastRow.addComp(hideBtn, 'end');

hideBtn.on('click', () => {
    win0.hide();
    showRow.show();
});

showBtn.on('click', () => {
    win0.show();
    showRow.hide();
})