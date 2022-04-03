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
