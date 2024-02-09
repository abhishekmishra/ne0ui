import { NuTop, NuSingleLineText, NuButton, NuDialog } from "../../index.mjs";

// create the toplevel window
const top = new NuTop();

const dialog = new NuDialog();
dialog.getTop().add(new NuSingleLineText({
    w: 100,
    h: 25,
    text: 'Dialog Text',
    margin: '2px',
    justify: 'center'
}));

let showDialogBtn = new NuButton({
    w: 100,
    h: 25,
    text: 'Show Dialog!',
    margin: '2px',
    icon: 'bi bi-info-circle'
});

showDialogBtn.on('click', (evt) => {
    console.log('showDialogBtn is working');
    dialog.dialogElem.showModal();
});

top.add(showDialogBtn);