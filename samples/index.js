import { NuTop, NuColumnPanel, NuSizeHint, NuBorder, NuSingleLineText, NuFont, NuRowPanel } from "../index.mjs";
import { NuIFrame } from "../src/iframe.mjs";

class SampleDisplayPanel extends NuColumnPanel {
    titleText;
    displayIframe;

    constructor() {
        const widthHint = new NuSizeHint(600, 600, Infinity);
        super({
            'w': widthHint,
            'h': new NuSizeHint(600, 600, Infinity),
            'margin': '1px',
        });

        this.titleText = new NuSingleLineText({
            'w': widthHint,
            'h': 30,
            'text': 'Sample display: ...',
            'font': new NuFont('serif', 'bold', 20),
            'justify': 'center'
        });

        this.displayIframe = new NuIFrame({
            'w': new NuSizeHint(600, 600, Infinity),
            'h': new NuSizeHint(500, 500, Infinity),
            'src': 'helloworld',
            'border': new NuBorder(0),
            'bg': 'whitesmoke'
        });

        this.addComp(this.titleText);
        this.addComp(this.displayIframe);
    }

    showSample(sample) {
        this.titleText.setText('Sample: ' + sample.title);
        this.displayIframe.setSrc(sample.name);
    }
}

class SamplePanel extends NuColumnPanel {
    constructor(sample) {
        super({
            'w': new NuSizeHint(120, 120, Infinity),
            'h': new NuSizeHint(80, 80, 80),
            'margin': '1px',
            // 'border': '2px solid black',
            'border': new NuBorder(2, 'black', 'solid'),
            'padding': '5px',
            'bg': 'whitesmoke',
            // 'scrollable': true
        });

        this.addComp(new NuSingleLineText({
            'text': `<a href="${sample.name}">${sample.title}</a>`,
            'w': 100,
            'h': 20,
            'font': titleFont
        }));

        this.addComp(new NuSingleLineText({
            'text': `${sample.description}`,
            'w': 100,
            'h': 40,
            'font': descFont
        }));

    }

    mouseOver() {
        this.setElemStyle('cursor', 'pointer');
    }

    mouseOut() {
        this.unsetElemStyle('cursor');
    }
}

// create the toplevel window
var top = new NuTop();

let topPanel = new NuRowPanel({
    'w': new NuSizeHint(600, 600, Infinity),
    'h': new NuSizeHint(500, 500, Infinity),
});

top.add(topPanel);

var sampleListPanel = new NuColumnPanel({
    'w': new NuSizeHint(250, 250, Infinity),
    'h': new NuSizeHint(500, 500, Infinity),
    'scrollable': 'true'
});

topPanel.addComp(sampleListPanel);

let sampleFrame = new SampleDisplayPanel();
topPanel.addComp(sampleFrame);

let titleFont = new NuFont('sans-serif', 'bold', '2', 'em')
let descFont = new NuFont('serif', 'normal', '1.4', 'em');

fetch('./samples.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
    .then(response => response.json())
    .then(response => {
        for (let sampleId in response.samples) {
            const sample = response.samples[sampleId];
            console.log(sample);

            if (sampleId == 0) {
                sampleFrame.showSample(sample);
            }
            // create a new panel
            var samplePanel = new SamplePanel(sample);

            sampleListPanel.addComp(samplePanel);

            samplePanel.on('click', () => {
                console.log('to load ' + sample.name);
                sampleFrame.showSample(sample);
            });

        }
    });
