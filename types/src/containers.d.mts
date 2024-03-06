/**
 * The base container class in the NE0UI API.
 * Represents an empty rectangular region on the screen,
 * and is backed by an HTML div.
 *
 * @class
 */
export class NuRect {
    static rectCount: number;
    /**
     * Increments the id counter and returns the next value.
     *
     * @returns {number} Get the next number which can be used as id
     * @static
     */
    static nextId(): number;
    /**
     * Creates a new NuRect rectangle with the given width and height.
     *
     * @constructor
     * @param {number} w - width of the rectangle
     * @param {number} h - height of the rectangle
     */
    constructor(w: number, h: number);
    dimHint: any;
    div: HTMLDivElement;
    divCompStyle: CSSStyleDeclaration;
    /**
     * The parent rectangle of this rectangle. This can be null if there is
     * no parent.
     * @member {NuRect}
     */
    parentRect: any;
    /**
     * Get the parent rectangle of this rectangle object.
     *
     * @returns {NuRect} the parent rectangle object (can be null)
     */
    getParent(): NuRect;
    /**
     * Set the parent rectangle for this rectangle object.
     *
     * @param {NuRe} pRect - the parent rectangle for this rectangle
     */
    setParent(pRect: NuRe): void;
    /**
     * Set the suggest width and height of the rectangle.
     * Final effective dimensions on screen will depend on layout
     * settings of the container and available space.
     *
     * @param {number} w - width of the rectangle
     * @param {number} h - height of the rectangle
     */
    setSizeHint(w: number, h: number): void;
    dim: any[];
    /**
     * Set the width and height of the rectangle to specific values.
     *
     * @param {number} w - width of the rectangle
     * @param {number} h - height of th rectangle
     */
    setSize(w: number, h: number): void;
    /**
     * Resize the rectangle to given width X height
     *
     * @param {number} w - width of the rectangle
     * @param {number} h - height of th rectangle
     */
    resize(w: number, h: number): void;
    /**
     * Attach the given event handler to the given event
     *
     * @param {Object} event - event to assign the handler
     * @param {Object} handler - event handler to attach to the event
     */
    onRectEvent(event: any, handler: any): void;
    /**
     * Detach the given event handler from the given event
     *
     * @param {Object} event - event to assign the handler
     * @param {Object} handler - event handler to detach
     */
    offRectEvent(event: any, handler: any): void;
    /**
     * Callback for the resize event for the NuRect.
     * Implement this to handle resize event.
     *
     * @abstract
     * @param {event} evt the event object
     */
    postresize(evt: Event): void;
    /**
     * Get the width hint for this NuRect
     *
     * @returns width hint
     */
    getWidthHint(): any;
    /**
     * Get width of the container
     *
     * @returns width of the container
     */
    getWidth(): any;
    /**
     * Get the height hint for this NuRect
     *
     * @returns height hint
     */
    getHeightHint(): any;
    /**
     * Get height of the container
     *
     * @returns height of the container
     */
    getHeight(): any;
    /**
     * Set the given value as id if not null,
     * and return the current id.
     *
     * @param {string} v id to set
     * @returns get the current id
     */
    id(v?: string): string;
    /**
     * Get the attribute value for the given key on the main container div
     *
     * @param {string} k attribute key
     * @returns attribute value
     */
    getAttr(k?: string): string;
    /**
     * Set the attribute value for the given key on the main container div
     *
     * @param {string} k attribute key
     * @param {string} v attribute value
     */
    setAttr(k?: string, v?: string): string;
    /**
     * Set the given style attribute with the given value
     *
     * @param {string} k style attribute key
     * @param {string} v style attribute value
     */
    setStyle(k?: string, v?: string): void;
    /**
     * Set the absolute position of the div element.
     *
     * @param {number} l left position
     * @param {number} t top position
     */
    setAbsolutePosition(l: number, t: number): void;
    appendRect(rect: any): void;
    removeRect(rect: any): void;
    appendElem(elem: any): void;
    removeElem(rect: any): void;
    isHidden(): boolean;
    isShown(): boolean;
    hide(): void;
    show(): void;
    toggleVisible(): void;
    toggleFullscreen(): void;
    /**
     * Add the given css class to the list of classes of the div element.
     *
     * @param {string} clsname css class name
     */
    addClass(clsname: string): void;
    /**
     * Remove the given css class from the list of classes of the div element.
     *
     * @param {string} clsname css class name
     */
    removeClass(clsname: string): void;
    /**
     * Toggle the given css class in the list of classes of the div element.
     *
     * @param {string} clsname css class name
     */
    toggleClass(clsname: string): void;
    /**
     * Check whether given css class name is in the list of classes for this
     * div.
     *
     * @param {string} clsname css class name
     * @returns {boolean} flag indicating whether css class name was found
     */
    hasClass(clsname: string): boolean;
}
/**
 * This is a simple container class to layout a list of NuRect objects in a
 * column. UI components can be added at the beginning of the column at its
 * end.
 */
