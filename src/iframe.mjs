import { NuUIComponent } from "./uicomp.mjs";

/**
 * Create a standard html button, with text and icon both optional
 */
export class NuIFrame extends NuUIComponent {
    constructor(config) {
        super(document.createElement('iframe'), config);
    }

    setDefaultConfigs() {
        super.setDefaultConfigs();
        this.uicfg.setDefaults({
        });
    }

    applyConfig() {
        super.applyConfig();

        const src = this.getCfg('src');
        const text = this.getCfg('text');

        this.elem.setAttribute('src', src);
    }
}