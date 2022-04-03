import { NuTop, NuSingleLineText } from "../../index.mjs";

// create the toplevel window
var top = new NuTop();

// create and add a single line text control to the toplevel
var text = new NuSingleLineText(200, '50', 'HELLO WORLD!');
top.appendRect(text);

// center the text control in the parent window
text.centerParent();

// center justify the text in the text control
text.justify('center');

// center the text element when parent is resized
text.getParent().onEvent('nu_resize', (evt) => {
    text.centerParent();
});