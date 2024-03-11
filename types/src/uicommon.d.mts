export function setElemStyle(elem: any, k?: any, v?: any): void;
export class NuSides {
    static allEqual(val: any): NuSides;
    static vertAndHoriz(vert: any, horiz: any): NuSides;
    static getNumericSidesFromArg(val: any): NuSides;
    static getStringSidesFromArg(val: any): NuSides;
    static sideNames(): string[];
    constructor(l: any, r: any, t: any, b: any);
    left: any;
    right: any;
    top: any;
    bottom: any;
    getSide(side: any): any;
}
export class NuBorder {
    static parse(input: any): NuBorder;
    constructor(width?: number, color?: string, style?: string, radius?: number, unit?: string);
    width: NuSides;
    color: NuSides;
    style: NuSides;
    radius: number;
    unit: string;
    applyStyle(uielem: any): void;
}
export class NuMargin extends NuSides {
    static allEqual(val: any): NuMargin;
    static vertAndHoriz(vert: any, horiz: any): NuMargin;
    static parse(input: any): NuMargin;
    constructor(l: any, r: any, t: any, b: any, unit?: string);
    unit: string;
    applyStyle(uielem: any): void;
}
export class NuPadding extends NuSides {
    static allEqual(val: any): NuPadding;
    static vertAndHoriz(vert: any, horiz: any): NuPadding;
    static parse(input: any): NuMargin | NuPadding;
    constructor(l: any, r: any, t: any, b: any, unit?: string);
    unit: string;
    applyStyle(uielem: any): void;
}
export class NuFont {
    static parse(input: any): NuFont;
    constructor(family?: string, style?: string, size?: number, unit?: string, weight?: number, variant?: string);
    family: string;
    style: string;
    size: number;
    unit: string;
    variant: string;
    weight: number;
    applyStyle(uielem: any): void;
}
