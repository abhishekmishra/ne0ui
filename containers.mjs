import { NuSizeHint, getSizeHint } from "./sizehint.mjs";
import { allocateSizes, sumArr } from "./allocutils.mjs";
import { NuFont } from "./uicommon.mjs";

/** 
 * The base container class in the NE0UI API.
 * Represents an empty rectangular region on the screen,
 * and is backed by an HTML div.
 */
export class NuRect {
    dimHint;
    div;
    divCompStyle;

    /**
     * The parent rectangle of this rectangle. This can be null if there is
     * no parent.
     * @member {NuRect}
     */
    parentRect;

    static rectCount = 0;

    /**
     * Creates a new NuRect rectangle with the given width and height.
     * 
     * @constructor
     * @param {number} w - width of the rectangle
     * @param {number} h - height of the rectangle
     */
    constructor(w, h) {
        w = getSizeHint(w);
        h = getSizeHint(h);

        if (!(w instanceof NuSizeHint) || !(h instanceof NuSizeHint)) {
            throw ("width and height should be size hint instances!");
        }

        this.parentRect = null;
        this.div = document.createElement('div');
        this.id(`${NuRect.nextId()}@${this.constructor.name}`);
        // console.log(`created new id ${this.div.id}`);
        this.divCompStyle = window.getComputedStyle(this.div);
        this.setStyle('margin', "0px");
        this.setStyle('padding', "0px");
        // setStyle does not allow setting border
        this.div.style.setProperty('border', '0px');

        this.setSizeHint(w, h);

        //default event handlers
        this.onRectEvent('nu_resize', (evt) => { this.postresize(evt); });
    }

    static nextId() {
        this.rectCount += 1;
        return this.rectCount;
    }

    /**
     * Get the parent rectangle of this rectangle object.
     * 
     * @returns {NuRect} the parent rectangle object (can be null)
     */
    getParent() {
        return this.parentRect;
    }

    /**
     * Set the parent rectangle for this rectangle object.
     * 
     * @param {NuRe} pRect - the parent rectangle for this rectangle
     */
    setParent(pRect) {
        this.parentRect = pRect;
    }

    /**
     * Set the suggest width and height of the rectangle.
     * Final effective dimensions on screen will depend on layout
     * settings of the container and available space.
     * 
     * @param {number} w - width of the rectangle
     * @param {number} h - height of the rectangle
     */
    setSizeHint(w, h) {
        this.dimHint = [];
        this.dimHint.push(w);
        this.dimHint.push(h);

        this.dim = [w.pref, h.pref];

        this.setStyle('width', this.dim[0] + 'px');
        this.setStyle('height', this.dim[1] + 'px');
    }

    /**
     * Set the width and height of the rectangle to specific values.
     * 
     * @param {number} w - width of the rectangle
     * @param {number} h - height of th rectangle
     */
    setSize(w, h) {
        this.dim[0] = w;
        this.dim[1] = h;

        this.setStyle('width', this.dim[0] + 'px');
        this.setStyle('height', this.dim[1] + 'px');
    }

    /**
     * Resize the rectangle to given width X height
     * 
     * @param {number} w - width of the rectangle
     * @param {number} h - height of th rectangle
     */
    resize(w, h) {
        // console.log(`resize ${this.constructor.name} to ${w}, ${h}`);
        if (w >= this.getWidthHint().min && h >= this.getHeightHint().min) {
            this.setSize(w, h);
        } else {
            console.error(`cannot resize, new size[${w}, ${h}] out of min bounds[${this.getWidthHint().min}, ${this.getHeightHint().min}]`);
        }

        // dispatch the nu_resize event
        this.div.dispatchEvent(new CustomEvent('nu_resize'), {
            rect: this,
        });
    }

    /**
     * Attach the given event handler to the given event
     * 
     * @param {Object} event - event to assign the handler
     * @param {Object} handler - event handler to attach to the event
     */
    onRectEvent(event, handler) {
        this.div.addEventListener(event, handler);
    }

