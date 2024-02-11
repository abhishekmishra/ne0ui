import { NuColumnContainer, NuRect, NuRowContainer, NuTop } from './containers.mjs';
import { NuFont, NuBorder, NuMargin, setElemStyle, NuPadding } from './uicommon.mjs';

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
    defaults;
    config;

    constructor(obj = null) {
        this.defaults = new Map();
        this.config = new Map();
        if (obj !== null) {
            const keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                this.set(keys[i], obj[keys[i]]);
            }
        }
    }

    setDefaults(obj) {
        if (obj !== null) {
            const keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                this.setDefault(keys[i], obj[keys[i]]);
            }
        }
    }

    setDefault(k, v) {
        this.defaults.set(k, v);
    }

    set(k, v) {
        this.config.set(k, v);
    }

    get(k) {
        if (this.has(k)) {
            if (this.config.has(k)) {
                return this.config.get(k);
            } else {
                return this.defaults.get(k);
            }
        }
        return null;
    }

    has(k) {
        return this.config.has(k) || this.defaults.has(k);
    }
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
    elem;
    uicfg;

    constructor(e, config) {
        //create the config object from provided
        //or create new
        var cfg = null;
        if (config instanceof NuUICompConfig) {
            cfg = config;
        } else if (config instanceof Object) {
            cfg = new NuUICompConfig(config);
        } else {
            cfg = new NuUICompConfig();
        }

        //now create the super class with width and height
        super(cfg.get('w'), cfg.get('h'));

        //init elem object
        if (typeof e === 'string') {
            this.setElem(document.createElement(e));
        } else if (e instanceof HTMLElement) {
            this.setElem(e);
        } else {
            throw "Cannot create html element from e.";
        }

        this.elem.id = `${NuRect.nextId()}@${this.constructor.name}_elem`;

        // add the css class <constructor-name>_elem all in lowercase
        this.addElemClass(`${this.constructor.name.toLowerCase()}_elem`);

        //set the config object        
        this.uicfg = cfg;

        //set the default configurations in the cfg object
        this.setDefaultConfigs();

        //apply the configurations
        this.applyConfig();

        // some handlers
        if (this.mouseUp) {
            this.on('mouseup', (evt) => {
                this.mouseUp(evt);
            });
        }
        if (this.mouseMove) {
            this.on('mousemove', (evt) => {
                this.mouseMove(evt);
            });
        }
        if (this.mouseDown) {
            this.on('mousedown', (evt) => {
                this.mouseDown(evt);
            });
        }
        // // see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
        // // for passive event listeners
        if (this.touchStart) {
            this.on('touchstart', (evt) => {
                this.touchStart(evt);
            });
        }
        if (this.touchMove) {
            this.on('touchmove', (evt) => {
                this.touchMove(evt);
            });
        }
        if (this.touchEnd) {
            this.on('touchend', (evt) => {
                this.touchEnd(evt);
            });
        }

        if (this.mouseOver) {
            this.on('mouseover', (evt) => {
                this.mouseOver(evt);
            });
        }

        if (this.mouseOut) {
            this.on('mouseout', (evt) => {
                this.mouseOut(evt);
            });
        }
    }

    getCfg(k) {
        return this.uicfg.get(k);
    }

    setCfg(k, v) {
        this.uicfg.set(k, v);
        this.applyConfig();
    }

    setDefaultConfigs() {
        this.uicfg.setDefaults({
            margin: '0px',
            padding: '0px',
            border: new NuBorder(),
            font: nu.config.font,
        });
    }

    applyConfig() {
        const margin = NuMargin.parse(this.getCfg('margin'));
        margin.applyStyle(this.elem);
        const padding = NuPadding.parse(this.getCfg('padding'));
        padding.applyStyle(this.elem);
        const border = NuBorder.parse(this.getCfg('border'));
        border.applyStyle(this.elem);
        const font = NuFont.parse(this.getCfg('font'));
        font.applyStyle(this.elem);
        this.setElemStyle('background-color', this.getCfg('bg'));
        this.setElemStyle('color', this.getCfg('fg'));
    }

    setElem(e) {
        this.elem = e;
        this.appendElem(this.elem);
    }

    getElem() {
        return this.elem;
    }

    setElemStyle(k = null, v = null) {
        setElemStyle(this.elem, k, v);
    }

    unsetElemStyle(k = null) {
        if (k !== null) {
            this.elem.style.removeProperty(k);
        }
    }

    /**
     * Add the given css class to the list of classes of the component element.
     * 
     * @param {string} clsname css class name
     */
    addElemClass(clsname) {
        this.elem.classList.add(clsname);
    }

    /**
     * Remove the given css class from the list of classes of the component element.
     * 
     * @param {string} clsname css class name
     */
    removeElemClass(clsname) {
        this.elem.classList.remove(clsname);
    }

    /**
     * Toggle the given css class in the list of classes of the component element.
     * 
     * @param {string} clsname css class name
     */
    toggleElemClass(clsname) {
        this.elem.classList.toggle(clsname);
    }

    /**
     * Check whether given css class name is in the list of classes for this
     * component element.
     * 
     * @param {string} clsname css class name
     * @returns {boolean} flag indicating whether css class name was found
     */
    hasElemClass(clsname) {
        return this.elem.classList.contains(clsname);
    }

    setSize(w, h) {
        super.setSize(w, h);
        this.postresize();
    }

    // adjust dimensions with margin, padding and border
    // see https://stackoverflow.com/a/23270007/9483968
    postresize() {
        var style = this.elem.currentStyle || window.getComputedStyle(this.elem);

        var marginW = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        var marginH = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        var borderW = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        var borderH = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        var paddingW = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        var paddingH = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        var widthExcess = marginW + paddingW + borderW;
        var heightExcess = marginH + paddingH + borderH;
        this.setElemStyle('width', (this.getWidth() - widthExcess) + 'px');
        this.setElemStyle('height', (this.getHeight() - heightExcess) + 'px');
    }

    getInnerWidth() {
        var style = this.elem.style;
        var marginW = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        var borderW = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        var paddingW = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return this.getWidth() - marginW - borderW - paddingW;
    }

    getInnerHeight() {
        var style = this.elem.style;
        var marginH = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        var borderH = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        var paddingH = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);

        return this.getHeight() - marginH - borderH - paddingH;
    }

    centerParent() {
        if (this.parentRect !== null) {
            var l = (this.parentRect.getWidth() / 2) - (this.getWidth() / 2);
            var t = (this.parentRect.getHeight() / 2) - (this.getHeight() / 2);
            this.setAbsolutePosition(l, t);
        }
    }

    dispatchEvent(eventName, detail) {
        this.elem.dispatchEvent(new CustomEvent(eventName, {
            detail: detail,
        }));
    }

    on(event, handler) {
        this.elem.addEventListener(event, handler);
    }

    removeEventListener(event, handler) {
        this.elem.removeEventListener(event, handler);
    }

    expandX() {
        this.getWidthHint().max = Infinity;
    }

    expandY() {
        this.getHeightHint().max = Infinity;
    }

    expand() {
        this.expandX();
        this.expandY();
    }

    focus() {
        this.elem.focus();
    }

    // mouseUp() {
    //     //do nothing
    // }

    // mouseMove() {
    //     //do nothing
    // }

    // mouseDown() {
    //     //do nothing
    // }

    // mouseOver() {
    //     //do nothing
    // }

    // mouseOut() {
    //     //do nothing
    // }

    // touchStart() {
    //     //do nothing
    // }

    // touchMove() {
    //     //do nothing
    // }

    // touchEnd() {
    //     //do nothing
    // }
}

