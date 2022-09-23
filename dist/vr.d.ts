interface VRItem {
    type: string;
    description: string;
}
interface VRs {
    [key: string]: VRItem;
}
export declare class VR {
    private _vrs;
    getAll(): VRs;
    private getGroup;
    getTypeof(vrcode: string): string;
    createDTS(): string;
}
export {};
