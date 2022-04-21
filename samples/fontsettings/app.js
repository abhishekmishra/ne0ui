import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuFont } from "../../uicommon.mjs";

// create the toplevel window
var top = new NuTop();

//create the font object
const textFont = new NuFont('Times New Roman', 'italic', 24);

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
    w: 400,
    h: 25,
    text: 'This text has font settings',
    justify: 'center',
    font: textFont
});
top.appendRect(text);

// center justify the text in the text control
// center the text element in parent
// and keep centered when parent is resized
text.centerParent();
text.getParent().onRectEvent('nu_resize', (evt) => {
    text.centerParent();
});