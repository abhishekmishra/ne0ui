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

export function getSizeHint(val) {
    var hint = null;
    if (typeof val == 'number') {
        hint = new NuSizeHint(val);
    } else if (val instanceof NuSizeHint) {
        hint = val;
    } else if (!isNaN(parseInt(val))) {
        hint = new NuSizeHint(parseInt(val));
    }
    return hint;
}