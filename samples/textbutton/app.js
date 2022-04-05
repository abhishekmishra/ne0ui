import { NuRowContainer } from "../../containers.mjs";
import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuSizeHint } from "../../sizehint.mjs";
import { NuButton, NuUICompConfig } from "../../uicomp.mjs";

// create the toplevel window
var top = new NuTop();

var row = new NuRowContainer(250, 25);
row.setStyle('background-color', 'black');

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
    w: 150,
    h: 25,
    text: 'Here is some text: ',
    justify: 'right',
    bg: 'black',
    fg: 'white',
});

var btn = new NuButton({
    w: 100,
    h: 25,
    margin: '0px 0px 0px 3px',
    text: 'Click me!'
});

top.add(row);
row.add(text);
row.add(btn);
