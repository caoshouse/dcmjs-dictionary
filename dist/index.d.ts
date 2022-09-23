interface RawDcmjsDictionaryItem {
    vr: 'string';
    name: 'string';
    version: string;
}
interface ExtendedDcmjsDictionaryItem extends RawDcmjsDictionaryItem {
    options?: (string | number)[];
}
interface ExtendedDcmjsDictionary {
    [key: string]: ExtendedDcmjsDictionaryItem;
}
export default class DcmjsDictionary {
    private data;
    private vr;
    constructor();
    getData(): ExtendedDcmjsDictionary;
    getNaturalizedData(): ExtendedDcmjsDictionary;
    createDTS(fileName?: string): string;
}
export {};
