import { NuUICompConfig, NuUIComponent } from "./uicomp.mjs";

/**
 * Create a standard html button, with text and icon both optional
 */
export class NuIFrame extends NuUIComponent {

    /**
     * Create a new iframe based ui component which can host webpage.
     * 
     * the configuration should contain a key 'src', whose value will
     * become the iframe src attribute. In an iframe the src points to the
     * webpage which will be displayed inside the iframe.
     * 
     * @param {NuUICompConfig} config configuration for the iframe component
     */
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
        this.elem.setAttribute('src', src);
    }

    /**
     * Set the iframe "src"
     * @param {string} src url of the webpage to embed in the iframe
     */
    setSrc(src) {
        this.setCfg('src', src);
    }
}