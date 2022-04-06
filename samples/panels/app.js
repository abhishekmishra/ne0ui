import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuSizeHint } from "../../sizehint.mjs";
import { NuPanel } from "../../uicomp.mjs";

// create the toplevel window
var top = new NuTop();

// create a new panel
var panel = new NuPanel({
    'w': 600,
    'h': 400,
    'margin': '10px',
    'border': '2px solid black',
    'padding': '5px',
    'bg': 'azure',
    'orientation': 'vertical'
});

// add panel to top
top.appendRect(panel);

// create 5 single line text and add to the panel
for (var i = 0; i < 5; i++) {
    // create and add a single line text control to the toplevel
    var text = new NuSingleLineText({
        w: new NuSizeHint(100, 50, Infinity),
        h: new NuSizeHint(40, 50, Infinity),
        border: '1px solid gray',
        margin: '2px',
        text: `#${i}: Lorem ipsum dolor sit amet, consectetur...`,
        justify: 'center',
        bg: 'whitesmoke'
    });
    panel.addComp(text);
}
