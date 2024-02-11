/**
 * Create a new size hint object with the
 * min, pref, and max values equal to the provided value.
 *
 * @param {Number} val preferred size
 * @returns {NuSizeHint} object
 */
export function getSizeHint(val: number): NuSizeHint;
/**
 * This class defines size hints for all rect
 * elements in the UI.
 */
export class NuSizeHint {
  /**
   * A class which provides a way to suggest size hint of a component.
   *
   * @param {Number} pref the preferred size
   * @param {Number} minimum min possible size (default is null, which will set min = pref)
   * @param {Number} maximum max possible size (default is null, which will set max = pref)
   */
  constructor(pref: number, minimum?: number, maximum?: number);
  min: number;
  pref: number;
  max: number;
  /**
   * Check if a given size is valid for the size hint range.
   *
   * @param {Number} val input size to chec
   * @returns {Boolean} check if the input value is a valid size for the range.
   */
  ok(val: number): boolean;
  /**
   * Clamp a given value of size to the size hint range,
   * if the value is already within range, then it is returned as-is.
   *
   * @param {Number} val input value as suggested size
   * @returns {Number} Closes value which falls inside the size hint range
   */
  clamp(val: number): number;
}
