import { NuUICompConfig, NuUIComponent } from "./uicomp.mjs";

/**
 * <p>
 * A text display component based on an HTML span.
 * This component will not receive a tab focus.
 * </p>
 * <p>
 * If you are trying to display a label next to a form input,
 * then use the NuLabel component instead.
 * </p>
 * <p>
 * If you need a component for text entry use a text entry component.
 * </p>
 */
export class NuText extends NuUIComponent {

    /**
     * Creates a new UI component based on a span element.
     * 
     * @param {NuUICompConfig} config config for the text component
     */
    constructor(config) {
        super(document.createElement('span'), config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            justify: 'left',
            'white-space': 'normal'
        });
    }

    applyConfig() {
        super.applyConfig();
        this.elem.innerHTML = this.getCfg('text');
        this.setElemStyle('display', 'flex');
        this.setElemStyle('align-items', 'center');
        this.setElemStyle('justify-content', this.getCfg('justify'));
        this.setElemStyle('white-space', this.getCfg('white-space'));
    }

    setText(text) {
        this.setCfg('text', text);
        this.applyConfig();
    }
}

/**
 * UI component to show a single line of text.
 */
export class NuSingleLineText extends NuText {
    constructor(config) {
        super(config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            'white-space': 'nowrap'
        });
    }
}

/**
 * <p>
 * A text display component based on an HTML pre for displaying
 * pre-formatted text. This component will not receive a tab focus.
 * </p>
 */
export class NuPreformattedText extends NuUIComponent {

    /**
     * Creates a new UI component based on a span element.
     * 
     * @param {NuUICompConfig} config config for the text component
     */
    constructor(config) {
        super(document.createElement('pre'), config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
            justify: 'left',
            'white-space': 'normal'
        });
    }

    applyConfig() {
        super.applyConfig();
        this.elem.innerHTML = this.getCfg('text');
        this.setElemStyle('display', 'flex');
        this.setElemStyle('align-items', 'center');
        this.setElemStyle('justify-content', this.getCfg('justify'));
        this.setElemStyle('white-space', this.getCfg('white-space'));
    }

    setText(text) {
        this.setCfg('text', text);
        this.applyConfig();
    }
}
