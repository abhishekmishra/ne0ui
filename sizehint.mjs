/**
 * This class defines size hints for all rect
 * elements in the UI.
 */
export class NuSizeHint {
    min;
    pref;
    max;

    /**
     * A class which provides a way to suggest size hint of a component.
     * 
     * @param {Number} pref the preferred size
     * @param {Number} minimum min possible size (default is null, which will set min = pref)
     * @param {Number} maximum max possible size (default is null, which will set max = pref)
     */
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

    /**
     * Check if a given size is valid for the size hint range.
     * 
     * @param {Number} val input size to chec
     * @returns {Boolean} check if the input value is a valid size for the range.
     */
    ok(val) {
        if (val >= this.min && this.max >= val) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clamp a given value of size to the size hint range,
     * if the value is already within range, then it is returned as-is.
     * 
     * @param {Number} val input value as suggested size
     * @returns {Number} Closes value which falls inside the size hint range
     */
    clamp(val) {
        if(this.ok(val)) {
            return val;
        }
        if (val < this.min) {
            return this.min;
        }
        if (val > this.max) {
            return this.max;
        }
    }
}

/**
 * Create a new size hint object with the
 * min, pref, and max values equal to the provided value.
 * 
 * @param {Number} val preferred size
 * @returns {NuSizeHint} object
 */
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