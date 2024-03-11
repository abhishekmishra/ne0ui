import { NuTop, NuRadioPanel, NuSizeHint } from "../../index.mjs";

// create the toplevel window
const top = new NuTop();

// create a group of radio buttons
const radioPanel = new NuRadioPanel({
    w: 300,
    h: 200,
    orientation: "horizontal",
    label: "Choose a color",
    radioName: "color",
    labelWidth: new NuSizeHint(10, 10, 30),
    labelHeight: 12,
    items: [
        { label: "Red", value: "red", checked: true },
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
    ],
    radioWidth: new NuSizeHint(10, 10, 20),
    radioHeight: 12,
});

top.add(radioPanel);
