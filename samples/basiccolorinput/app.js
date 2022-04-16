import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuInputPanel, NuLabel, NuColorInput } from "../../uicomp.mjs";

// create the toplevel window
var top = new NuTop();


var colInput = new NuColorInput({
    w: 50,
    h: 25,
    justify: 'center',
    color: '#ff00ff'
});

var label = new NuLabel({
    w: 150,
    h: 25,
    justify: 'right',
    margin: '2px',
    label: 'Sample Color Input: '
});

var inputPanel = new NuInputPanel({
    w: 200,
    h: 25,
    orientation: 'horizontal'
}, colInput, label);

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
    w: 200,
    h: 25,
    margin: '2px',
    text: 'Color is: ' + colInput.elem.value,
    justify: 'center'
});

colInput.on('input', (evt) => {
    text.setText(`Color is: ${evt.target.value}`);
});

top.add(inputPanel);
top.add(text);