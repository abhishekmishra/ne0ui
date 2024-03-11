import {
    NuTop,
    NuColumnPanel,
    NuSizeHint,
    NuBorder,
    NuSingleLineText,
    NuFont,
    NuRowPanel,
    NuText,
    NuPreformattedText,
    NuTreeView,
    NuTreeItem,
    NuAppWindow,
} from "../index.mjs";
import { NuIFrame } from "../index.mjs";

class SamplesApp extends NuAppWindow {
    constructor() {
        super({
            w: new NuSizeHint(400, 120, Infinity),
            h: new NuSizeHint(300, 120, Infinity),
        });
    }
}

class SampleDisplayPanel extends NuColumnPanel {
    titleBar;
    displayIframe;
    codeText;

    constructor() {
        const widthHint = new NuSizeHint(600, 600, Infinity);
        super({
            w: widthHint,
            h: new NuSizeHint(600, 600, Infinity),
            // 'margin': '2px',
        });

        this.addClass("window-body");

        this.titleBar = new NuText({
            w: widthHint,
            h: 20,
            text: "Sample display: ...",
            font: new NuFont("inherit", "bold", "1.2", "em"),
            justify: "center",
            // 'bg': 'whitesmoke'
        });

        this.titleBar.addClass("title-bar");

        this.displayIframe = new NuIFrame({
            w: new NuSizeHint(600, 600, Infinity),
            h: new NuSizeHint(300, 300, Infinity),
            src: "helloworld",
            border: new NuBorder(0),
            bg: "whitesmoke",
        });

        this.codeText = new NuIFrame({
            w: new NuSizeHint(600, 600, Infinity),
            h: new NuSizeHint(200, 200, Infinity),
            border: new NuBorder(0),
            bg: "PapayaWhip",
            src: "helloworld/app.js",
        });

        this.addComp(this.titleBar);
        this.addComp(this.displayIframe);
        this.addComp(this.codeText);
    }

    showSample(sample) {
        this.titleBar.setText(
            '<div class="title-bar-text">Sample: ' + sample.title + "</div>",
        );
        this.displayIframe.setSrc(sample.name);
        this.codeText.setSrc(sample.name + "/app.js");
    }
}

// class SamplePanel extends NuColumnPanel {
//     constructor(sample) {
//         super({
//             'w': new NuSizeHint(120, 120, Infinity),
//             'h': new NuSizeHint(120, 120, 120),
//             // 'margin': '1px',
//             // 'border': '2px solid black',
//             // 'border': new NuBorder(2, 'black', 'solid'),
//             'padding': '5px',
//             'bg': 'whitesmoke',
//             // 'scrollable': true
//         });

//         let titleBar = new NuSingleLineText({
//             'text': `<div class="title-bar-text">${sample.index}. ${sample.title}</div>`,
//             'w': new NuSizeHint(120, 120, Infinity),
//             'h': 20,
//             // 'font': titleFont
//         });

//         titleBar.addClass('title-bar');

//         this.addComp(titleBar);

//         this.addComp(new NuText({
//             'text': `${sample.description}`,
//             'w': new NuSizeHint(120, 120, Infinity),
//             'h': 80,
//             // 'font': descFont
//         }));

//         this.div.setAttribute('class', 'window-body');
//     }

//     mouseOver() {
//         this.setElemStyle('cursor', 'pointer');
//     }

//     mouseOut() {
//         this.unsetElemStyle('cursor');
//     }
// }

// create the toplevel window
const top = new NuTop();

const samplesApp = new SamplesApp({
    w: new NuSizeHint(600, 600, Infinity),
    h: new NuSizeHint(500, 500, Infinity),
});

top.add(samplesApp);

let topPanel = new NuRowPanel({
    w: new NuSizeHint(600, 600, Infinity),
    h: new NuSizeHint(500, 500, Infinity),
});

samplesApp.addComp(topPanel);

var sampleListPanel = new NuTreeView({
    w: new NuSizeHint(250, 250, Infinity),
    h: new NuSizeHint(500, 500, Infinity),
    scrollable: "true",
});

topPanel.addComp(sampleListPanel);

let sampleFrame = new SampleDisplayPanel();
topPanel.addComp(sampleFrame);

let titleFont = new NuFont("sans-serif", "bold", "2", "em");
let descFont = new NuFont("serif", "normal", "1.4", "em");

fetch("./samples.json", {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
})
    .then((response) => response.json())
    .then((response) => {
        for (let sampleId in response.samples) {
            const sample = response.samples[sampleId];
            sample.index = sampleId;
            // console.log(sample);

            if (sampleId == 0) {
                sampleFrame.showSample(sample);
            }
            // create a new panel
            var samplePanel = new NuTreeItem({
                w: new NuSizeHint(250, 250, Infinity),
                h: 32,
                text: sample.title,
            });

            sampleListPanel.addItem(samplePanel);

            samplePanel.on("click", () => {
                // console.log('to load ' + sample.name);
                sampleFrame.showSample(sample);
            });
        }
    });
