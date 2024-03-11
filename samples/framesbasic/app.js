import { NuTop, NuSingleLineText } from "../../index.mjs";
import { NuFrame } from "../../index.mjs";

// create the toplevel window
const top = new NuTop();

const frame1 = new NuFrame({
    w: 100,
    h: 120,
    bg: "whitesmoke",
    pos: {
        left: 100,
        top: 100,
    },
});

top.appendRect(frame1);
