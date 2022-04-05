import { NuRowContainer } from "../../containers.mjs";
import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuSizeHint } from "../../sizehint.mjs";
import { NuButton, NuUICompConfig } from "../../uicomp.mjs";

// create the toplevel window
var top = new NuTop();

var row = new NuRowContainer(250, 25);
row.setStyle('background-color', 'darkgray');

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
    w: 150,
    h: 25,
    text: 'Here is some text: ',
    justify: 'right',
    bg: 'darkgray',
    fg: 'black',
    margin: '0px 5px 0px 0px',
});

var btn = new NuButton({
    w: 100,
    h: 25,
    text: 'Click me!',
    margin: '2px',
});

top.add(row);
row.add(text);
row.add(btn);