    /**
     * Detach the given event handler from the given event
     * 
     * @param {Object} event - event to assign the handler
     * @param {Object} handler - event handler to detach
     */
    offRectEvent(event, handler) {
        this.div.removeEventListener(event, handler);
    }

    postresize(evt) {
        // console.log(`New dim is ${this.dimHint}`);
    }

    getWidthHint() {
        return this.dimHint[0];
    }

    getWidth() {
        return this.dim[0];
    }

    getHeightHint() {
        return this.dimHint[1];
    }

    getHeight() {
        return this.dim[1];
    }

    // getTotalWidth() {
    //     var w = parseInt(this.divCompStyle.getPropertyValue('width'))
    //         + parseInt(this.divCompStyle.getPropertyValue('border-left-width'))
    //         + parseInt(this.divCompStyle.getPropertyValue('border-right-width'));
    //     if (isNaN(w)) {
    //         return this.getWidth();
    //     }
    //     return w;
    // }
    // getTotalHeight() {
    //     var h = parseInt(this.divCompStyle.getPropertyValue('height'))
    //         + parseInt(this.divCompStyle.getPropertyValue('border-top-width'))
    //         + parseInt(this.divCompStyle.getPropertyValue('border-bottom-width'));
    //     if (isNaN(h)) {
    //         return this.getHeight();
    //     }
    //     return h;
    // }

    id(v = null) {
        if (v !== null) {
            this.div.setAttribute('id', v);
        }
        return this.div.getAttribute('id');
    }

    getAttr(k = null) {
        if (k === null) {
            return null;
        } else {
            return this.div.getAttribute(k);
        }
    }

    setAttr(k = null, v = null) {
        if (k === null) {
            return null;
        } else {
            this.div.setAttribute(k, v);
            return this.getAttr(k);
        }
    }

    setStyle(k = null, v = null) {
        if (k !== null) {
            if (k.startsWith('border')) {
                console.error("This is a container, don't set border here please!");
                return;
            }
            this.div.style.setProperty(k, v);
        }
    }

    setAbsolutePosition(l, t) {
        // console.log(`setting position to left = ${l}, top = ${t}`);
        this.setStyle('position', 'absolute');
        this.setStyle('top', t + 'px');
        this.setStyle('left', l + 'px');
    }

    appendRect(rect) {
        this.appendElem(rect.div);
        rect.setParent(this);
    }

    removeRect(rect) {
        this.removeElem(rect.div);
        rect.setParent(null);
    }

    appendElem(elem) {
        this.div.appendChild(elem);
    }

    removeElem(rect) {
        this.div.removeChild(elem);
    }

    isHidden() {
        return this.div.style.display === 'none';
    }

    isShown() {
        return !this.isHidden();
    }

    hide() {
        this.div.style.display = 'none';
    }

    show() {
        this.div.style.display = 'block'
    }

