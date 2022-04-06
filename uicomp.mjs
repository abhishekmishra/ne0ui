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

    applyConfig() {
        super.applyConfig();
        const icon = this.getCfg('icon');
        const text = this.getCfg('text');
        console.log(`icon ${icon}, text ${text}`);
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