/**
 * The panel class is a container with possible margin, border and padding.
 * The panel can have a horizontal or a vertical layout, which is
 * specified at creation. The layout is managed by an internal container
 * object, which is used when components are added to the panel.
 */
export class NuPanel extends NuUIComponent {
    layout;

    constructor(config) {
        super('div', config);
        const orientation = this.getCfg('orientation');
        const scrollable = this.getCfg('scrollable');
        if (orientation === 'horizontal') {
            this.layout = new NuRowContainer(this.getInnerWidth(), this.getInnerHeight(), scrollable);
        } else if (orientation == 'vertical') {
            this.layout = new NuColumnContainer(this.getInnerWidth(), this.getInnerHeight(), scrollable);
        } else {
            throw 'orientation not supported -> ' + orientation;
        }
        this.layout.setStyle('position', 'relative');
        this.elem.appendChild(this.layout.div);
        this.setStyle('overflow', 'hidden');

        if (scrollable) {
            if (orientation === 'horizontal') {
                this.setElemStyle('overflow-y', 'hidden');
                this.setElemStyle('overflow-x', 'visible');
                this.layout.resize(4096, this.getInnerHeight());
            } else if (orientation == 'vertical') {
                this.setElemStyle('overflow-x', 'hidden');
                this.setElemStyle('overflow-y', 'visible');
                this.layout.resize(this.getInnerWidth(), 4096);
            } else {
                throw 'orientation not supported -> ' + orientation;
            }
        } else {
            this.setElemStyle('overflow', 'hidden');
            this.layout.resize(this.getInnerWidth(), this.getInnerHeight());
        }


        // if (scrollable) {
        //     if (orientation === 'horizontal') {
        //         this.setElemStyle('overflow-y', 'visible');
        //         this.setElemStyle('overflow-x', 'visible');
        //     } else if (orientation == 'vertical') {
        //         this.setElemStyle('overflow-x', 'visible');
        //         this.setElemStyle('overflow-y', 'visible');
        //     } else {
        //         throw 'orientation not supported -> ' + orientation;
        //     }
        // } else {
        //     this.setElemStyle('overflow', 'hidden');
        // }
    }