    toggleVisible() {
        if(this.isHidden()) {
            this.show();
        } else {
            this.hide();
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.div.requestFullscreen().then(() => {
                // this.resetPagePosition();
            }).catch(err => {
                alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

class _DirectionLayout extends NuRect {
    beginItems;
    endItems;
    scrollEnabled;

    constructor(w, h, scrollEnabled = false) {
        super(w, h);
        this.scrollEnabled = scrollEnabled;
        this.beginItems = [];
        this.endItems = [];
    }

    remove(rect) {
        var idx = this.beginItems.indexOf(rect);
        if (idx != -1) {
            this.beginItems.splice(idx, 1);
        }
        idx = this.endItems.indexOf(rect);
        if (idx != -1) {
            this.endItems.splice(idx, 1);
        }
        this.removeRect(rect);
    }

    add(rect, side = 'begin') {
        if (side == 'begin') {
            this.addBegin(rect);
        } else if (side == 'end') {
            this.addEnd(rect);
        } else {
            console.error(`side ${side} unknown.`);
            return;
        }

        //rollback if size exceeded after add
        if (this.getUsedLength() > this.getMaxLength()) {
            console.error('rect rejected becaue no more space left.');
            this.remove(rect);
        }
    }

    addBegin(rect) {
        if (this.spaceAvailableFor(rect)) {
            this.beginItems.push(rect);
            this.appendRect(rect);
            this.postresize();
        } else {
            console.error('rect rejected becaue no more space left.');
        }
    }

    addEnd(rect) {
        if (this.spaceAvailableFor(rect)) {
            this.endItems.push(rect);
            this.appendRect(rect);
            this.postresize();
        } else {
            console.error('rect rejected becaue no more space left.');
        }
    }

    //override to give dimension in the direction
    setItemLength(item) {
    }

    getItemLength(item) {
        return 0;
    }

    getItemMinLength(item) {
        return 0;
    }

    getItemMaxLength(item) {
        return 0;
    }

    getItemLengthHint(item) {
        return null;
    }

    //override to give total dimension of layout
    getMaxLength() {
        return 0;
    }

    //override to set appropriate dimension
    setPosition(rect, pos) {
        // empty
    }

    getUsedLength() {
        var usedLen = 0;
        for (var i = 0; i < this.beginItems.length; i++) {
            var item = this.beginItems[i];
            usedLen += this.getItemLength(item);
        }
        for (var i = 0; i < this.endItems.length; i++) {
            var item = this.endItems[i];
            usedLen += this.getItemLength(item);
        }
        return usedLen;
    }

    getFreeLength() {
        return this.getMaxLength() - this.getUsedLength();
    }

    hasSpace() {
        return (this.getFreeLength() > 0);
    }

    spaceAvailableFor(rect) {
        var allItems = [...this.beginItems];
        allItems = allItems.concat(this.endItems);
        const minUsedLength = sumArr(allItems.map(x => this.getItemMinLength(x)));
        // console.log(`all items = ${allItems}, total min is ${minUsedLength}`);
        return ((minUsedLength + rect.getHeightHint().min) < this.getMaxLength());
    }

    postresize(evt) {
        this.allocRects();

        this.broadcastBreadth();
    }

    allocRects() {
        var allItems = [...this.beginItems];
        allItems = allItems.concat(this.endItems);
        var dimHints = [];
        for (var i = 0; i < allItems.length; i++) {
            var itm = allItems[i];
            dimHints.push(this.getItemLengthHint(itm));
        }

        var alloc = allocateSizes(dimHints, this.getMaxLength());
        // console.log(alloc);
        if (alloc !== null) {
            var pos = 0;
            for (var i = 0; i < this.beginItems.length; i++) {
                var item = this.beginItems[i];
                this.setItemLength(item, alloc[i]);
                this.setPosition(item, pos);
                pos += this.getItemLength(item);
            }

            pos = this.getMaxLength();
            for (var i = 0; i < this.endItems.length; i++) {
                var item = this.endItems[i];
                this.setItemLength(item, alloc[i + this.beginItems.length]);
                pos -= this.getItemLength(item);
                this.setPosition(item, pos);
            }
        }
    }

    //override to broadcast the non length dimension of layout to the children
    broadcastBreadth() {
    }

    isScrollEnabled() {
        return this.scrollEnabled;
    }
}

/**
 * This is a simple container class to layout a list of NuRect objects in a
 * column. UI components can be added at the beginning of the column at its
 * end.
 */
export class NuColumnContainer extends _DirectionLayout {
    constructor(w, h, scrollEnabled = false) {
        super(w, h, scrollEnabled);

        if (scrollEnabled) {
            this.setStyle('overflow-x', 'hidden');
            this.setStyle('overflow-y', 'auto');
            this.getHeightHint().max = Infinity;
        } else {
            this.setStyle('overflow', 'hidden');
        }
    }

    setItemLength(item, l) {
        item.resize(item.getWidth(), l);
    }

    getItemLength(item) {
        return item.getHeight();
    }
    getItemMinLength(item) {
        return item.getHeightHint().min;
    }
    getItemMaxLength(item) {
        return item.getHeightHint().max;
    }
    getItemLengthHint(item) {
        return item.getHeightHint();
    }

    getMaxLength() {
        if (this.isScrollEnabled()) {
            // console.log(`scroll is enabled so returning ${this.getHeightHint().max}`);
            return this.getHeightHint().max;
        }
        return this.getHeight();
    }

    setPosition(rect, pos) {
        rect.setAbsolutePosition(0, pos);
    }

    getMinHeight() {
        return this.getUsedLength();
    }

    getMinWidth() {
        var minwidths = [];
        minwidths = minwidths.concat(this.beginItems.map(x => x.getMinWidth()));
        minwidths = minwidths.concat(this.endItems.map(x => x.getMinWidth()));
        console.log(`returing max from minwidths ${minwidths}`);
        return Math.max(...minwidths);
    }

    broadcastBreadth() {
        this.beginItems.forEach((item) => {
            item.resize(item.getWidthHint().clamp(this.getWidth()), item.getHeight());
        });
        this.endItems.forEach((item) => {
            item.resize(item.getWidthHint().clamp(this.getWidth()), item.getHeight());
        });
    }
}

/**
 * This is a simple container class to layout a list of NuRect objects in a
 * row. UI components can be added at the beginning of the row at its
 * end.
 */
export class NuRowContainer extends _DirectionLayout {
    constructor(w, h) {
        super(w, h);
    }

    setItemLength(item, l) {
        item.resize(l, item.getHeight());
    }
    getItemLength(item) {
        return item.getWidth();
    }
    getItemMinLength(item) {
        return item.getWidthHint().min;
    }
    getItemMaxLength(item) {
        return item.getWidthHint().max;
    }
    getItemLengthHint(item) {
        return item.getWidthHint();
    }

    getMaxLength() {
        return this.getWidth();
    }

    setPosition(rect, pos) {
        rect.setAbsolutePosition(pos, 0);
    }

    getMinWidth() {
        console.log('returning used len -> ' + this.getUsedLength());
        return this.getUsedLength();
    }

    getMinHeight() {
        var minheights = [];
        minheights = minheights.concat(this.beginItems.map(x => x.getMinHeight()));
        minheights = minheights.concat(this.endItems.map(x => x.getMinHeight()));
        console.log(`returing max from minheights ${minheights}`);
        return Math.max(...minheights);
    }

    broadcastBreadth() {
        this.beginItems.forEach((item) => {
            item.resize(item.getWidth(), item.getHeightHint().clamp(this.getHeight()));
        });
        this.endItems.forEach((item) => {
            item.resize(item.getWidth(), item.getHeightHint().clamp(this.getHeight()));
        });
    }
}

/**
 * Top-level container for a webapp. This container sets some special
 * attributes on the document.body to make sure this NuRect fills the screen.
 */
export class NuTop extends NuColumnContainer {
    constructor() {
        super(
            new NuSizeHint(window.innerWidth, 100, Infinity),
            new NuSizeHint(window.innerHeight, 100, Infinity)
        );

        // this.id('main');
        // this.setStyle('background-color', 'gray');
        document.body.appendChild(this.div);
        document.body.style.setProperty('margin', '0px');
        document.body.style.setProperty('width', '100%');
        document.body.style.setProperty('height', '100%');

        document.body.onresize = (event) => {
            this.resize(window.innerWidth, window.innerHeight);
        };

        //create toplevel object
        window.nu = {
            top: this,
            config: {
                font: new NuFont('Times New Roman', 'normal', 12),
            }
        };
    }
}
