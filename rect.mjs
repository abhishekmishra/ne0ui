/**
 * This class defines size hints for all rect
 * elements in the UI.
 */
export class NuSizeHint {
    min;
    pref;
    max;

    constructor(pref, minimum = null, maximum = null) {
        this.pref = pref;
        if (minimum == null) {
            this.min = this.pref;
        } else {
            this.min = minimum;
        }
        if (maximum == null) {
            this.max = this.pref;
        } else {
            this.max = maximum;
        }
    }

    ok(val) {
        if (val >= this.min && this.max > val) {
            return true;
        } else {
            return false;
        }
    }
}

function sumArr(arr) {
    return arr.reduce((prev, current) => prev + current, 0);
}

function processClaims(claims, avlblLen) {
    var hasInf = false;
    var infCount = 0;
    for (var i = 0; i < claims.length; i++) {
        if (claims[i] == Infinity) {
            hasInf = true;
            infCount += 1;
        }
    }
    if (hasInf) {
        // console.log(`contains ${infCount} infinity claims, need handling`);
        const infClaims = claims.map(x => { if (x == Infinity) { return 1 / infCount * avlblLen } else { return 0; } });
        // console.log(infClaims);
        return infClaims;
    } else {
        const totClaims = sumArr(claims);
        const propClaims = claims.map(x => (x / totClaims * Math.min(totClaims, avlblLen)));
        // console.log(propClaims);
        return propClaims;
    }
}

export function allocateSizes(dimHints, avlblLen) {
    const minArr = dimHints.map((x) => x.min);
    const actualsArr = dimHints.map((x) => x.pref);
    const maxArr = dimHints.map((x) => x.max);

    const sumOfMins = sumArr(minArr);
    const sumOfActuals = sumArr(actualsArr);

    if (sumOfMins > avlblLen) {
        console.error(`min length of all items ${sumOfMins} is greater than available length ${avlblLen}`);
        return null;
    }

    if (sumOfMins == avlblLen) {
        console.log(`min length of all items ${sumOfMins} is equal to available length ${avlblLen}. Allocate min for all.`);
        return minArr;
    }

    if (sumOfMins < avlblLen) {
        // console.log(`space is available ${avlblLen} beyond min ${sumOfMins}`);
        var alloc;
        var claims;
        if (sumOfActuals <= avlblLen) {
            // console.log(`actuals ${sumOfActuals} can be allocated.`);
            alloc = [...actualsArr];
            claims = dimHints.map(x => x.max - x.pref);
        } else {
            // console.log(`actuals ${sumOfActuals} cannot be allocated, start with min.`);
            alloc = [...minArr];
            claims = dimHints.map(x => x.pref - x.min);
            if (sumArr(claims) > 0) {
                //process claims
                var claimsAlloc = processClaims(claims, avlblLen - sumArr(alloc));
                for (var i = 0; i < claimsAlloc.length; i++) {
                    alloc[i] = alloc[i] + claimsAlloc[i];
                }
            }
            if (sumArr(alloc) < avlblLen) {
                claims = [];
                for (var i = 0; i < alloc.length; i++) {
                    claims.push(dimHints[i].max - alloc[i]);
                }
            }
        }

        // console.log(claims);
        if (sumArr(claims) > 0) {
            //process claims
            var claimsAlloc = processClaims(claims, avlblLen - sumArr(alloc));
            for (var i = 0; i < claimsAlloc.length; i++) {
                alloc[i] = alloc[i] + claimsAlloc[i];
            }
        }

        return alloc;
    }
}

export class NuRect {
    dimHint;
    div;
    divCompStyle;

    constructor(w, h) {
        if (!(w instanceof NuSizeHint) || !(h instanceof NuSizeHint)) {
            throw ("width and height should be size hint instances!");
        }

        this.div = document.createElement('div');
        this.divCompStyle = window.getComputedStyle(this.div);

        this.setSizeHint(w, h);
        this.setStyle('margin', "0px");
        this.setStyle('padding', "0px");

        // setStyle does not allow setting border
        this.div.style.setProperty('border', '0px');
    }

    setSizeHint(w, h) {
        this.dimHint = [];
        this.dimHint.push(w);
        this.dimHint.push(h);

        this.dim = [w.pref, h.pref];

        this.setStyle('width', this.dim[0] + 'px');
        this.setStyle('height', this.dim[1] + 'px');
    }

    setSize(w, h) {
        this.dim[0] = w;
        this.dim[1] = h;

        this.setStyle('width', this.dim[0] + 'px');
        this.setStyle('height', this.dim[1] + 'px');
    }

    resize(w, h) {
        // console.log(`resize ${this.constructor.name} to ${w}, ${h}`);
        if (w >= this.getWidthHint().min && h >= this.getHeightHint().min) {
            this.setSize(w, h);
        } else {
            console.error(`cannot resize, new size[${w}, ${h}] out of min bounds[${this.getWidthHint().min}, ${this.getHeightHint().min}]`);
        }
        this.postresize();
    }

    postresize() {
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
        this.setStyle('position', 'absolute');
        this.setStyle('top', t + 'px');
        this.setStyle('left', l + 'px');
    }

    appendRect(rect) {
        this.appendElem(rect.div);
    }

    removeRect(rect) {
        this.removeElem(rect.div);
    }

    appendElem(elem) {
        this.div.appendChild(elem);
    }

    removeElem(rect) {
        this.div.removeChild(elem);
    }

}


class _DirectionLayout extends NuRect {
    beginItems;
    endItems;

    constructor(w, h) {
        super(w, h);
        this.beginItems = [];
        this.endItems = [];
        this.setStyle('background-color', 'blue');
        this.setStyle('overflow', 'hidden');
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

    postresize() {
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
}

export class NuColumnContainer extends _DirectionLayout {
    constructor(w, h) {
        super(w, h);
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
            item.resize(this.getWidth(), item.getHeight());
        });
        this.endItems.forEach((item) => {
            item.resize(this.getWidth(), item.getHeight());
        });
    }
}

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
            item.resize(item.getWidth(), this.getHeight());
        });
        this.endItems.forEach((item) => {
            item.resize(item.getWidth(), this.getHeight());
        });
    }
}

export class NuTop extends NuColumnContainer {
    constructor() {
        super(
            new NuSizeHint(window.innerWidth, 400, Infinity),
            new NuSizeHint(window.innerHeight, 300, Infinity)
        );

        this.id('main');
        this.setStyle('background-color', 'gray');
        document.body.appendChild(this.div);
        document.body.style.setProperty('width', '100%');
        document.body.style.setProperty('height', '100%');
        document.body.onresize = (event) => {
            this.resize(window.innerWidth, window.innerHeight);
        };
    }
}

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
