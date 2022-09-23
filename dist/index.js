"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dcmjs_1 = __importDefault(require("dcmjs"));
const fs_1 = __importDefault(require("fs"));
const os_1 = require("os");
const vr_1 = require("./vr");
const options_1 = __importDefault(require("./options"));
class DcmjsDictionary {
    constructor() {
        this.data = {};
        this.vr = new vr_1.VR();
        this.data = dcmjs_1.default.data.DicomMetaDictionary.dictionary;
        Object.keys(this.data).forEach(k => {
            let op = options_1.default[this.data[k].name];
            if (op) {
                this.data[k].options = op;
            }
        });
    }
    getData() {
        return this.data;
    }
    getNaturalizedData() {
        const ret = {};
        Object.keys(this.data).forEach(k => {
            let item = this.data[k];
            if (item && item.name && (item.version !== 'PrivateTag')) {
                ret[item.name] = item;
            }
        });
        return ret;
    }
    createDTS(fileName) {
        try {
            const data = this.getNaturalizedData(), arr = [];
            arr.push(this.vr.createDTS());
            arr.push(`export interface DatasetElements{`);
            Object.keys(data).forEach(k => {
                const item = data[k];
                if (k.startsWith('RETIRED_')) {
                    arr.push(`//* @deprecated */`);
                }
                let type;
                if (data[k].options) {
                    type = data[k].options.map(v => ('string' === typeof v) ? `"${v}"` : v).join('|');
                }
                else {
                    type = this.vr.getTypeof(item.vr);
                }
                arr.push(`  ${k}?: ${type}, //${item.vr}`);
            });
            arr.push('}');
            const text = arr.join(os_1.EOL);
            fileName && fs_1.default.writeFileSync(fileName, text);
            return text;
        }
        catch (e) {
            throw ('Unable to create .d.ts file: ' + e);
        }
    }
}
exports.default = DcmjsDictionary;
