export function setElemStyle(elem, k = null, v = null) {
    if (k !== null) {
        elem.style.setProperty(k, v);
        // console.log(`setting property ${k} to ${v}`);
    }
}

export class NuSides {
    left;
    right;
    top;
    bottom;
    constructor(l, r, t, b) {
        this.left = l;
        this.right = r;
        this.top = t;
        this.bottom = b;
    }

    static allEqual(val) {
        return new NuSides(val, val, val, val);
    }

    static vertAndHoriz(vert, horiz) {
        return new NuSides(horiz, horiz, vert, vert);
    }

    static getNumericSidesFromArg(val) {
        if (val === null || val === undefined) {
            throw (new Error('value is null or undefined'));
        }
        else if (typeof val === 'number') {
            return NuSides.allEqual(val);
        } else if (typeof val === 'string') {
            return NuSides.allEqual(parseFloat(val));
        } else if (val instanceof NuSides) {
            return val;
        } else {
            throw (new Error('unable to parse argument ' + val));
        }
    }

    static getStringSidesFromArg(val) {
        if (val === null || val === undefined) {
            throw (new Error('value is null or undefined'));
        } else if (typeof val === 'string') {
            return NuSides.allEqual(val);
        } else if (val instanceof NuSides) {
            return val;
        } else {
            throw (new Error('unable to parse argument ' + val));
        }
    }

    static sideNames() {
        return ['left', 'right', 'top', 'bottom'];
    }

    getSide(side) {
        if (side === 'left') return this.left;
        if (side === 'right') return this.right;
        if (side === 'top') return this.top;
        if (side === 'bottom') return this.bottom;
        throw (new Error(`invalid value of side - ${side}`));
    }
}

export class NuBorder {
    width;
    color;
    style;
    radius;
    unit;
    constructor(width = 0, color = 'black', style = 'solid', radius = 0, unit = 'px') {
        this.width = NuSides.getNumericSidesFromArg(width);
        this.color = NuSides.getStringSidesFromArg(color);
        this.style = NuSides.getStringSidesFromArg(style);
        this.radius = radius;
        this.unit = unit;
    }

    applyStyle(uielem) {
        NuSides.sideNames().forEach((side, idx) => {
            setElemStyle(uielem, `border-${side}-width`, `${this.width.getSide(side)}${this.unit}`);
            setElemStyle(uielem, `border-${side}-color`, this.color.getSide(side));
            setElemStyle(uielem, `border-${side}-style`, this.style.getSide(side));
        });
        setElemStyle(uielem, 'border-radius', this.radius + this.unit);
    }

    static parse(input) {
        if (input instanceof NuBorder) {
            return input;
        }
        throw (new Error(`cannot parse ${input} for border`));
    }
}

export class NuMargin extends NuSides {
    unit;
    constructor(l, r, t, b, unit = 'px') {
        super(l, r, t, b);
        this.unit = unit;
    }

    applyStyle(uielem) {
        NuSides.sideNames().forEach((side, idx) => {
            setElemStyle(uielem, `margin-${side}`, this.getSide(side) + this.unit);
        });
    }

    static allEqual(val) {
        return new NuMargin(val, val, val, val);
    }

    static vertAndHoriz(vert, horiz) {
        return new NuMargin(horiz, horiz, vert, vert);
    }

    static parse(input) {
        if (input instanceof NuMargin) {
            return input;
        }
        if (typeof input === 'string') {
            const vals = input.split(' ');
            if (vals.length === 1) {
                const v = parseFloat(vals[0]);
                return NuMargin.allEqual(v);
            }
            else if (vals.length === 2) {
                const v1 = parseFloat(vals[0]);
                const v2 = parseFloat(vals[1]);
                return NuMargin.vertAndHoriz(v1, v2);
            }
            else if (vals.length === 3) {
                const v1 = parseFloat(vals[0]);
                const v2 = parseFloat(vals[1]);
                const v3 = parseFloat(vals[2]);
                return new NuMargin(v1, v2, v3, v2);
            } else if (vals.length > 3) {
                const v1 = parseFloat(vals[0]);
                const v2 = parseFloat(vals[1]);
                const v3 = parseFloat(vals[2]);
                const v4 = parseFloat(vals[3]);
                return new NuMargin(v1, v2, v3, v4);
            }
        }
        throw (new Error(`cannot parse ${input} for margin`));
    }

}

export class NuPadding extends NuSides {
    unit;
    constructor(l, r, t, b, unit = 'px') {
        super(l, r, t, b);
        this.unit = unit;
    }

    applyStyle(uielem) {
        NuSides.sideNames().forEach((side, idx) => {
            setElemStyle(uielem, `padding-${side}`, this.getSide(side) + this.unit);
        });
    }

    static allEqual(val) {
        return new NuPadding(val, val, val, val);
    }

    static vertAndHoriz(vert, horiz) {
        return new NuPadding(horiz, horiz, vert, vert);
    }

    static parse(input) {
        if (input instanceof NuPadding) {
            return input;
        }
        if (typeof input === 'string') {
            const vals = input.split(' ');
            if (vals.length === 1) {
                const v = parseFloat(vals[0]);
                return NuPadding.allEqual(v);
            }
            else if (vals.length === 2) {
                const v1 = parseFloat(vals[0]);
                const v2 = parseFloat(vals[1]);
                return NuPadding.vertAndHoriz(v1, v2);
            }
            else if (vals.length === 3) {
                const v1 = parseFloat(vals[0]);
                const v2 = parseFloat(vals[1]);
                const v3 = parseFloat(vals[2]);
                return new NuPadding(v1, v2, v3, v2);
            } else if (vals.length > 3) {
                const v1 = parseFloat(vals[0]);
                const v2 = parseFloat(vals[1]);
                const v3 = parseFloat(vals[2]);
                const v4 = NuPadding.getNumericSidesFromArg(vals[3]);
                return new NuMargin(v1, v2, v3, v4);
            }
        }
        throw (new Error(`cannot parse ${input} for padding`));
    }

}

export class NuFont {
    family;
    style;
    size;
    unit;

    constructor(family = 'monospace', style = 'normal', size = 12, unit = 'px', weight = 0) {
        this.family = family;
        this.style = style;
        this.size = size;
        this.unit = unit;
        this.weight = weight;
    }

    applyStyle(uielem) {
        setElemStyle(uielem, 'font-family', this.family);
        setElemStyle(uielem, 'font-style', this.style);
        setElemStyle(uielem, 'font-size', `${this.size}${this.unit}`);
        if(weight !== 0)
        {
            setElemStyle(uielem, 'font-weight', this.weight);
        }
    }

    static parse(input) {
        if (input instanceof NuFont) {
            return input;
        }
        throw (new Error(`cannot parse ${input} for font`));
    }
}