import {NuRect} from './containers.mjs';

/**
 * NuUIComponent is the base class of all 
 * non-layout UI components of NE0UI.
 * 
 * It provides a single parent element which
 * is the child of the main Rect Element,
 * and this should be the main presentation element
 * of the UI component
 */
export class NuUIComponent extends NuRect {
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

    setSize(w, h) {
        super.setSize(w, h);
        this.postresize();
    }

    postresize() {
        this.setElemStyle('width', this.getWidth() + 'px');
        this.setElemStyle('height', this.getHeight() + 'px');
    }

    centerParent() {
        if (this.parentRect !== null) {
            var l = (this.parentRect.getWidth()/2) - (this.getWidth()/2);
            var t = (this.parentRect.getHeight()/2) - (this.getHeight()/2);
            this.setAbsolutePosition(l, t);
        }
    }

    on(event, handler) {
        this.elem.addEventListener(event, handler);
    }

    removeEventListener(event, handler) {
        this.elem.removeEventListener(event, handler);
    }
}

export class NuButton extends NuUIComponent {
    constructor(w, h, text = 'yo') {
        super(w, h);
        this.setElem(document.createElement('button'));
        this.elem.innerHTML = text;
    }
}

export class NuSingleLineText extends NuUIComponent {
    constructor(w, h, text = 'yo') {
        super(w, h);
        this.setElem(document.createElement('div'));
        this.elem.innerHTML = text;
    }

    justify(txtjst) {
        this.setElemStyle('text-align', txtjst);
    }
}

export class NuCanvas extends NuUIComponent {
    constructor(w, h) {
        super(w, h);
        this.setElem(document.createElement('canvas'));
        this.setStyle('text-align', 'center');
    }
}
