"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VR = void 0;
const os_1 = require("os");
class VR {
    constructor() {
        this._vrs = {
            na: {
                type: 'undefined',
                description: `The VR for Data Elements, Item (FFFE,E000), Item Delimitation Item (FFFE,E00D), and Sequence Delimitation Item (FFFE,E0DD) do not exist. See PS3.5 for explanation.`
            },
            lt: {
                type: 'number|string',
                description: 'Used for LUTData'
            },
            AE: {
                type: 'string',
                description: `Application Entity`
            },
            AS: { type: 'string', description: `Age String` },
            AT: { type: 'number', description: `Attribute Tag` },
            CS: { type: 'string', description: `Code String` },
            DA: { type: 'string', description: `Date` },
            DS: { type: 'string', description: `Decimal String` },
            DT: { type: 'string', description: `Date Time` },
            FL: { type: 'number', description: `Floating Point Single` },
            FD: { type: 'number', description: `Floating Point Double` },
            IS: { type: 'string', description: `Integer String` },
            LO: { type: 'string', description: `Long String` },
            LT: { type: 'string', description: `Long Text` },
            OB: { type: 'string | ArrayBuffer', description: `Other Byte String` },
            OD: { type: 'string', description: `Other Double String` },
            OF: { type: 'string', description: `Other Float String` },
            OL: { type: 'string', description: `Other Long String` },
            OV: { type: 'string', description: `Other 64-bit Very Long` },
            OW: { type: 'string', description: `Other Word String` },
            PN: { type: 'string', description: `Person Name` },
            SH: { type: 'string', description: `Short String` },
            SL: { type: 'number', description: `Signed Long` },
            SQ: { type: 'DicomSequence', description: `Sequence Of Items` },
            SS: { type: 'number', description: `Signed Short` },
            ST: { type: 'string', description: `Short Text` },
            SV: { type: 'number', description: `Signed 64-bit Very Long` },
            TM: { type: 'string', description: `Time` },
            UC: { type: 'string', description: `Unlimited Characters` },
            UI: { type: 'string', description: `Unique Identifier (UID)` },
            UL: { type: 'number', description: `Unsigned Long` },
            UN: { type: 'undefined', description: `Unknown` },
            UR: { type: 'string', description: `URL` },
            US: { type: 'number', description: `Unsigned Short` },
            UT: { type: 'string', description: `Unlimited Text` },
            UV: { type: 'number', description: `Unsigned 64-bit Very Long` }
        };
    }
    getAll() {
        return this._vrs;
    }
    getGroup(code) {
        const matches = code.match(/[^x]/), char = matches[0].toUpperCase(), index = matches.index, types = Object.keys(this._vrs)
            .filter(k => k[index] === char)
            .map(k => this.getTypeof(k).split('|'))
            .flat()
            .filter((value, index, self) => { return self.indexOf(value) === index; });
        return types;
    }
    getTypeof(vrcode) {
        let types = [];
        if (this._vrs[vrcode]) {
            types = [this._vrs[vrcode].type.replace(/\s/g, '')];
        }
        else if (vrcode.includes('x')) {
            types = this.getGroup(vrcode);
        }
        else {
            types = ['any'];
        }
        return types.join('|');
    }
    createDTS() {
        const arr = [];
        arr.push(`export type DicomSequence = {[k in keyof DatasetElements]?:DatasetElements[k]}[]`);
        arr.push('export type VR={');
        Object.keys(this._vrs).forEach(k => {
            const item = this._vrs[k];
            item.description && arr.push(`${os_1.EOL}  /*${item.description}*/`);
            arr.push(`  ${k} : ${item.type},`);
        });
        arr.push('}');
        return arr.join(os_1.EOL);
    }
}
exports.VR = VR;
