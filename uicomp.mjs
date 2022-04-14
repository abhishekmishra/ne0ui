import { NuColumnContainer, NuRect, NuRowContainer } from './containers.mjs';

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
            this.cfg = new NuUICompConfig();
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

    setDefaultConfigs() {
        this.uicfg.setDefaults({
            margin: '0px',
            border: '0px',
            padding: '0px'
        });
    }

    applyConfig() {
        this.setElemStyle('margin', this.getCfg('margin'));
        this.setElemStyle('padding', this.getCfg('padding'));
        this.setElemStyle('border', this.getCfg('border'));
        this.setElemStyle('background-color', this.getCfg('bg'));
        this.setElemStyle('color', this.getCfg('fg'));
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

    unsetElemStyle(k = null) {
        if (k !== null) {
            this.elem.style.removeProperty(k);
        }
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
        if (orientation === 'horizontal') {
            this.layout = new NuRowContainer(this.getInnerWidth(), this.getInnerHeight());
        } else if (orientation == 'vertical') {
            this.layout = new NuColumnContainer(this.getInnerWidth(), this.getInnerHeight());
        } else {
            throw 'orientation not supported -> ' + orientation;
        }
        this.layout.setStyle('position', 'relative');
        this.elem.appendChild(this.layout.div);
    }

    addComp(uicomp, side = 'begin') {
        this.layout.add(uicomp, side);
    }

    postresize() {
        super.postresize();
        this.layout.resize(this.getInnerWidth(), this.getInnerHeight());
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

export class NuSingleLineText extends NuUIComponent {
    constructor(config) {
        super(document.createElement('span'), config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            justify: 'left',
        });
    }

    applyConfig() {
        super.applyConfig();
        this.elem.innerHTML = this.getCfg('text');
        this.setElemStyle('display', 'flex');
        this.setElemStyle('align-items', 'center');
        this.setElemStyle('justify-content', this.getCfg('justify'));
        this.setElemStyle('white-space', 'nowrap');
    }
}

export class NuCanvas extends NuUIComponent {
    constructor(config) {
        super(document.createElement('canvas'), config);
        this.setStyle('text-align', 'center');
    }
}

export class NuFrame extends NuUIComponent {
    constructor(config) {
        super('div', config);
        this.setElemStyle('width', this.getWidth() + 'px');
        this.setElemStyle('height', this.getHeight() + 'px');
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            frameBorderWidth: 5,
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
        if(pt.x > bw && pt.y > bw && pt.x < (this.getWidth() - bw) && pt.y < (this.getHeight() - bw)) {
            return true;
        } else {
            return false;
        }
    }

    overBorder(pt) {
        return !this.overFrameContents(pt);
    }

    mouseMove(evt) {
        const pt = this.getMousePos(evt)
        //console.log(pt);
        if(this.overBorder(pt)) {
            console.log(`${pt} is over boder`);
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