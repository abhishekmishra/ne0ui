import { NuTop, NuSingleLineText } from '../../index.mjs';
import { NuSizeHint } from '../../index.mjs';
import { NuButton, NuRowPanel } from '../../index.mjs';

// create the toplevel window
var top = new NuTop();

var row = new NuRowPanel({
  w: new NuSizeHint(600, 600, Infinity),
  h: 25,
});
row.setStyle('background-color', 'darkgray');

// create and add a single line text control to the toplevel
var text = new NuSingleLineText({
  w: 400,
  h: 25,
  text: 'Click the first button to disable/enable the next one: ',
  justify: 'right',
  bg: 'darkgray',
  fg: 'black',
  margin: '0px 5px 0px 0px',
});

var btn1 = new NuButton({
  w: 100,
  h: 25,
  text: 'Click me!',
  margin: '2px',
  icon: 'bi bi-info-circle',
});

var btn2 = new NuButton({
  w: 100,
  h: 25,
  text: 'Click me 2!',
  margin: '2px',
  icon: 'bi bi-info-circle',
});

top.add(row);
row.addComp(text);

// when adding at end of the panel
// last item should be added first
row.addComp(btn2, 'end');
row.addComp(btn1, 'end');

// toggle btn2 on click of btn1
btn1.on('click', (evt) => {
  console.log('btn1 clicked');
  if (btn2.isDisabled()) {
    btn2.enable();
  } else {
    btn2.disable();
  }
});

btn2.on('click', (evt) => {
  console.log('btn2 is working');
});
