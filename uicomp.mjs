import {NuRect} from './containers.mjs';

class UITool extends NuRect {
    elem;
    constructor(w, h) {
        super(w, h);
    }

    setElem(e) {
        this.elem = e;
        this.appendElem(this.elem);
    }

    getElem(e) {
        return this.elem;
    }

    setElemStyle(k = null, v = null) {
        if (k !== null) {
            this.elem.style.setProperty(k, v);
        }
    }

    postresize() {
        this.setElemStyle('width', this.getWidth() + 'px');
        this.setElemStyle('height', this.getHeight() + 'px');
    }
}

export class NuButton extends UITool {
    constructor(w, h, text = 'yo') {
        super(w, h);
        this.setElem(document.createElement('button'));
        this.elem.innerHTML = text;
    }
}

export class NuSingleLineText extends UITool {
    constructor(w, h, text = 'yo') {
        super(w, h);
        this.setElem(document.createElement('div'));
        this.elem.innerHTML = text;
    }
}

export class NuCanvas extends UITool {
    constructor(w, h) {
        super(w, h);
        this.setElem(document.createElement('canvas'));
        this.setStyle('text-align', 'center');
    }
}
