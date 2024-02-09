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
    constructor(config: NuUICompConfig);
    setText(text: any): void;
}
/**
 * UI component to show a single line of text.
 */
export class NuSingleLineText extends NuText {
    constructor(config: any);
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
    constructor(config: NuUICompConfig);
    setText(text: any): void;
}
import { NuUIComponent } from "./uicomp.mjs";
import { NuUICompConfig } from "./uicomp.mjs";
