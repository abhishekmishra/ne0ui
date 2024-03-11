import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuInputPanel, NuLabel, NuRangeInput } from "../../index.mjs";

// create the toplevel window
var top = new NuTop();

var slider = new NuRangeInput({
    w: 100,
    h: 25,
    justify: "center",
    min: 10,
    max: 90,
    value: 20,
});

var label = new NuLabel({
    w: 100,
    h: 25,
    justify: "right",
    margin: "2px",
    label: "Sample Slider: ",
});

var inputPanel = new NuInputPanel(
    {
        w: 200,
        h: 25,
        orientation: "horizontal",
    },
    slider,
    label,
);

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
    w: 200,
    h: 25,
    margin: "2px",
    text: "Slider value is: " + slider.elem.value,
    justify: "center",
});

slider.on("input", (evt) => {
    text.setText(`Slider value is: ${evt.target.value}`);
});

top.add(inputPanel);
top.add(text);