    addComp(uicomp, side = 'begin') {
        this.layout.add(uicomp, side);
    }

    postresize() {
        super.postresize();
        const orientation = this.getCfg('orientation');
        const scrollable = this.getCfg('scrollable');

        if (scrollable) {
            if (orientation === 'horizontal') {
                this.setElemStyle('overflow-y', 'hidden');
                this.setElemStyle('overflow-x', 'visible');
                this.layout.resize(4096, this.getInnerHeight());
            } else if (orientation == 'vertical') {
                this.setElemStyle('overflow-x', 'hidden');
                this.setElemStyle('overflow-y', 'visible');
                this.layout.resize(this.getInnerWidth(), 4096);
            } else {
                throw 'orientation not supported -> ' + orientation;
            }
        } else {
            this.setElemStyle('overflow', 'hidden');
            this.layout.resize(this.getInnerWidth(), this.getInnerHeight());
        }

    }
}

export class NuRowPanel extends NuPanel {
    constructor(config) {
        if (config instanceof NuUICompConfig) {
            config.set('orientation', 'horizontal');
        } else if (config instanceof Object) {
            config.orientation = 'horizontal';
        } else {
            throw "no config found";
        }
        super(config);
    }
}

export class NuColumnPanel extends NuPanel {
    constructor(config) {
        if (config instanceof NuUICompConfig) {
            config.set('orientation', 'vertical');
        } else if (config instanceof Object) {
            config.orientation = 'vertical';
        } else {
            throw "no config found";
        }
        super(config);
    }
}

/**
 * Create a standard html button, with text and icon both optional
 */
export class NuButton extends NuUIComponent {
    constructor(config) {
        super(document.createElement('button'), config);
        this.elem.setAttribute('type', 'button');
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            'text-align': 'center'
        });
    }

    applyConfig() {
        super.applyConfig();

        const icon = this.getCfg('icon');
        const text = this.getCfg('text');

        this.elem.innerHTML = '';
        if (icon != null) {
            this.elem.innerHTML += `<i class="${icon}"></i>`;
        }
        if (icon != null && text != null) {
            this.elem.innerHTML += '&nbsp;';
        }
        if (text != null) {
            this.elem.innerHTML += text;
        }

        this.setElemStyle('text-align', this.getCfg('text-align'));
    }

    disable() {
        this.elem.setAttribute('disabled', true);
        this.setElemStyle('opacity', 0.8);
    }

    enable() {
        this.elem.removeAttribute('disabled');
        this.unsetElemStyle('opacity');
    }

    isDisabled() {
        return this.elem.hasAttribute('disabled');
    }

    mouseOver() {
        this.setElemStyle('cursor', 'pointer');
    }

    mouseOut() {
        this.unsetElemStyle('cursor');
    }
}

/**
 * A ui component to hold a canvas component.
 */
export class NuCanvas extends NuUIComponent {
    constructor(config) {
        super(document.createElement('canvas'), config);
        this.setStyle('text-align', 'center');
    }
}

/**
 * A resizable container, which can contain one
 * other UI component inside it. The frame contains
 * a border which can be activated by hovering over it
 * and then can be used to resize the frame, similar to a
 * window in a desktop UI environment.
 */
