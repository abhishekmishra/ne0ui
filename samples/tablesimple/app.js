import { NuTop, NuSingleLineText, NuTable, NuSizeHint } from '../../index.mjs';

// create the toplevel window
var top = new NuTop();

const table = new NuTable(
  {
    w: new NuSizeHint(300, 300, Infinity),
    h: new NuSizeHint(0, 0, 0),
  },
  [
    ['Name', 'Age'],
    ['John', 25],
    ['Jane', 22],
  ]
);

top.add(table);
