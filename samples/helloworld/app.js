import { NuTop, NuSingleLineText, NuSizeHint } from "../../index.mjs";

var top = new NuTop();
var text = new NuSingleLineText(200, '50', 'HELLO WORLD!');
top.appendRect(text);