export class NuFrame extends NuUIComponent {
    constructor(config) {
        super('div', config);
        this.setElemStyle('width', this.getWidth() + 'px');
        this.setElemStyle('height', this.getHeight() + 'px');
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            frameBorderWidth: 2,
            pos: {
                left: 0,
                top: 0,
            },
        });
    }

    applyConfig() {
        super.applyConfig();
        this.setElemStyle('border', `${this.getCfg('frameBorderWidth')}px solid black`);
        console.log(this.getCfg('pos').left);
        const pos = this.getCfg('pos');
        this.setAbsolutePosition(pos.left, pos.top);
    }

    postresize() {
        super.postresize();
        this.setElemStyle('width', this.getWidth() + 'px');
        this.setElemStyle('height', this.getHeight() + 'px');
    }

    overFrameContents(pt) {
        const bw = this.getCfg('frameBorderWidth');
        //TODO: return proper hot area of border
        //one of n/e/w/s/ne/se/nw/sw
        if (pt.x > bw && pt.y > bw && pt.x < (this.getWidth() - bw) && pt.y < (this.getHeight() - bw)) {
            return 'N';
        } else {
            return null;
        }
    }

    overBorder(pt) {
        return !this.overFrameContents(pt);
    }

    mouseMove(evt) {
        const pt = this.getMousePos(evt)
        //console.log(pt);
        const border = this.overBorder(pt);
        if (border !== null) {
            // console.log(`${pt} is over border`);
            this.setElemStyle('cursor', 'e-resize');
        } else {
            this.unsetElemStyle('cursor');
        }
    }

    // mouseOver(evt) {
    //     console.log(this.getMousePos(evt));
    // }

    // mouseOut(evt) {
    //     console.log(this.getMousePos(evt));
    // }

    getMousePos(evt) {
        var rect = this.elem.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top,
        };
    }
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
    constructor(config) {
        super('input', config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            inputType: 'text',
        });
    }

    applyConfig() {
        super.applyConfig();
        this.elem.setAttribute('type', this.getCfg('inputType'));
    }
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
    constructor(config) {
        super('label', config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            justify: 'left',
            label: 'none',
            labelFor: '0'
        });
    }

    applyConfig() {
        super.applyConfig();
        this.elem.innerHTML = this.getCfg('label');
        this.elem.setAttribute('for', this.getCfg('labelFor'));
        this.setElemStyle('display', 'flex');
        this.setElemStyle('align-items', 'center');
        this.setElemStyle('justify-content', this.getCfg('justify'));
        this.setElemStyle('white-space', 'nowrap');
    }
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
    labelComp;
    inputComp;

    /**
     * create a new html input based ui component
     * @param {Object} config component configuration
     */
    constructor(config, inputComp, labelComp) {
        super(config);
        this.labelComp = labelComp;
        this.inputComp = inputComp;
        this.addComp(this.labelComp);
        this.addComp(this.inputComp);

        //set the label for to input component's id
        this.labelComp.setCfg('labelFor', this.inputComp.elem.id);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
        });
    }

    applyConfig() {
        super.applyConfig();
    }
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
    /**
     * create a rannge entry ui component with given range and current value
     * @param {Object} config component configuration
     */
    constructor(config) {
        super(config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            inputType: 'range',
            min: 0,
            max: 100,
            value: 10,
            step: 1,
        });
    }

    applyConfig() {
        super.applyConfig();
        this.elem.setAttribute('min', this.getCfg('min'));
        this.elem.setAttribute('max', this.getCfg('max'));
        this.elem.setAttribute('value', this.getCfg('value'));
        this.elem.setAttribute('step', this.getCfg('step'));
    }
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
    /**
     * create a color input ui component
     * @param {Object} config component configuration
     */
    constructor(config) {
        super(config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            inputType: 'color',
            color: '#00ff00',
        });
    }

    applyConfig() {
        super.applyConfig();
        this.elem.setAttribute('value', this.getCfg('color'));
    }
}

/**
 * A Window can contain an arbitrary number of components
 * in row or columns layout.
 * It can be shown and hidden, and can be modal.
 */
export class NuWindow extends NuFrame {
    layout;

    /**
     * Create a new dialog frame.
     * @param {Object} config component configuration
     */
    constructor(config) {
        super(config);
        this.layout = new NuColumnPanel(config);
        this.elem.appendChild(this.layout.div);
    }

    addComp(comp, side = 'begin') {
        this.layout.addComp(comp, side);
    }
}

/**
 * A Tree-view panel to show a tree of items.
 */
export class NuTreeView extends NuUIComponent {
    constructor(config) {
        super('ul', config);
        this.addElemClass('tree-view');
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            // margin: '3px',
            padding: '6px',
        });
    }

    addItem(item) {
        this.elem.appendChild(item.elem);
    }
}

/**
 * An item for the tree view.
 */
export class NuTreeItem {
    elem;

    constructor(config) {
        this.elem = document.createElement('li');
        this.elem.innerHTML = config.text;
        this.elem.style.cursor = 'pointer';
    }

    on(event, handler) {
        this.elem.addEventListener(event, handler);
    }

    removeEventListener(event, handler) {
        this.elem.removeEventListener(event, handler);
    }

}


/**
 * App Window with a Top window.
 */
export class NuAppWindow extends NuColumnPanel {
    constructor(config) {
        super(config);
        this.addClass('window-body');
    }
}

/**
 * Table component to show data in a table.
 */
export class NuTable extends NuUIComponent {
    constructor(config, data) {
        super('table', config);
        this.addElemClass('sunken-panel');
        this.setTableData(data);
    }

    setTableData(data) {
        this.elem.innerHTML = '';
        for (var i = 0; i < data.length; i++) {
            var row;
            if(i === 0) {
                console.log('header');
                row = this.elem.createTHead().insertRow(-1);
            } else if (i === 1) {
                console.log('body');
                row = this.elem.createTBody().insertRow(-1);
            } else {
                row = this.elem.insertRow(-1);
            }
            for (var j = 0; j < data[i].length; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = data[i][j];
            }
        }
    }

}