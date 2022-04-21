import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuBorder, NuMargin, NuPadding } from "../../uicommon.mjs";

// create the toplevel window
var top = new NuTop();

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
    w: 400,
    h: 25,
    text: 'This Text has Border, Margin and Padding',
    justify: 'center'
});
top.appendRect(text);

const textBorder = new NuBorder(3, 'blue', 'dotted', 10);
textBorder.applyStyle(text.elem);

const textMargin = NuMargin.allEqual(5);
textMargin.applyStyle(text.elem);

const textPadding = NuPadding.allEqual(5);
textPadding.applyStyle(text.elem);

// center justify the text in the text control

// center the text element in parent
// and keep centered when parent is resized
text.centerParent();
text.getParent().onRectEvent('nu_resize', (evt) => {
    text.centerParent();
});