export class NuColumnContainer extends DirectionalContainer {
    constructor(w: any, h: any, scrollEnabled?: boolean);
    setItemLength(item: any, l: any): void;
    getItemLength(item: any): any;
    getItemMinLength(item: any): any;
    getItemMaxLength(item: any): any;
    getMaxLength(): any;
    getMinHeight(): number;
    getMinWidth(): number;
}
/**
 * This is a simple container class to layout a list of NuRect objects in a
 * row. UI components can be added at the beginning of the row at its
 * end.
 */
export class NuRowContainer extends DirectionalContainer {
    constructor(w: any, h: any, scrollEnabled?: boolean);
    setItemLength(item: any, l: any): void;
    getItemLength(item: any): any;
    getItemMinLength(item: any): any;
    getItemMaxLength(item: any): any;
    getMaxLength(): any;
    getMinWidth(): number;
    getMinHeight(): number;
}
/**
 * Top-level container for a webapp. This container sets some special
 * attributes on the document.body to make sure this NuRect fills the screen.
 */
export class NuTop extends NuColumnContainer {
    constructor();
}
/**
 * A Dialog class, which can be shown and hidden.
 */
export class NuDialog {
    dialogElem: HTMLDialogElement;
    dialogTop: NuColumnContainer;
    getTop(): NuColumnContainer;
}
/**
 * <p>
 * This is the parent class of Row/Column container classes and implements
 * some common logic for a container that allows adding other components
 * along only one direction.
 * </p>
 *
 * <p>
 * This class should not be used directly. However this is documented so
 * that the logic for layout in directional containers is explained.
 * </p>
 *
 * <p>
 * When scroll is enabled on a directional container via the <code>
 * scrollEnabled </code>
 * flag in the constructor - then the container will grow infinitely in the
 * direction of addition of components. And in such a case the parent
 * of the component must enable overflow to show this container.
 * </p>
 */
declare class DirectionalContainer extends NuRect {
    /**
     * Create a new container which grows in one direction.
     *
     * @constructor
     * @param {number} w - width
     * @param {number} h - height
     * @param {boolean} scrollEnabled - enable scrolling (infinite length)
     */
    constructor(w: number, h: number, scrollEnabled?: boolean);
    /** items to add at the beginning of the layout */
    beginItems: any[];
    /** items to add at the end of the layout */
    endItems: any[];
    /** flag indicating whether scrolling is enabled on parent */
    scrollEnabled: boolean;
    remove(rect: any): void;
    add(rect: any, side?: string): void;
    addBegin(rect: any): void;
    addEnd(rect: any): void;
    setItemLength(item: any): void;
    getItemLength(item: any): number;
    getItemMinLength(item: any): number;
    getItemMaxLength(item: any): number;
    getItemLengthHint(item: any): any;
    getMaxLength(): number;
    setPosition(rect: any, pos: any): void;
    getUsedLength(): number;
    getFreeLength(): number;
    hasSpace(): boolean;
    spaceAvailableFor(rect: any): boolean;
    postresize(): void;
    allocRects(): void;
    broadcastBreadth(): void;
    isScrollEnabled(): boolean;
}
export {};
