import { NuTop, NuColumnPanel, NuSizeHint, NuBorder, NuSingleLineText, NuFont } from "../index.mjs";

// create the toplevel window
var top = new NuTop();

var topPanel = new NuColumnPanel({
    'w': new NuSizeHint(600, 600, Infinity),
    'h': new NuSizeHint(500, 500, Infinity),
    'scrollable': 'true'
});

top.add(topPanel);

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

            // create a new panel
            var samplePanel = new NuColumnPanel({
                'w': new NuSizeHint(600, 600, Infinity),
                'h': 100,
                'margin': '1px',
                // 'border': '2px solid black',
                'border': new NuBorder(2, 'black', 'solid'),
                'padding': '5px',
                'bg': 'azure',
            });

            samplePanel.addComp(new NuSingleLineText({
                'text': `<a href="${sample.name}">${sample.title}</a>`,
                'w': 100,
                'h': 20,
                'font': titleFont
            }));

            samplePanel.addComp(new NuSingleLineText({
                'text': `${sample.description}`,
                'w': 100,
                'h': 40,
                'font': descFont
            }));


            topPanel.addComp(samplePanel);
        }
    });
