import { NuTop, NuSingleLineText, NuSizeHint } from "../../index.mjs";

var top = new NuTop();
var text = new NuSingleLineText(new NuSizeHint(200), new NuSizeHint(50), 'HELLO WORLD!');
top.appendRect(text);
