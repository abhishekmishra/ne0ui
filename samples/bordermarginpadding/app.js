import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuBorder, NuMargin, NuPadding } from "../../index.mjs";

// create the toplevel window
var top = new NuTop();

const textBorder = new NuBorder(3, "blue", "dotted", 10);
const textMargin = NuMargin.allEqual(5);
const textPadding = NuPadding.allEqual(5);

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
    w: 400,
    h: 25,
    text: "This Text has Border, Margin and Padding",
    justify: "center",
    border: textBorder,
    margin: textMargin,
    padding: textPadding,
});
top.appendRect(text);

// center justify the text in the text control

// center the text element in parent
// and keep centered when parent is resized
text.centerParent();
text.getParent().onRectEvent("nu_resize", (evt) => {
    text.centerParent();
});
