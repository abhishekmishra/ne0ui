/**
 * Config class for UI components which
 * has a default map of configurations,
 * and a map with overrides.
 *
 * The get method falls back to defaults,
 * if the key is not found in the config
 * override set.
 *
 * This allows user to set only config options,
 * and then at the time of usage by component,
 * the defaults can be set before using the config
 * params. Thus ensuring that user values are used
 * if available, but defaults otherwise.
 */
export class NuUICompConfig {
    constructor(obj?: any);
    defaults: any;
    config: any;
    setDefaults(obj: any): void;
    setDefault(k: any, v: any): void;
    set(k: any, v: any): void;
    get(k: any): any;
    has(k: any): any;
}
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
    constructor(e: any, config: any);
    elem: any;
    uicfg: NuUICompConfig;
    getCfg(k: any): any;
    setCfg(k: any, v: any): void;
    setDefaultConfigs(): void;
    applyConfig(): void;
    setElem(e: any): void;
    getElem(): any;
    setElemStyle(k?: any, v?: any): void;
    unsetElemStyle(k?: any): void;
    /**
     * Add the given css class to the list of classes of the component element.
     *
     * @param {string} clsname css class name
     */
    addElemClass(clsname: string): void;
    /**
     * Remove the given css class from the list of classes of the component element.
     *
     * @param {string} clsname css class name
     */
    removeElemClass(clsname: string): void;
    /**
     * Toggle the given css class in the list of classes of the component element.
     *
     * @param {string} clsname css class name
     */
    toggleElemClass(clsname: string): void;
    /**
     * Check whether given css class name is in the list of classes for this
     * component element.
     *
     * @param {string} clsname css class name
     * @returns {boolean} flag indicating whether css class name was found
     */
    hasElemClass(clsname: string): boolean;
    setSize(w: any, h: any): void;
    postresize(): void;
    getInnerWidth(): number;
    getInnerHeight(): number;
    centerParent(): void;
    dispatchEvent(eventName: any, detail: any): void;
    on(event: any, handler: any): void;
    removeEventListener(event: any, handler: any): void;
    expandX(): void;
    expandY(): void;
    expand(): void;
    focus(): void;
}
/**
 * The panel class is a container with possible margin, border and padding.
 * The panel can have a horizontal or a vertical layout, which is
 * specified at creation. The layout is managed by an internal container
 * object, which is used when components are added to the panel.
 */
export class NuPanel extends NuUIComponent {
    constructor(config: any);
    layout: NuColumnContainer | NuRowContainer;
    addComp(uicomp: any, side?: string): void;
}
export class NuRowPanel extends NuPanel {
}
export class NuColumnPanel extends NuPanel {
}
/**
 * Create a standard html button, with text and icon both optional
 */
export class NuButton extends NuUIComponent {
    constructor(config: any);
    disable(): void;
    enable(): void;
    isDisabled(): any;
    mouseOver(): void;
    mouseOut(): void;
}
/**
 * A ui component to hold a canvas component.
 */
export class NuCanvas extends NuUIComponent {
    constructor(config: any);
}
/**
 * A resizable container, which can contain one
 * other UI component inside it. The frame contains
 * a border which can be activated by hovering over it
 * and then can be used to resize the frame, similar to a
 * window in a desktop UI environment.
 */
export class NuFrame extends NuUIComponent {
    constructor(config: any);
    overFrameContents(pt: any): string;
    overBorder(pt: any): boolean;
    mouseMove(evt: any): void;
    getMousePos(evt: any): {
        x: number;
        y: number;
    };
}
/**
 * Create an input of any possible type in html.
 * The type needs to be specified as config "inputType"
 * The possible types of input are:
 * <ol>
 * <li>button</li>
 * <li>checkbox</li>
 * <li>color</li>
 * <li>date</li>
 * <li>datetime-local</li>
 * <li>email</li>
 * <li>file</li>
 * <li>hidden</li>
 * <li>image</li>
 * <li>month</li>
 * <li>number</li>
 * <li>password</li>
 * <li>radio</li>
 * <li>range</li>
 * <li>reset</li>
 * <li>search</li>
 * <li>submit</li>
 * <li>tel</li>
 * <li>text</li>
 * <li>time</li>
 * <li>url</li>
 * <li>week</li>
 * </ol>
 */
export class NuInput extends NuUIComponent {
    /**
     * create a new html input based ui component
     * @param {Object} config component configuration
     */
    constructor(config: any);
}
/**
 * Create an html label for an input.
 * Config must contain the "label" and "labelFor"
 * configurations.
 * label is the text for the label,
 * labelFor specifies the id of the input,
 * to which this label is attached
 */
export class NuLabel extends NuUIComponent {
    constructor(config: any);
}
/**
 * Create an input of any possible type in html.
 * The type needs to be specified as config "inputType"
 * The possible types of input are:
 * <ol>
 * <li>button</li>
 * <li>checkbox</li>
 * <li>color</li>
 * <li>date</li>
 * <li>datetime-local</li>
 * <li>email</li>
 * <li>file</li>
 * <li>hidden</li>
 * <li>image</li>
 * <li>month</li>
 * <li>number</li>
 * <li>password</li>
 * <li>radio</li>
 * <li>range</li>
 * <li>reset</li>
 * <li>search</li>
 * <li>submit</li>
 * <li>tel</li>
 * <li>text</li>
 * <li>time</li>
 * <li>url</li>
 * <li>week</li>
 * </ol>
 */
export class NuInputPanel extends NuPanel {
    /**
     * create a new html input based ui component
     * @param {Object} config component configuration
     */
    constructor(config: any, inputComp: any, labelComp: any);
    labelComp: any;
    inputComp: any;
}
/**
 * A range input to pick a value between a range.
 * Must specify the following range configuration options.
 * <ol>
 * <li> min: minimum value </li>
 * <li> max: maximum value </li>
 * <li> value: current value </li>
 * <li> step: step of change </li>
 * </old>
 */
export class NuRangeInput extends NuInput {
}
/**
 * A color input for setting color values.
 * This component has one additional config
 * option:
 *
 * color: starting color value of the input
 *
 */
export class NuColorInput extends NuInput {
}
/**
 * A Window can contain an arbitrary number of components
 * in row or columns layout.
 * It can be shown and hidden, and can be modal.
 */
export class NuWindow extends NuFrame {
    /**
     * Create a new dialog frame.
     * @param {Object} config component configuration
     */
    constructor(config: any);
    layout: NuColumnPanel;
    addComp(comp: any, side?: string): void;
}
/**
 * A Tree-view panel to show a tree of items.
 */
export class NuTreeView extends NuUIComponent {
    constructor(config: any);
    addItem(item: any): void;
}
/**
 * An item for the tree view.
 */
export class NuTreeItem {
    constructor(config: any);
    elem: HTMLLIElement;
    on(event: any, handler: any): void;
    removeEventListener(event: any, handler: any): void;
}
/**
 * App Window with a Top window.
 */
export class NuAppWindow extends NuColumnPanel {
}
/**
 * Table component to show data in a table.
 */
export class NuTable extends NuUIComponent {
    setTableData(data: any): void;
}
import { NuRect } from './containers.mjs';
import { NuColumnContainer } from './containers.mjs';
import { NuRowContainer } from './containers.mjs';
