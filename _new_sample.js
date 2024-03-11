const fs = require("fs");

const args = process.argv;

function usage() {
    console.log("Usage:");
    console.log(
        "node _new_sample.js <sample name>: create a new samples folder.",
    );
    console.log("(just a copy of the helloworld sample with given name)");
}

if (args.length < 3) {
    console.error("Error: insufficient args\n");
    usage();
    process.exit(1);
}

let sampleName = args[2];
sampleName = sampleName.replace(/\s/g, "");
sampleName = sampleName.toLowerCase();

console.log("Sample folder is -> " + sampleName);
const sampleFolder = `samples/${sampleName}`;
fs.mkdirSync(sampleFolder);
fs.copyFileSync("samples/helloworld/app.js", sampleFolder + "/app.js");
fs.copyFileSync("samples/helloworld/index.html", sampleFolder + "/index.html");
