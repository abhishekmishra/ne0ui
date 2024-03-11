import { NuTop, NuSingleLineText } from "../../index.mjs";

// create the toplevel window
var top = new NuTop();

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
    w: 200,
    h: "50",
    text: "HELLO WORLD!",
    justify: "center",
});
top.appendRect(text);

// center justify the text in the text control

// center the text element in parent
// and keep centered when parent is resized
text.centerParent();
text.getParent().onRectEvent("nu_resize", (evt) => {
    text.centerParent();
});
