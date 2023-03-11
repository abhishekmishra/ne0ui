import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuSizeHint } from "../../index.mjs";
import { NuBorder } from "../../index.mjs";
import { NuColumnPanel, NuRowPanel } from "../../index.mjs";

//TODO: fix border string when NuBorder.parse is implemented.

// create the toplevel window
var top = new NuTop();

// create a new panel
var panel = new NuColumnPanel({
    'w': new NuSizeHint(600, 600, Infinity),
    'h': 400,
    'margin': '10px',
    // 'border': '2px solid black',
    'border': new NuBorder(2, 'black', 'solid'),
    'padding': '5px',
    'bg': 'azure',
});

// add panel to top
top.add(panel);

// create a row panel
var rowPanel = new NuRowPanel({
    'w': new NuSizeHint(100, 50, Infinity),
    'h': 40,
    'bg': 'whitesmoke',
    // 'border': '1px solid blue',
    'border': new NuBorder(1, 'blue', 'solid'),
    'margin': '2px',
});
panel.addComp(rowPanel);

// create 3 single line text and add to the row panel
for (var i = 0; i < 3; i++) {
    // create and add a single line text control to the toplevel
    var text = new NuSingleLineText({
        w: new NuSizeHint(100, 50, Infinity),
        h: new NuSizeHint(20, 20, Infinity),
        // border: '1px solid gray',
        'border': new NuBorder(1, 'gray', 'solid'),
        margin: '2px',
        text: `#${i}: Lorem ipsum dolor...`,
        justify: 'center',
        bg: 'mistyrose'
    });
    rowPanel.addComp(text);
}


// create 5 single line text and add to the panel
for (var i = 0; i < 5; i++) {
    // create and add a single line text control to the toplevel
    var text = new NuSingleLineText({
        w: new NuSizeHint(100, 50, Infinity),
        h: new NuSizeHint(40, 50, Infinity),
        // border: '1px solid gray',
        'border': new NuBorder(1, 'gray', 'solid'),
        margin: '2px',
        text: `#${i}: Lorem ipsum dolor sit amet, consectetur...`,
        justify: 'center',
        bg: 'whitesmoke'
    });
    panel.addComp(text);
}
